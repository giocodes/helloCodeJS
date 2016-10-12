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

const findCrossFileEdges = function(code, nodes, edgesToDefinition, esModuleImports, esModuleExports){

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

const transferEdgesToNodes = function(nodes, edgesToBody, edgesToDefinition){

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

module.exports = {logEdgesToBody, findEdges, transferEdgesToNodes};
