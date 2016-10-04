
let SingleNode = function(project, node){
    let startPoint = node.id * 25

    if(node.type === 'invocation'){
        this.rectangle = new project.Rectangle(new project.Point(25, startPoint), new project.Point(150, (20 + startPoint)));
        this.path = new project.Path.Rectangle(this.rectangle);
        this.path.strokeColor = 'red';
        // Text Example:
        this.text = new project.PointText(new project.Point(80, 10+startPoint));
        this.text.fillColor = 'black';
        // Set the content of the text item:
        this.text.content = node.name;
    }
    else if(node.type === 'definition'){
        this.circle = new project.Path.Circle({
                center: [87.5, 10 + startPoint],
                radius: 10,
                strokeColor: 'green'
            }
        )

        this.circle.strokeColor = 'green';
        this.text = new project.PointText(new project.Point(80, 10+startPoint));
        this.text.fillColor = 'black';
        this.text.content = node.name;

    }
    else{
        console.log('SingleNode encountered an error in NodeGen.js the node type was neither a definition or invocation!')
    }
}



const NodeGen = {
	SingleNode:SingleNode
}

export default NodeGen
