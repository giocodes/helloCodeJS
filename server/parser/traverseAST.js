const estraverse = require('estraverse');
const nodeCreator = require('./nodeCreator.js');
const checkForImportExport = require('./manageImportsExports.js');
const edges = require('./edges.js');

// function that creates nodes from an abstract syntax tree, traveling down the tree recursively to capture edgesToBody relationships
const traverseAST = function(ast, filePath, nodes, edgesToBody, esModuleImports, esModuleExports, ancestor, factory) {
	
	// attaching ancestor to ast so that it can be passed into traversal callback
	if (ast && ancestor) {
		ast.ancestor = ancestor;
		ast.factory = factory;
	}

	// traverse the ast
	estraverse.traverse(ast, {
		enter: function(astNode, parent) {

			// skip AST node if it is not a function node, an import/export statement, or if a node has already been created for it
			if ((!isImportExportDeclaration(astNode) && !isNodeDefinition(astNode) && !isNodeInvocation(astNode)) || doesNodeExist(nodes, astNode, filePath)) {
				return;
			}

			idCounter = nodes.length + 1;
			let factory = getAngularFactoryInfo(ast.factory, astNode),
				scope = ast.ancestor ? ast.ancestor.scopeAbove : 'global',
				createdNode; 

			// if node is an import/export statement, log that information
			if (astNode.type === 'ExportDefaultDeclaration' && isNodeDefinition(astNode.declaration)) {
				createdNode = nodeCreator.createDefinitionNode(idCounter, astNode.declaration, astNode, filePath, scope);
			} else {
				checkForImportExport(astNode, filePath, esModuleImports, esModuleExports);
			}

			// create node if the current node in the traversal is a definition or invocation
			if (isNodeDefinition(astNode)) {
				createdNode = nodeCreator.createDefinitionNode(idCounter, astNode, parent, filePath, scope);
				scope = updateScope(scope, createdNode);
			} 
			else if (isNodeInvocation(astNode)) {
				createdNode = nodeCreator.createInvocationNode(idCounter, astNode, parent, filePath, scope);
			}

			if (!createdNode) {return;}
			else {nodes.push(createdNode);}

			createdNode.factory = ast.factory;
			createdNode.scopeAbove = scope;

			// if there is an ancestor on the ast, then create an edge between the ancestor and the current node
			if (ast.ancestor) {
				edges.logEdgesToBody(ast.ancestor, createdNode, edgesToBody);
			}

			// if a node was created, begin the traversal again starting just below that node
			// different recursive starting points if new node is definition vs invocation
			if (astNode.body) {
				traverseAST(astNode.body, filePath, nodes, edgesToBody, esModuleImports, esModuleExports, createdNode, factory);
			} else if (astNode.arguments) {
				astNode.arguments.forEach(function(argument){
					traverseAST(argument, filePath, nodes, edgesToBody, esModuleImports, esModuleExports, createdNode, factory);
				})
			}
		}
	});
};

// function that tests whether a given node has already been created
const doesNodeExist = function(nodes, astNode, filePath){
	var repeats = nodes.some(function(functionNode){
		return isAstNodeEqualToFunctionNode(astNode, functionNode, filePath);
	});
	if (repeats) {return true;}
};

const isAstNodeEqualToFunctionNode = function(astNode, functionNode, filePath){
	return astNode.loc.start.line === functionNode.start.line && astNode.loc.start.column === functionNode.start.column && astNode.loc.end.line === functionNode.end.line && astNode.loc.end.column === functionNode.end.column && functionNode.filePath === filePath;
};

const padLeftZeros = function(num, length){
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

const updateScope = function(scope, createdNode){
	return createdNode ? scope + '=>' + padLeftZeros(createdNode.id, 10) : scope;
};

const getAngularFactoryInfo = function(factory, node){
	if (isNodeInvocation(node) && node.callee.property && node.callee.property.name === 'factory') {
		return node.arguments[0].value;
	} else {
		return factory;
	}
};

module.exports = traverseAST;
