class Node  {
    constructor(project,node,origin,index, length, setActiveNodeIdFunc) {
        // Wrap everything into a Group

        this.canvasCenter = project.view._viewSize._width/2
        this.canvasMiddle = project.view._viewSize._height/2
        this.startPoint = node.id * 70;
        this.group = new project.Group()
        this.text = new project.PointText({
            point: [this.canvasCenter, this.canvasMiddle],
            content: node.name,
            fillColor: '#FFFFFF',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontWeight: 'bold',
            fontSize: 25,
            justification: 'center'
        });
        this.group.nodeId = node.id;
        //adding Doubleclick Event handler
        this.registerEventListeners(setActiveNodeIdFunc);
        this.renderShape(project);
    }

    registerEventListeners(toggleActive) {
        this.group.onDoubleClick = function(event){
            console.log('heres toggleActive ', toggleActive)

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
class ConnectOutgoingInvocation extends InvocationNode {
    constructor(project,node,origin,index,length, setActiveNodeIdFunc) {
        super(...arguments)
        //xDistribution is a point on where to position
        let xDistribution = (index + 1) * (project.view._viewSize._height / (length+1))
        this.group.position = new project.Point(this.canvasCenter*1.5,xDistribution)
        //this is relative positioning
        let fromPoint = origin.group.position.add(new project.Point(10,15));
        let toPoint = this.group.position.add(new project.Point(-10,15));
        this.curve = new project.Path(fromPoint, toPoint);
        this.curve.strokeColor = 'black';
        this.group.addChild(this.curve);
    }

    registerEventListeners(toggleActive) {
        this.group.onDoubleClick = function(event){
            toggleActive(this.nodeId)
        }
    }
}

class ConnectIncomingInvocation extends InvocationNode {
    constructor(project,node,origin,index, length, setActiveNodeIdFunc) {
        super(...arguments)
        let xDistribution = (index + 1) * (project.view._viewSize._height / (length+1))
        this.group.position = new project.Point(this.canvasCenter*.5,xDistribution)
        let fromPoint = origin.group.position.add(new project.Point(-10,15));
        let toPoint = this.group.position.add(new project.Point(10,15));
        this.curve = new project.Path(fromPoint, toPoint);
        this.curve.strokeColor = 'black';
        this.group.addChild(this.curve);
    }

    registerEventListeners(toggleActive) {
        this.group.onDoubleClick = function(event){
            toggleActive(this.nodeId)
        }
    }
}

class ConnectOutgoingDefinition extends DefinitionNode {
    constructor(project,node,origin,index,length, setActiveNodeIdFunc) {
        super(...arguments)
        //xDistribution is a point on where to position
        let xDistribution = (index + 1) * (project.view._viewSize._height / (length+1))
        this.group.position = new project.Point(this.canvasCenter*1.5,xDistribution)
        //this is relative positioning
        let fromPoint = origin.group.position.add(new project.Point(10,15));
        let toPoint = this.group.position.add(new project.Point(-10,15));
        this.curve = new project.Path(fromPoint, toPoint);
        this.curve.strokeColor = 'black';
        this.group.addChild(this.curve);
    }

    registerEventListeners(toggleActive) {
        this.group.onDoubleClick = function(event){
            toggleActive(this.nodeId)
        }
    }
}

class ConnectIncomingDefinition extends DefinitionNode {
    constructor(project,node,origin,index, length, setActiveNodeIdFunc) {
        super(...arguments)
        let xDistribution = (index + 1) * (project.view._viewSize._height / (length+1))
        this.group.position = new project.Point(this.canvasCenter*.5,xDistribution)
        let fromPoint = origin.group.position.add(new project.Point(-10,15));
        let toPoint = this.group.position.add(new project.Point(10,15));
        this.curve = new project.Path(fromPoint, toPoint);
        this.curve.strokeColor = 'black';
        this.group.addChild(this.curve);
    }

    registerEventListeners(toggleActive) {
        this.group.onDoubleClick = function(event){
            toggleActive(this.nodeId)
        }
    }
}

const NodeGen = {
    DefinitionNode,
    InvocationNode,
    ConnectOutgoingInvocation,
    ConnectIncomingInvocation,
    ConnectOutgoingDefinition,
    ConnectIncomingDefinition
}

export default NodeGen
