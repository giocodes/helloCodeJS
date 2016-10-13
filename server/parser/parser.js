const esprima = require('esprima');
const babelCore = require('babel-core');

const traverseTreeAndCreateNodes = require('./traverseAST.js');
const edges = require('./edges.js');

const parser = function(javascriptFiles){

	const files = copyFiles(javascriptFiles),
		esModuleImports = {},
		esModuleExports = {},
		edgesToBody = {}, // join table between function definitions/invocations and definitions/invocations within them
		edgesToDefinition = {}, // join table between function invocations and their original definitions
		nodes = []; // will collect nodes for each definition and invocation

	// run through each file fed into function to find nodes and same-file edges
	for (let filePath in files) {	
		const ast = convertFileToTree(filePath, files);
		if (!ast) {continue;}
		esModuleImports[filePath] = {};
		esModuleExports[filePath] = {};
		traverseTreeAndCreateNodes(ast, filePath, nodes, edgesToBody, esModuleImports, esModuleExports);
	}
	edges.findConnections(nodes, files, edgesToBody, edgesToDefinition, esModuleImports, esModuleExports);
	edges.transferConnectionsToNodes(nodes, edgesToBody, edgesToDefinition);

	return {nodes, code:files};
};

const convertFileToTree = function(filePath, files){
	let ast;
	const transpileMessage = '// ** helloCode note **\n// this file was transpiled from JSX to Javascript \n\n';
	try {
		ast = esprima.parse(files[filePath], {loc: true, sourceType: 'module'});
	} catch (err) {
		// if file is unparseable, try running through a JSX to JS transpiler and parsing again
		try {
			let transformedCode = babelCore.transform(files[filePath], {plugins: ["transform-react-jsx"]}).code;
			transformedCode = transpileMessage + transformedCode;
			ast = esprima.parse(transformedCode, {loc: true, sourceType: 'module'});
			files[filePath] = transformedCode;
		} catch(err) {
			return;
		}
	}
	return ast;
};

const copyFiles = function(files){
	return Object.assign({}, files);
};

module.exports = parser;

