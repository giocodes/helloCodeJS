class Node  {
    constructor(project, node) {
        // Wrap everything into a Group
        this.canvasCenter = project.view._viewSize._width/2
        this.startPoint = node.id * 70;
        this.group = new project.Group()
        this.text = new project.PointText({
            point: [this.canvasCenter, this.startPoint],
            content: node.name,
            fillColor: '#3d3739',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontWeight: 'bold',
            fontSize: 25,
            justification: 'center'
        });
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
class ConnectInvocation extends InvocationNode {
    constructor(project,node,origin) {
        super(...arguments)
        this.group.position = new project.Point(this.canvasCenter*1.5,origin.startPoint)
        let from = origin.group.position;
        let through = new project.Point(this.canvasCenter*1.5,1+origin.startPoint);
        let to = this.group.position;
        this.curve = new project.Path(from, to);
        // this.curve = new project.Curve(from,through,through,to)
        this.curve.strokeColor = 'black';
    }
}

const NodeGen = {
    DefinitionNode: DefinitionNode,
    InvocationNode: InvocationNode,
    ConnectInvocation: ConnectInvocation
}

export default NodeGen
