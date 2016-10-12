const pathMod = require('path');

const logEdgesToBody = function(ancestor, node, edgesToBody){
	if (edgesToBody[ancestor.id]) {
		edgesToBody[ancestor.id].push(node.id);
	} else {
		edgesToBody[ancestor.id] = [node.id];
	}
};

const findEdges = function(nodes, files, edgesToBody, edgesToDefinition, esModuleImports, esModuleExports){
	findDefinitionEdgesInSameFile(nodes, edgesToDefinition);
	findCrossFileEdges(files, nodes, edgesToDefinition, esModuleImports, esModuleExports);
};

const findDefinitionEdgesInSameFile = function(nodes, edgesToDefinition){
	const invocations = [];
	const definitions = [];

	nodes.forEach(function(node) {
		node.type === 'invocation' ? invocations.push(node) : definitions.push(node);
	});
	
	invocations.forEach(function(inv){
		const matches = definitions.filter(function(def){
			return doNodeNameAndScopeMatch(inv, def) && doObjectsMatch(inv, def) ? true : false;
		});
		if (matches.length) {
			const bestMatch = matches.reduce(function(curr, next) {
				return curr.scope.length > next.scope.length ? curr : next;
			});
			edgesToDefinition[inv.id] = bestMatch.id;
		}
	})
};

const findCrossFileEdges = function(code, nodes, edgesToDefinition, esModuleImports, esModuleExports){
	// find invocations that do not yet have edges to their definitions
	var remainingInvocations = nodes.filter(function(node){
		return node.type === 'invocation' && !edgesToDefinition[node.id];
	});
	// find cross-file edges between invocations and definitions
	remainingInvocations.forEach(function(invocation){
		const currentFile = code[invocation.filePath],
			importData = esModuleImports[invocation.filePath][invocation.name],
			[sourcePath, modulePattern] = getSourcePath(invocation, currentFile, importData),
			sourceFile = code[sourcePath];

		nodes.forEach(function(node){
			if (modulePattern === 'ES6') {
				logES6ModuleEdges(invocation, importData, node, sourcePath, esModuleExports, edgesToDefinition);
			}
			else if (modulePattern === 'CommonJS') {
				logCommonJSModuleEdges(node, sourcePath, sourceFile, invocation, edgesToDefinition);
			} 
			else if (angularFactoryMatch(node, invocation)) {
				edgesToDefinition[invocation.id] = node.id;
			}
		});
	});
};

const transferEdgesToNodes = function(nodes, edgesToBody, edgesToDefinition){
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

const doNodeNameAndScopeMatch = function(inv, def){
	return inv.filePath === def.filePath && def.name === inv.name && inv.scope.indexOf(def.scope) > -1;
};

const doObjectsMatch = function(inv, def){
	return (inv.object && def.object && inv.object === def.object) || (!inv.object && !def.object);
};

const getModuleExport = function(sourceFile){
	const moduleExportMatch = /module\.exports\s*\=\s*([\w\$]+)/.exec(sourceFile);
	if (moduleExportMatch){
		return moduleExportMatch[1];
	}
};

const getSourcePath = function(invocation, currentFile, importData){
	const regexToCaptureRequiredFilepath = RegExp((invocation.object ? invocation.object : invocation.name) + '\\s*\\=\\s*require\\([\'\"](.+)[\'\"]\\)');
	const requiredFilePath = regexToCaptureRequiredFilepath.exec(currentFile);
	let sourcePath, modulePattern;
	
	if (requiredFilePath) {
		sourcePath = pathMod.normalize(pathMod.join(invocation.filePath, '../', requiredFilePath[1]));
		modulePattern = 'CommonJS';
	}
	else if (importData && importData.source) {
		sourcePath = pathMod.normalize(pathMod.join(invocation.filePath, '../', importData.source));
		modulePattern = 'ES6';
	} 
	return [sourcePath, modulePattern];
};

const logES6ModuleEdges = function(invocation, importData, node, sourcePath, esModuleExports, edgesToDefinition){
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
};

const logCommonJSModuleEdges = function(node, sourcePath, sourceFile, invocation, edgesToDefinition){
	if (node.type === 'definition' && node.filePath === sourcePath && node.scope === 'global') {
		if (invocation.object && node.name === invocation.name) {
			edgesToDefinition[invocation.id] = node.id;
		} else if (node.object === 'module' && node.name === 'exports') {
			edgesToDefinition[invocation.id] = node.id;
		} else if (node.name === getModuleExport(sourceFile)) {
			edgesToDefinition[invocation.id] = node.id;
		}
	}
};

const angularFactoryMatch = function(node, invocation){
	return node.factory && node.type === 'definition' && invocation.object && node.factory === invocation.object && node.name === invocation.name;
};

module.exports = {logEdgesToBody, findEdges, transferEdgesToNodes};
