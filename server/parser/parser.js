var esprima = require('esprima');
var estraverse = require('estraverse');
var fs = require('fs');
var chalk = require('chalk');
var pathMod = require('path');


// constructor for node object
var Node = function(id, name, type, filePath, start, end, scope){
	this.id = id;
	this.name = name;
	this.type = type;
	this.filePath = filePath;
	this.start = start;
	this.end = end;
	this.scope = scope;
	this.incomingEdges = [];
	this.outgoingEdges = [];
}

var idCounter; // this counter will provide each node with a unique id
var esModuleImports = {};

// function that takes in an array of file paths, reads it, parses it into an abstract syntax tree, and calls a recursive function to create nodes and find edgesToBody
var analyzeFiles = function(files, framework){

	idCounter = 1;
	var nodes = []; // will collect nodes (node for each definition and invocation)
	var edgesToBody = {}; // join table between function definitions/invocations and definitions/invocations within them
	var edgesToDefinition = {}; // join table between function invocations and their original definitions
	var esprimaSourceType = 'module' //framework === 'esm' ? 'module' : 'script';

	// run through each file fed into function to find nodes and same-file edges
	for (var key in files) {	
		// ensure that files esprima cannot parse are skipped
		try {
			var ast = esprima.parse(files[key], {loc: true, sourceType: esprimaSourceType});
		} catch (err) {
			continue;
		}

		// create nodes
		nodes = nodes.concat(createNodesFromAST(edgesToBody, ast, key));

		// find and log ES6 module pattern exports not logged in createNodesFromAST
		findRemainingEsmExports(ast, nodes, key)
		
		// find same-file edges
		findEdgesInSameFile(nodes, edgesToBody, edgesToDefinition);
	}

	// find invocations that do not yet have edges to their definitions
	var remainingInvocations = nodes.filter(function(node){
		if (node.type === 'invocation' && !edgesToDefinition[node.id]) {
			return true;
		}
	});

	// find cross-file edges between invocations and definitions
	remainingInvocations.forEach(function(invocation){

		// if framework is angular, see if match exists between name of object that contained function and the name of a factory 
		if (framework === 'angular') {
			nodes.forEach(function(node){
				if (node.type === 'definition' && node.factory && invocation.object && node.factory === invocation.object && node.name === invocation.name) {
					edgesToDefinition[invocation.id] = node.id;
				}
			});
			return;
		}

		var currentFile = files[invocation.filePath];  
		var regexForExport = /module\.exports\s*\=\s*([\w\$]+)/
		var regex, relativePath;

		// use regex to find file path inside relevant require
		if (invocation.object) {
			regex = RegExp(invocation.object + '\\s*\\=\\s*require\\([\'\"](.+)[\'\"]\\)')
		} else {
			regex = RegExp(invocation.name + '\\s*\\=\\s*require\\([\'\"](.+)[\'\"]\\)')
		}

		// following CommonJS pattern
		if (regex.exec(currentFile)) {
			relativePath = regex.exec(currentFile)[1];
			var newPath = pathMod.normalize(pathMod.join(invocation.filePath, '../', relativePath));
			var newFile = files[newPath];
		}
		// following ES6 module pattern 
		else if (esModuleImports[invocation.filePath][invocation.name]) {
			var importData = esModuleImports[invocation.filePath][invocation.name];
			var sourcePath = pathMod.normalize(pathMod.join(invocation.filePath, '../', importData.source));
		}
		else {
			return;
		}

		// looks for function in target file that matches various module export patterns
		nodes.forEach(function(node){

			if (importData) {
				if (importData.default && node.filePath === sourcePath && node.defaultExport) {
					edgesToDefinition[invocation.id] = node.id;
				}
				else if (node.filePath === sourcePath && importData.importedName === node.exportedName) {
					edgesToDefinition[invocation.id] = node.id;
				}
			}


			if (node.type === 'definition' && node.filePath === newPath && node.scope === 'global') {
				if (invocation.object && node.name === invocation.name) {
					edgesToDefinition[invocation.id] = node.id;
				} else if (node.object === 'module' && node.name === 'exports') {
					edgesToDefinition[invocation.id] = node.id;
				} else if (node.name === regexForExport.exec(newFile)[1]) {
					edgesToDefinition[invocation.id] = node.id;
				}
			}
		});


	})

	// transfer incoming and outgoing edges to node objects
	for (var key in edgesToBody) {
		edgesToBody[key].forEach(function(node){
			if (key === 0) {console.log(edgeToBody[key])}
			nodes[key-1].outgoingEdges.push(node)
			nodes[node-1].incomingEdges.push(+key)
		})
	}
	for (var key in edgesToDefinition) {
		nodes[key-1].outgoingEdges.push(edgesToDefinition[key])
		nodes[edgesToDefinition[key]-1].incomingEdges.push(+key)
	}

	// console.log('nodes', nodes)
	// console.log('edgesToBody', edgesToBody)
	// console.log('edgesToDefinition', edgesToDefinition)
	
	return nodes;
}

