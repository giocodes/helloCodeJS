
let SingleNode = function(project, node){
    let startPoint = node.id * 25

    if(node.type === 'definition'){
        this.rectangle = new project.Rectangle(new project.Point(187.5, startPoint), new project.Point(312.5, (20 + startPoint)));

        this.path = new project.Path.Rectangle(this.rectangle);

        this.path.strokeColor = 'red';
        this.path.fillColor = 'red';
        this.path.secretStorage = node.name
        this.path.onDoubleClick = function(event){
            console.log('a definition node got doubleclicked')
            console.log(this.secretStorage)
        }
        // Text Example:
        this.text = new project.PointText(new project.Point(220, 10+startPoint));
        this.text.fillColor = 'black';
        // Set the content of the text item:
        this.text.content = node.name;
        //adding Doubleclick Event handler

        this.text.onDoubleClick = function(event){
            console.log('a definition text node got doubleclicked')
            console.log(this.content)
        }

    }
    else if(node.type === 'invocation'){
        this.circle = new project.Path.Circle({
                center: [250, 10 + startPoint],
                radius: 10,
                strokeColor: 'green',
                fillColor: 'blue'
            }
        )
        //we need to have a fillColor so we can listen to the double click event - Yi
        this.circle.secretStorage = node.name

        this.text = new project.PointText(new project.Point(230, 10+startPoint));
        this.text.fillColor = 'black';

        this.text.content = node.name;

        //attaching double click event handler
        this.circle.onDoubleClick = function(event){
            console.log('an invocation node got doubleclicked')
            console.log(this.secretStorage)
        }
        this.text.onDoubleClick = function(event){
            console.log('an invocation text node got doubleclicked')
            console.log(this.content)
        }


    }
    else{
        console.log('SingleNode encountered an error in NodeGen.js the node type was neither a definition or invocation!')
    }
}



const NodeGen = {
	SingleNode:SingleNode
}

export default NodeGen
