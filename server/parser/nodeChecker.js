const isNodeDefinition = function(node){
	return node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression';
};

const isNodeInvocation = function(node){
	return node.type === 'CallExpression';
};

const isImportExportDeclaration = function(node){
	return node.type === 'ImportDeclaration' || node.type === 'ExportNamedDeclaration' || node.type === 'ExportDefaultDeclaration';
};

const doesNodeExist = function(nodes, astNode, filePath){
	const repeats = nodes.some(function(functionNode){
		return isAstNodeEqualToFunctionNode(astNode, functionNode, filePath);
	});
	if (repeats) {return true;}
};

const isAstNodeEqualToFunctionNode = function(astNode, functionNode, filePath){
	return astNode.loc.start.line === functionNode.start.line && astNode.loc.start.column === functionNode.start.column && astNode.loc.end.line === functionNode.end.line && astNode.loc.end.column === functionNode.end.column && functionNode.filePath === filePath;
};

module.exports = {isNodeDefinition, isNodeInvocation, isImportExportDeclaration, doesNodeExist};