// function that creates nodes from an abstract syntax tree, traveling down the tree recursively to capture edgeToBody relationships
var createNodesFromAST = function(edgesToBody, ast, pathString, ancestor, scopeAbove, nodeArr, factory) {
	
	var nodes = nodeArr || [];

	// attaching ancestory to ast so that it can be passed into traversal callback
	if (ast && ancestor) {
		if (ancestor === 'esmExport') {
			ast.export = true;
		} else if (ancestor === 'esmDefaultExport') {
			ast.defaultExport = true;
		} else {
			ast.ancestor = ancestor;
			ast.scope = scopeAbove;
		}
	}

	if (ast && factory) {
		ast.factory = factory;
	}

	if (!esModuleImports[pathString]) {
		esModuleImports[pathString] = {};
	}

	// traverse the ast
	estraverse.traverse(ast, {
		enter: function(node, parent) {
			
			var factory = ast.factory;

			if (doesNodeExist(nodes, node, pathString)) {
				return;
			}

			var createdNode, scope;
			if (ast.scope) {
				scope = ast.scope;
			} else {
				scope = 'global';
			}


			if (node.type === 'ImportDeclaration') {
				node.specifiers.forEach(function(specifier){
					if (specifier.type === 'ImportSpecifier') {
						esModuleImports[pathString][specifier.local.name] = {default: false, source: node.source.value, importedName: specifier.imported.name};
					}
					else if (specifier.type === 'ImportDefaultSpecifier') {
						esModuleImports[pathString][specifier.local.name] = {default: true, source: node.source.value, importedName: specifier.local.name};
					}
					else if (specifier.type === 'ImportNamespaceSpecifier') {
						esModuleImports[pathString][specifier.local.name] = {default: false, source: node.source.value, importedName: specifier.local.name};
					}
				});
			}
			else if (node.type === 'ExportNamedDeclaration') {
				if (node.declaration) {
					if (node.declaration.declarations) {
						node.declaration.declarations.forEach(function(decl) {
							createNodesFromAST(edgesToBody, decl, pathString, 'esmExport', scope, nodes);
						})
					} else {
						createNodesFromAST(edgesToBody, node.declaration, pathString, 'esmExport', scope, nodes);
					}
				} 
			}
			else if (node.type === 'ExportDefaultDeclaration') {
				if (node.declaration.type === 'FunctionDeclaration' || node.declaration.type === 'FunctionExpression' || node.declaration.type === 'ArrowFunctionExpression') {
					createNodesFromAST(edgesToBody, node.declaration, pathString, 'esmDefaultExport', scope, nodes);
				}

			}

			
			// create node if the current node in the traversal is a definition or invocation
			if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') {
				createdNode = checkAndCreateDefinitionNode(node, parent, pathString, scope);
				if (createdNode) {
					scope = scope + '=>' + padLeftZeros(createdNode.id, 10);
					if (ast.export) {
						createdNode.esmExport = true;
						createdNode.exportedName = createdNode.name;
					} else if (ast.defaultExport) {
						createdNode.esmDefaultExport = true;
					}
				}
			} else if (node.type === 'CallExpression') {
				createdNode = checkAndCreateInvocationNode(node, parent, pathString, scope);
				if (node.callee.property && node.callee.property.name === 'factory') {
					factory = node.arguments[0].value;
				}
			}

			// if a node was created, begin the traversal again starting just below that node
			if (createdNode) {
				if (ast.factory) {
					createdNode.factory = ast.factory;
				}
				nodes.push(createdNode);


				// if there is an ancestor on the ast, then create an edge between the ancestor and the current node
				if (ast.ancestor) {
					if (createdNode.id === 0) {console.log(createdNode)}
					if (edgesToBody[ast.ancestor.id]) {
						edgesToBody[ast.ancestor.id].push(createdNode.id);
					} else {
						edgesToBody[ast.ancestor.id] = [createdNode.id];
					}
				}

				// different recursive starting points if new node is definition vs invocation
				if (node.body) {
					createNodesFromAST(edgesToBody, node.body, pathString, createdNode, scope, nodes, factory);
				} else if (node.arguments) {
					node.arguments.forEach(function(argument){
						createNodesFromAST(edgesToBody, argument, pathString, createdNode, scope, nodes, factory);
					})
				}
			}


		}
	})

	return nodes;
};

