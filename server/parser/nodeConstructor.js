const Node = function(id, name, type, filePath, start, end, scope){
	this.id = id;
	this.name = name;
	this.type = type;
	this.filePath = filePath;
	this.start = start;
	this.end = end;
	this.scope = scope;
	this.incomingEdges = [];
	this.outgoingEdges = [];
	this.incomingBody = [];
	this.outgoingBody = [];
	this.incomingDefinition = [];
	this.outgoingDefinition = [];
};

module.exports = Node;