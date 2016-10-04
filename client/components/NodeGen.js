class Node  {
    constructor(project, node) {
        // Wrap everything into a Group
        this.canvasCenter = project.view._viewSize._width/2
        this.startPoint = node.id * 70;
        this.group = new project.Group()

        // Text Example:
        this.text = new project.PointText({
            point: [this.canvasCenter, this.startPoint],
            content: node.name,
            fillColor: '#3d3739',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontWeight: 'bold',
            fontSize: 25,
            justification: 'center'
        });
        
        // Add text to group
        // this.group.addChild(this.text)

        //adding Doubleclick Event handler
        this.registerEventListeners();
        this.renderShape(project);
    }

    registerEventListeners() {
        this.group.onDoubleClick = function(event){
            console.log('a group got doubleclicked')
            console.log(this.group)
        }
    }

    renderShape() {
        // will be overridden
    }

}

class DefinitionNode extends Node {
    constructor(project, node) {
        super(...arguments)
        this.group.addChildren([this.path,this.text])
    }

    renderShape(project) {
        let size = new project.Size(20,20)
        let rectangle = new project.Rectangle(new project.Point(this.canvasCenter-10, 10 + this.startPoint), size);
        this.path = new project.Path.Rectangle(rectangle);
        this.path.fillColor = '#b6d2dd';
    }
}
class InvocationNode extends Node {
    constructor(project,node) {
        super(...arguments)
        this.group.addChildren([this.circle,this.text])

    }

    renderShape(project){
        this.circle = new project.Path.Circle({
                center: [this.canvasCenter, 20 + this.startPoint],
                radius: 10,
                fillColor: '#749395'
            }
        )
    }
}



// let SingleNode = function(project, node){
//     let startPoint = node.id * 25

//     if(node.type === 'definition'){
//         this.rectangle = new project.Rectangle(new project.Point(187.5, startPoint), new project.Point(312.5, (20 + startPoint)));

//         this.path = new project.Path.Rectangle(this.rectangle);

//         this.path.strokeColor = 'red';
//         this.path.fillColor = 'red';
//         this.path.secretStorage = node.name
//         this.path.onDoubleClick = function(event){
//             console.log('a definition node got doubleclicked')
//             console.log(this.secretStorage)
//         }
//         // // Text Example:
//         // this.text = new project.PointText(new project.Point(220, 10+startPoint));
//         // this.text.fillColor = 'black';
//         // // Set the content of the text item:
//         // this.text.content = node.name;
//         // //adding Doubleclick Event handler

//         // this.text.onDoubleClick = function(event){
//         //     console.log('a definition text node got doubleclicked')
//         //     console.log(this.content)
//         // }

//     }
//     else if(node.type === 'invocation'){
//         this.circle = new project.Path.Circle({
//                 center: [250, 10 + startPoint],
//                 radius: 10,
//                 strokeColor: 'green',
//                 fillColor: 'blue'
//             }
//         )
//         //we need to have a fillColor so we can listen to the double click event - Yi
//         this.circle.secretStorage = node.name

//         this.text = new project.PointText(new project.Point(230, 10+startPoint));
//         this.text.fillColor = 'black';

//         this.text.content = node.name;

//         //attaching double click event handler
//         this.circle.onDoubleClick = function(event){
//             console.log('an invocation node got doubleclicked')
//             console.log(this.secretStorage)
//         }
//         this.text.onDoubleClick = function(event){
//             console.log('an invocation text node got doubleclicked')
//             console.log(this.content)
//         }


//     }
//     else{
//         console.log('SingleNode encountered an error in NodeGen.js the node type was neither a definition or invocation!')
//     }
// }



const NodeGen = {
    DefinitionNode: DefinitionNode,
    InvocationNode: InvocationNode
}

export default NodeGen