// function that creates nodes for function declarations and expressions
var checkAndCreateDefinitionNode = function(node, parent, pathString, scope){
	var createdNode;

	// function declaration
	if (node.type === 'FunctionDeclaration') {
		createdNode = new Node(idCounter++, node.id.name, 'definition', pathString, node.loc.start, node.loc.end, scope);
		console.log(chalk.green('declaration ' + node.id.name + ' starts at line ' + node.loc.start.line + ' and ends at line ' + node.loc.end.line))
	} 

	// function expression
	else if (node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') {
		// variable is declared then assigned to function definition
		if (parent && parent.type === 'VariableDeclarator') {
			createdNode = new Node(idCounter++, parent.id.name, 'definition', pathString, node.loc.start, node.loc.end, scope);
			console.log(chalk.green('var ' + parent.id.name + ' assigned to function that starts at line ' + node.loc.start.line + ' and ends at line ' + node.loc.end.line))
		} 
		// function is defined as a parameter to another function's call, making it a callback function
		else if (parent && parent.type === 'CallExpression' || node.ancestor && node.ancestor.type === 'invocation') {
			createdNode = new Node(idCounter++, '(anonymous)', 'definition', pathString, node.loc.start, node.loc.end, scope);
			console.log(chalk.green('the function that starts at line ' + node.loc.start.line + ' and ends at line ' + node.loc.end.line + ' is a callback function'))
		} 
		// function is defined as a value inside an object literal
		else if (parent && parent.type === 'Property'){
			createdNode = new Node(idCounter++, parent.key.name, 'definition', pathString, node.loc.start, node.loc.end, scope);
			console.log(chalk.green('the function that starts at line ' + node.loc.start.line + ' and ends at line ' + node.loc.end.line + ' is assigned as a property inside an object literal'))
		}
		// function is assigned
		else if (parent && parent.type === 'AssignmentExpression') {
			// assigned to an object's property
			if (parent.left.type === 'MemberExpression') {
				createdNode = new Node(idCounter++, parent.left.property.name, 'definition', pathString, node.loc.start, node.loc.end, scope);
				createdNode.object = parent.left.object.name;
				console.log(chalk.green('a method named ' + parent.left.property.name + ' on object ' + parent.left.object.name + ' is defined starting at line ' + node.loc.start.line + ' and ending at line ' + node.loc.end.line))
			} 
			// assigned to a variable
			else if (parent.left.type === 'Identifier') {
				createdNode = new Node(idCounter++, parent.left.name, 'definition', pathString, node.loc.start, node.loc.end, scope);
				console.log(chalk.green('a function assigned to variable ' + parent.left.name + ' is defined starting at line ' + node.loc.start.line + ' and ending at line ' + node.loc.end.line))
			}
		}
		// function is returned from another function 
		else if (parent && parent.type === 'ReturnStatement') {
			createdNode = new Node(idCounter++, '(anonymous)', 'definition', pathString, node.loc.start, node.loc.end, scope);
			console.log(chalk.green('a function defined starting at line ' + node.loc.start.line + ' and ending at line ' + node.loc.end.line + ' was returned from another function'))
		}
		else if (parent && parent.type === 'ExpressionStatement') {
			createdNode = new Node(idCounter++, '(anonymous)', 'definition', pathString, node.loc.start, node.loc.end, scope);
			console.log(chalk.green('an anonymous function expression, not assigned to anything, was defined starting at line ' + node.loc.start.line + ' and ending at line ' + node.loc.end.line))
		}
		// other
		else {
			console.log('pathString', pathString);
			console.log('node', node);
			console.log('parent', parent)
		}
	}
	return createdNode;
	
};

