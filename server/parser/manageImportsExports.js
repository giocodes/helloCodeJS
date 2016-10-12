const checkForImportExport = function(node, pathString, esModuleImports, esModuleExports){
	// log import/export info if node is an ES6 module import/export statement
	if (node.type === 'ImportDeclaration') {
		logEsmImports(node, pathString, esModuleImports);
	}
	else if (node.type === 'ExportNamedDeclaration' || node.type === 'ExportDefaultDeclaration') {
		logEsmExports(node, pathString, esModuleExports);
	}
};

const logEsmImports = function(node, pathString, esModuleImports){
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

const logEsmExports = function(node, pathString, esModuleExports){
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

module.exports = checkForImportExport;

