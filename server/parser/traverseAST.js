const estraverse = require('estraverse');
const nodeChecker = require('./nodeChecker.js');
const buildNode = require('./buildNode.js');
const manageImportExport = require('./manageImportsExports.js');
const edges = require('./edges.js');

// function that creates nodes from an abstract syntax tree, traveling down the tree recursively to capture edgesToBody relationships
const readFileAndCreateNodes = function(ast, filePath, nodes, edgesToBody, esModuleImports, esModuleExports, ancestor, factory) {
	
	// attaching ancestor to ast so that it can be passed into traversal callback
	if (ast && ancestor) {
		ast.ancestor = ancestor;
		ast.factory = factory;
	}

	// traverse the ast
	estraverse.traverse(ast, {
		enter: function(astNode, parent) {

			// skip AST node if it is not a function node, an import/export statement, or if a node has already been created for it
			if ((!nodeChecker.isImportExportDeclaration(astNode) && !nodeChecker.isNodeDefinition(astNode) && !nodeChecker.isNodeInvocation(astNode)) || nodeChecker.doesNodeExist(nodes, astNode, filePath)) {
				return;
			}

			idCounter = nodes.length + 1;
			let factory = getAngularFactoryInfo(ast.factory, astNode),
				scope = ast.ancestor ? ast.ancestor.scopeAbove : 'global',
				createdNode; 

			if (nodeChecker.isImportExportDeclaration(astNode)) {
				createdNode = manageImportExport(astNode, filePath, esModuleImports, esModuleExports, scope, idCounter);
			}
			else if (nodeChecker.isNodeDefinition(astNode) || nodeChecker.isNodeInvocation(astNode)) {
				createdNode = buildNode(idCounter, astNode, parent, filePath, scope);
			}
			
			if (!createdNode) {return;}
			else {nodes.push(createdNode);}

			if (createdNode.type === 'definition') {scope = updateScope(scope, createdNode);}
			createdNode.factory = ast.factory;
			createdNode.scopeAbove = scope;

			// if there is an ancestor on the ast, then create an edge between the ancestor and the current node
			if (ast.ancestor) {edges.logEdgesToBody(ast.ancestor, createdNode, edgesToBody);}

			// if a node was created, begin the traversal again starting just below that node
			// different recursive starting points if new node is definition vs invocation
			if (astNode.body) {
				readFileAndCreateNodes(astNode.body, filePath, nodes, edgesToBody, esModuleImports, esModuleExports, createdNode, factory);
			} else if (astNode.arguments) {
				astNode.arguments.forEach(function(argument){
					readFileAndCreateNodes(argument, filePath, nodes, edgesToBody, esModuleImports, esModuleExports, createdNode, factory);
				})
			}
		}
	});
};

const padLeftZeros = function(num, length){
	var totalZeros = length - (num+'').length;
	return '0'.repeat(totalZeros) + num;
};

const updateScope = function(scope, createdNode){
	return createdNode ? scope + '=>' + padLeftZeros(createdNode.id, 10) : scope;
};

const getAngularFactoryInfo = function(factory, node){
	return nodeChecker.isNodeInvocation(node) && node.callee.property && node.callee.property.name === 'factory' ? node.arguments[0].value : factory;
};

module.exports = readFileAndCreateNodes;