// function that creates nodes for function invocations
var checkAndCreateInvocationNode = function(node, parent, pathString, scope){
	var createdNode;

	// function invocation
	if (node.type === 'CallExpression') {
		
		if (node.callee.type === 'Identifier') {
			createdNode = new Node(idCounter++, node.callee.name, 'invocation', pathString, node.callee.loc.start, node.callee.loc.end, scope);
			console.log(chalk.red('a function named ' + node.callee.name + ' was invoked on line ' + node.callee.loc.start.line))
		} 
		
		else if (node.callee.type === 'MemberExpression') {
			createdNode = new Node(idCounter++, node.callee.property.name, 'invocation', pathString, node.loc.start, node.loc.end, scope);
			createdNode.object = node.callee.object.name;
			console.log(chalk.red('a method named ' + node.callee.property.name + ' on object ' + node.callee.object.name + ' was invoked on line ' + node.callee.property.loc.start.line))
		} 

		else if (node.callee.type === 'CallExpression') {
			if (node.callee.callee.type === 'Identifier') {
				createdNode = new Node(idCounter++, 'function returned from ' + node.callee.callee.name, 'invocation', pathString, node.callee.callee.loc.start, node.callee.callee.loc.end, scope);
				console.log(chalk.red('a function returned from a function named ' + node.callee.callee.name + ' was invoked on line ' + node.callee.callee.loc.start.line))
			} else if (node.callee.callee.type === 'MemberExpression') {
				createdNode = new Node(idCounter++, 'function returned from ' + node.callee.callee.property.name, 'invocation', pathString, node.loc.start, node.loc.end, scope);
				createdNode.object = node.callee.callee.object.name;
				console.log(chalk.red('a function returned from a method named ' + node.callee.callee.property.name + ' on object ' + node.callee.callee.object.name + ' was invoked on line ' + node.callee.callee.property.loc.start.line))
			}
			
		}		
		
		else {
			console.log('pathString', pathString);
			console.log('node', node);
			console.log('parent', parent);
		}
	}
	return createdNode;
};

// function that tests whether a given node has already been created
var doesNodeExist = function(nodes, node, pathString){
	if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression' || node.type === 'CallExpression') {
		var repeats = nodes.filter(function(ele){
			if (node.loc.start.line === ele.start.line && node.loc.start.column === ele.start.column && ele.filePath === pathString) {
				return true;
			}
		});
		if (repeats.length) {
			return true;
		}
	}
};

var findEdgesInSameFile = function(nodes, edgesToBody, edgesToDefinition){
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

var padLeftZeros = function(num, length) {
	var totalZeros = length - (num+'').length;
	return '0'.repeat(totalZeros) + num;
};

var findRemainingEsmExports = function(ast, nodes, pathString){

	estraverse.traverse(ast, {
		enter: function(node, parent) {
			if (node.type === 'ExportNamedDeclaration' && node.specifiers.length) {
				node.specifiers.forEach(function(spec) {
					nodes.forEach(function(n){
						if (n.filePath === pathString && n.name === spec.local.name && n.scope === 'global'){
							n.esmExport = true;
							n.exportedName = spec.exported.name;
						}
					})
				})
			}
			else if (node.type === 'ExportDefaultDeclaration' && node.declaration.type === 'Identifier') {
				nodes.forEach(function(n){
					if (n.filePath === pathString && n.name === node.declaration.name && n.scope === 'global'){
						n.defaultExport = true;
					}
				})
			}
		}
	})

};

// var es6Paths = ['./esModules/testFile6.js', './esModules/testFile7.js', './esModules/testFile8.js', './esModules/testFile9.js']
// var serverPaths = ['./server-side/testFile1.js', './server-side/testFile2.js', './server-side/testFile3.js', './server-side/testFile4.js', './server-side/testFile5.js'];
// var angularPaths = ['./front-angular/compose.controller.js', './front-angular/email.factory.js', './front-angular/emailBox.controller.js', './front-angular/inbox.controller.js', './front-angular/sent.controller.js', './front-angular/singleEmail.controller.js', './front-angular/user.factory.js'];
// var code = {}
// angularPaths.forEach(function(path){
// 	code[path] = fs.readFileSync(path).toString();
// })
// analyzeFiles(code, 'angular');
// serverPaths.forEach(function(path){
// 	code[path] = fs.readFileSync(path).toString();
// })
// analyzeFiles(code, 'esm');
// es6Paths.forEach(function(path){
// 	code[path] = fs.readFileSync(path).toString();
// })
// analyzeFiles(code, 'esm');

module.exports = analyzeFiles;

