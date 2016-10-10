const esprima = require('esprima');
const estraverse = require('estraverse');
const fs = require('fs');
const chalk = require('chalk');
const pathMod = require('path');
const babelCore = require('babel-core');

const nodeCreator = require('./nodeCreator');

let esModuleImports, esModuleExports, idCounter, edgesToBody, edgesToDefinition, nodes; 

const analyzeFiles = function(javascriptFiles, framework){

	const files = Object.assign({}, javascriptFiles);

	idCounter = 1;
	esModuleImports = {};
	esModuleExports = {};
	edgesToBody = {}; // join table between function definitions/invocations and definitions/invocations within them
	edgesToDefinition = {}; // join table between function invocations and their original definitions
	nodes = []; // will collect nodes (node for each definition and invocation)

	// run through each file fed into function to find nodes and same-file edges
	for (let filePath in files) {	
		const ast = parseFileToAST(filePath, files);
		if (!ast) {continue;}
		esModuleImports[filePath] = {};
		esModuleExports[filePath] = {};
		createNodesFromAST(ast, filePath);
	}
	findDefinitionEdgesInSameFile();
	findCrossFileEdges(files, framework);
	transferEdgesToNodes();

	return {nodes, code:files};
};

const parseFileToAST = function(filePath, files){
	let ast;
	try {
		ast = esprima.parse(files[filePath], {loc: true, sourceType: 'module'});
	} catch (err) {
		// if file is unparseable, try running through a JSX to JS transpiler and parsing again
		try {
			let transformedCode = babelCore.transform(files[filePath], {plugins: ["transform-react-jsx"]}).code;
			transformedCode = "// ** helloCode note **\n// this file was transpiled from JSX to Javascript \n\n" + transformedCode;
			ast = esprima.parse(transformedCode, {loc: true, sourceType: 'module'});
			files[filePath] = transformedCode;
		} catch(err) {
			return;
		}
	}
	return ast;
};

// function that creates nodes from an abstract syntax tree, traveling down the tree recursively to capture edgesToBody relationships
const createNodesFromAST = function(ast, pathString, ancestor, factory) {
	
	// attaching ancestory to ast so that it can be passed into traversal callback
	if (ast && ancestor) {
		ast.ancestor = ancestor;
	}

	if (ast && factory) {
		ast.factory = factory;
	}

	// traverse the ast
	estraverse.traverse(ast, {
		enter: function(node, parent) {

			if (doesNodeExist(node, pathString) || (!isImportExportDeclaration(node) && !isNodeDefinition(node) && !isNodeInvocation(node))) {
				return;
			}

			let factory = ast.factory;
			let scope = ast.ancestor && ast.ancestor.scopeAbove ? ast.ancestor.scopeAbove : 'global';
			let createdNode; 

			// log import/export info if node is an ES6 module import/export statement
			if (node.type === 'ImportDeclaration') {
				logEsmImports(node, pathString);
			}
			else if (node.type === 'ExportNamedDeclaration') {
				logEsmExports(node, pathString);
			}
			else if (node.type === 'ExportDefaultDeclaration') {
				if (isNodeDefinition(node.declaration)) {
					createdNode = nodeCreator.createDefinitionNode(idCounter, node.declaration, node, pathString, scope)
				} else if (node.declaration.type === 'Identifier') {
					logEsmExports(node, pathString);
				}
			}

			// create node if the current node in the traversal is a definition or invocation
			if (isNodeDefinition(node)) {
				createdNode = nodeCreator.createDefinitionNode(idCounter, node, parent, pathString, scope);
				if (createdNode) {
					scope = scope + '=>' + padLeftZeros(createdNode.id, 10);
				}
			} 
			else if (isNodeInvocation(node)) {
				createdNode = nodeCreator.createInvocationNode(idCounter, node, parent, pathString, scope);
				if (node.callee.property && node.callee.property.name === 'factory') {
					factory = node.arguments[0].value;
				}
			}

			// if a node was created, begin the traversal again starting just below that node
			if (createdNode) {
				idCounter++;
				if (ast.factory) {
					createdNode.factory = ast.factory;
				}
				nodes.push(createdNode);

				// if there is an ancestor on the ast, then create an edge between the ancestor and the current node
				logEdgesToBody(ast.ancestor, createdNode);

				createdNode.scopeAbove = scope;

				// different recursive starting points if new node is definition vs invocation
				if (node.body) {
					createNodesFromAST(node.body, pathString, createdNode, factory);
				} else if (node.arguments) {
					node.arguments.forEach(function(argument){
						createNodesFromAST(argument, pathString, createdNode, factory);
					})
				}
			}
		}
	});
};

const logEsmImports = function(node, pathString){
	node.specifiers.forEach(function(specifier){
		if (specifier.type === 'ImportSpecifier') {
			esModuleImports[pathString][specifier.local.name] = {default: false, source: node.source.value || "b", importedName: specifier.imported.name};
		}
		else if (specifier.type === 'ImportDefaultSpecifier') {
			esModuleImports[pathString][specifier.local.name] = {default: true, source: node.source.value || "b", importedName: specifier.local.name};
		}
		else if (specifier.type === 'ImportNamespaceSpecifier') {
			esModuleImports[pathString][specifier.local.name] = {default: false, source: node.source.value || "b", importedName: specifier.local.name};
		}
	});
};

const logEsmExports = function(node, pathString){
	if (node.type === 'ExportDefaultDeclaration') {
		esModuleExports[pathString]['default'] = node.declaration.name;
		return;
	}
	if (node.declaration) {
		if (node.declaration.declarations) {
			node.declaration.declarations.forEach(function(decl) {
				esModuleExports[pathString][decl.id.name] = decl.id.name;
			});
		} else {
			esModuleExports[pathString][node.declaration.id.name] = node.declaration.id.name;
		}
	} 
	if (node.specifiers.length) {
		node.specifiers.forEach(function(spec) {
			esModuleExports[pathString][spec.exported.name] = spec.local.name;
		})
	}
};

