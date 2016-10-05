class Node  {
    constructor(project, node) {
        // Wrap everything into a Group
        this.canvasCenter = project.view._viewSize._width/2
        this.canvasMiddle = project.view._viewSize._height/2
        this.startPoint = node.id * 70;
        this.group = new project.Group()
        this.text = new project.PointText({
            point: [this.canvasCenter, this.canvasMiddle],
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
        let rectangle = new project.Rectangle(new project.Point(this.canvasCenter-10, 10 + this.canvasMiddle), size);
        this.path = new project.Path.Rectangle(rectangle);
        this.path.fillColor = '#b6d2dd';
    }
}
class InvocationNode extends Node {
    constructor(project, node) {
        super(...arguments)
        this.group.addChildren([this.circle,this.text])

    }

    renderShape(project){
        this.circle = new project.Path.Circle({
                center: [this.canvasCenter, 20 + this.canvasMiddle],
                radius: 10,
                fillColor: '#749395'
            }
        )
    }
}

//the difference between ConnectOutgoing and connectIncoming is the relative positioning
class ConnectOutgoing extends InvocationNode {
    constructor(project,node,origin,index,length) {
        super(...arguments)
        //xDistribution is a point on where to position
        let xDistribution = (index + 1) * (project.view._viewSize._height / (length+1))
        this.group.position = new project.Point(this.canvasCenter*1.5,xDistribution)
        //this is relative positioning
        let fromPoint = origin.group.position.add(new project.Point(10,15));
        let toPoint = this.group.position.add(new project.Point(-10,15));
        this.curve = new project.Path(fromPoint, toPoint);
        this.curve.strokeColor = 'black';
        console.log('heres this group\n', this.group);
        this.group.addChild(this.curve);
    }
}

class ConnectIncoming extends InvocationNode {
    constructor(project,node,origin,index, length) {
        super(...arguments)
        let xDistribution = (index + 1) * (project.view._viewSize._height / (length+1))
        this.group.position = new project.Point(this.canvasCenter*.5,xDistribution)
        let fromPoint = origin.group.position.add(new project.Point(-10,15));
        let toPoint = this.group.position.add(new project.Point(10,15));
        this.curve = new project.Path(fromPoint, toPoint);
        this.curve.strokeColor = 'black';
        console.log('heres this group\n', this.group);
        this.group.addChild(this.curve);
    }
}

const NodeGen = {
    DefinitionNode,
    InvocationNode,
    ConnectOutgoing,
    ConnectIncoming
}

export default NodeGen
