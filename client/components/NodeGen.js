
let SingleNode = function(project, name,id = 1){
	let startPoint = id * 25
	this.rectangle = new project.Rectangle(new project.Point(25, startPoint), new project.Point(150, (20 + startPoint)));
    this.path = new project.Path.Rectangle(this.rectangle);
    this.path.strokeColor = 'red';
    // Text Example:
    this.text = new project.PointText(new project.Point(30, 10+startPoint));
    this.text.fillColor = 'black';
    // Set the content of the text item:
    this.text.content = name;
}

const NodeGen = {
	SingleNode:SingleNode
};

export default NodeGen;