// function that tests whether a given node has already been created
const doesNodeExist = function(node, pathString){
	if (isNodeDefinition(node) || isNodeInvocation(node)) {
		var repeats = nodes.filter(function(ele){
			if (node.loc.start.line === ele.start.line && node.loc.start.column === ele.start.column && node.loc.end.line === ele.end.line && node.loc.end.column === ele.end.column && ele.filePath === pathString) {
				return true;
			}
		});
		if (repeats.length) {
			return true;
		}
	}
};

const logEdgesToBody = function(ancestor, node){
	if (ancestor) {
		if (edgesToBody[ancestor.id]) {
			edgesToBody[ancestor.id].push(node.id);
		} else {
			edgesToBody[ancestor.id] = [node.id];
		}
	}
};

const findDefinitionEdgesInSameFile = function(){
	var invocations = [];
	var definitions = [];

	nodes.forEach(function(node) {
		if (node.type === 'invocation') {
			invocations.push(node);
		} else {
			definitions.push(node);
		}
	});
	
	invocations.forEach(function(inv){
		var matches = definitions.filter(function(def){
			if (inv.filePath === def.filePath && def.name === inv.name && inv.scope.indexOf(def.scope) > -1) {
				if (inv.object && def.object && inv.object === def.object) {
					return true;	
				} else if (!inv.object && !def.object) {
					return true;
				} else {
					return false;
				}
				
			}
		});
		if (matches.length) {
			var bestMatch = matches.reduce(function(curr, next) {
				return curr.scope.length > next.scope.length ? curr : next;
			})
			edgesToDefinition[inv.id] = bestMatch.id;
		}
	})
};

const findCrossFileEdges = function(code, framework){

	// find invocations that do not yet have edges to their definitions
	var remainingInvocations = nodes.filter(function(node){
		return node.type === 'invocation' && !edgesToDefinition[node.id];
	});

	// find cross-file edges between invocations and definitions
	remainingInvocations.forEach(function(invocation){

		var sourcePath, sourceFile;
		var currentFile = code[invocation.filePath];  
		var regexToCaptureModuleExport = /module\.exports\s*\=\s*([\w\$]+)/
		var regexToCaptureRequiredFilepath = RegExp((invocation.object ? invocation.object : invocation.name) + '\\s*\\=\\s*require\\([\'\"](.+)[\'\"]\\)');
		var requiredFilePath = regexToCaptureRequiredFilepath.exec(currentFile);
		var importData = esModuleImports[invocation.filePath][invocation.name];
		
		// following CommonJS pattern
		if (requiredFilePath) {
			sourcePath = pathMod.normalize(pathMod.join(invocation.filePath, '../', requiredFilePath[1]));
			sourceFile = code[sourcePath];
		}
		// following ES6 module pattern 
		else if (importData && importData.source) {
			sourcePath = pathMod.normalize(pathMod.join(invocation.filePath, '../', importData.source));
		}

		// looks for function in target file that matches various module export patterns
		nodes.forEach(function(node){

			if (importData) {
				if (importData.default && node.filePath === sourcePath) {
					if (esModuleExports[sourcePath]['default'] === node.name && node.scope === 'global') {
						edgesToDefinition[invocation.id] = node.id;
					} else if (node.esmDefaultExport) {
						edgesToDefinition[invocation.id] = node.id;
					}
				}
				else if (node.filePath === sourcePath) {
					if (esModuleExports[sourcePath][importData.importedName] === node.name && node.scope === 'global') {
						edgesToDefinition[invocation.id] = node.id;
					}
				}
			}
			else if (requiredFilePath && node.type === 'definition' && node.filePath === sourcePath && node.scope === 'global') {
				if (invocation.object && node.name === invocation.name) {
					edgesToDefinition[invocation.id] = node.id;
				} else if (node.object === 'module' && node.name === 'exports') {
					edgesToDefinition[invocation.id] = node.id;
				} else if (node.name === regexToCaptureModuleExport.exec(sourceFile)[1]) {
					edgesToDefinition[invocation.id] = node.id;
				}
			} 
			else if (node.factory && node.type === 'definition' && invocation.object && node.factory === invocation.object && node.name === invocation.name) {
				if (node.type === 'definition' && node.factory && invocation.object && node.factory === invocation.object && node.name === invocation.name) {
					edgesToDefinition[invocation.id] = node.id;
				}
			}
		});
	});
};

const transferEdgesToNodes = function(){

	// transfer incoming and outgoing edges to node objects
	for (var key in edgesToBody) {
		edgesToBody[key].forEach(function(node){
			nodes[key-1].outgoingBody.push(node);
			nodes[node-1].incomingBody.push(+key);
		})
	}
	for (var key in edgesToDefinition) {
		nodes[key-1].outgoingDefinition.push(edgesToDefinition[key]);
		nodes[edgesToDefinition[key]-1].incomingDefinition.push(+key);		
	}

};

const padLeftZeros = function(num, length) {
	var totalZeros = length - (num+'').length;
	return '0'.repeat(totalZeros) + num;
};

const isNodeDefinition = function(node){
	return node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression';
};

const isNodeInvocation = function(node){
	return node.type === 'CallExpression';
};

const isImportExportDeclaration = function(node){
	return node.type === 'ImportDeclaration' || node.type === 'ExportNamedDeclaration' || node.type === 'ExportDefaultDeclaration';
};

module.exports = analyzeFiles;

