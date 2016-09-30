var esprima = require('esprima');
var estraverse = require('estraverse');
var fs = require('fs');
var chalk = require('chalk');

var Node = function(id, name, type, filePath, start, end){
	this.id = id;
	this.name = name;
	this.type = type;
	this.filePath = filePath;
	this.start = start;
	this.end = end;
}

var nodes = [];
var edgesToBody = {};
var edgesToDefinition = {};

var idCounter = 1;

var path = './testFile1.js';

var analyzeFile = function(path){
	var file = fs.readFileSync(path).toString();
	var ast = esprima.parse(file, {loc: true});
	createNodesFromAST(ast, path);
}

var createNodesFromAST = function(ast, pathString, ancestor) {

	if (ast && ancestor) {
		ast.ancestor = ancestor;
	}

	estraverse.traverse(ast, {
		enter: function(node, parent) {
			var createdNode;
			if (doesNodeExist(node, pathString)) {
				return;
			}
			
			if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
				createdNode = checkAndCreateDefinitionNode(node, parent, pathString);
			} else if (node.type === 'CallExpression') {
				createdNode = checkAndCreateInvocationNode(node, parent, pathString);
			}

			if (createdNode) {
				nodes.push(createdNode);
				if (ast.ancestor) {
					if (edgesToBody[ast.ancestor.id]) {
						edgesToBody[ast.ancestor.id].push(createdNode.id);
					} else {
						edgesToBody[ast.ancestor.id] = [createdNode.id];
					}
				}
				createNodesFromAST(node.body, pathString, createdNode);
			}


		}
	})
};


var checkAndCreateDefinitionNode = function(node, parent, pathString){
	var createdNode;
	// function declaration
	if (node.type === 'FunctionDeclaration') {
		createdNode = new Node(idCounter++, node.id.name, 'definition', pathString, node.loc.start, node.loc.end);
		console.log(chalk.green('declaration ' + node.id.name + ' starts at line ' + node.loc.start.line + ' and ends at line ' + node.loc.end.line))
	} 

	// function expression
	else if (node.type === 'FunctionExpression') {
		// variable is declared then assigned to function definition
		if (parent && parent.type === 'VariableDeclarator') {
			createdNode = new Node(idCounter++, parent.id.name, 'definition', pathString, node.loc.start, node.loc.end);
			console.log(chalk.green('var ' + parent.id.name + ' assigned to function that starts at line ' + node.loc.start.line + ' and ends at line ' + node.loc.end.line))
		} 
		// function is defined as a parameter to another function's call, making is a callback function
		else if (parent && parent.type === 'CallExpression') {
			createdNode = new Node(idCounter++, '(anonymous)', 'definition', pathString, node.loc.start, node.loc.end);
			console.log(chalk.green('the function that starts at line ' + node.loc.start.line + ' and ends at line ' + node.loc.end.line + ' is a callback function'))
		} 
		// function is assigned
		else if (parent && parent.type === 'AssignmentExpression') {
			// assigned to an object's property
			if (parent.left.type === 'MemberExpression') {
				createdNode = new Node(idCounter++, parent.left.property.name, 'definition', pathString, node.loc.start, node.loc.end);
				console.log(chalk.green('a method named ' + parent.left.property.name + ' on object ' + parent.left.object.name + ' is defined starting at line ' + node.loc.start.line + ' and ending at line ' + node.loc.end.line))
			} 
			// assigned to a variable
			else if (parent.left.type === 'Identifier') {
				createdNode = new Node(idCounter++, parent.left.name, 'definition', pathString, node.loc.start, node.loc.end);
				console.log(chalk.green('a function assigned to variable ' + parent.left.name + ' is defined starting at line ' + node.loc.start.line + ' and ending at line ' + node.loc.end.line))
			}
		}
		// function is returned from another function 
		else if (parent && parent.type === 'ReturnStatement') {
			createdNode = new Node(idCounter++, '(anonymous)', 'definition', pathString, node.loc.start, node.loc.end);
			console.log(chalk.green('a function defined starting at line ' + node.loc.start.line + ' and ending at line ' + node.loc.end.line + ' was returned from another function'))
		}

		// other
		else {
			console.log('node', node);
			console.log('parent', parent)
		}
	}

	return createdNode;
	
};


var checkAndCreateInvocationNode = function(node, parent, pathString){
	var createdNode;

	// function invocation
	if (node.type === 'CallExpression') {
		
		if (node.callee.type === 'Identifier') {
			createdNode = new Node(idCounter++, node.callee.name, 'invocation', pathString, node.callee.loc.start, node.callee.loc.end);
			console.log(chalk.red('a function named ' + node.callee.name + ' was invoked on line ' + node.callee.loc.start.line))
		} 
		
		else if (node.callee.type === 'MemberExpression') {
			createdNode = new Node(idCounter++, node.callee.property.name, 'invocation', pathString, node.callee.property.loc.start, node.callee.property.loc.end);
			console.log(chalk.red('a method named ' + node.callee.property.name + ' on object ' + node.callee.object.name + ' was invoked on line ' + node.callee.property.loc.start.line))
		} 
		
		else {
			console.log('node', node);
			console.log('parent', parent);
		}
	}

	return createdNode;
};

var doesNodeExist = function(node, pathString){
	if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression' || node.type === 'CallExpression') {
		var repeats = nodes.filter(function(ele){
			if (node.loc.start.line === ele.start.line && node.loc.start.column === ele.start.column && ele.filePath === pathString) {
				return true;
			}
		});
		if (repeats.length) {
			return true;
		}
	}
}


analyzeFile(path);



console.log(nodes)
console.log(edgesToBody)