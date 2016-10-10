class Node  {
    constructor(project,node,origin,index, length, setActiveNodeIdFunc, setHoveredOverNodeIdFunc, setHighlightedNodeIdFunc) {
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
            fontSize: 15,
            justification: 'center'
        });
        this.group.nodeId = node.id;
        console.log('in node, ' , setActiveNodeIdFunc)
        //adding Doubleclick Event handler
        this.registerEventListeners(setActiveNodeIdFunc, setHoveredOverNodeIdFunc, setHighlightedNodeIdFunc);
        this.renderShape(project);
    }

    registerEventListeners(toggleActive, toggleHover) {
        this.group.onDoubleClick = function(event){
            console.log('heres node toggleActive ', toggleActive)
        },

        this.group.onClick = function(event){
            console.log('single click event was registered ', event)
             console.log('heres the group', this)
        },

        this.group.onMouseEnter = function(event){
            toggleHover(this.nodeId)
        },

        this.group.onMouseLeave = function(event){
            console.log('we are done hovering', this.nodeId)
            toggleHover(0)
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
    constructor(project,node,origin,index,length, setActiveNodeIdFunc, setHoveredOverNodeIdFunc) {
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

    registerEventListeners(toggleActive, toggleHover) {
        this.group.onDoubleClick = function(event){
            toggleActive(this.nodeId)
        },

        this.group.onClick = function(event){
            console.log('single click event was registered ', event)
        },

        this.group.onMouseEnter = function(event){
            console.log('heres nodeId we are toggle hovering , ', this.nodeId)
            toggleHover(this.nodeId)
        },

        this.group.onMouseLeave = function(event){
            console.log('we are done hovering ' , this.nodeId)
            toggleHover(0)
        }
    }
}

class ConnectIncomingInvocation extends InvocationNode {
    constructor(project,node,origin,index, length, setActiveNodeIdFunc, setHoveredOverNodeIdFunc) {
        super(...arguments)
        //xDistribution is a point on where to position

        let xDistribution = (index + 1) * (project.view._viewSize._height / (length+1))
        this.group.position = new project.Point(this.canvasCenter*.5,xDistribution)
        let fromPoint = origin.group.position.add(new project.Point(-10,15));
        let toPoint = this.group.position.add(new project.Point(10,15));
        this.curve = new project.Path(fromPoint, toPoint);
        this.curve.strokeColor = 'black';
        this.group.addChild(this.curve);
    }

    registerEventListeners(toggleActive, toggleHover) {
        this.group.onDoubleClick = function(event){
            toggleActive(this.nodeId)
        },

        this.group.onClick = function(event){
            console.log('single click event was registered ', event)
        },

        this.group.onMouseEnter = function(event){
            console.log('heres nodeId we are toggle hovering , ', this.nodeId)
            toggleHover(this.nodeId)
        },

        this.group.onMouseLeave = function(event){
            console.log('we are done hovering ' , this.nodeId)
            toggleHover(0)
        }
    }
}

class ConnectOutgoingDefinition extends DefinitionNode {
    constructor(project,node,origin,index,length, setActiveNodeIdFunc, setHoveredOverNodeIdFunc) {
        super(...arguments)
        //xDistribution is a point on where to position

        let xDistribution = (index + 1) * (project.view._viewSize._height / (length+1))
        this.group.position = new project.Point(this.canvasCenter*1.5,xDistribution)
        //this is relative positioning
        let fromPoint = origin.group.position.add(new project.Point(10,15));
        let toPoint = this.group.position.add(new project.Point(-10,15));
        console.log('from', fromPoint);
        console.log('to', toPoint);
        // this.curve = new project.Path(fromPoint, toPoint);
        // this.curve.strokeColor = 'black';
        // this.group.addChild(this.curve);
        this.drawArc(project,fromPoint,toPoint);
    }
    drawArc(project,start,end){
        let middlePoint = (start.x + end.x)/3;
        let seg1 = new project.Segment(start,null, new project.Point(middlePoint,0));
        let seg2 = new project.Segment(end,new project.Point(-1 * middlePoint,40),null);
        let testCurve = new project.Path(seg1, seg2);
        testCurve.strokeColor = 'black';
        this.group.addChild(testCurve);
    }

    registerEventListeners(toggleActive, toggleHover) {
        this.group.onDoubleClick = function(event){
            toggleActive(this.nodeId)
        },

        this.group.onClick = function(event){
            console.log('single click event was registered ', event)
        },

        this.group.onMouseEnter = function(event){
            console.log('heres nodeId we are toggle hovering , ', this.nodeId)
            toggleHover(this.nodeId)
        },

        this.group.onMouseLeave = function(event){
            console.log('we are done hovering ', this.nodeId)
            toggleHover(0)
        }
    }
}

class ConnectIncomingDefinition extends DefinitionNode {
    constructor(project,node,origin,index, length, setActiveNodeIdFunc, setHoveredOverNodeIdFunc) {
        super(...arguments)
        let xDistribution = (index + 1) * (project.view._viewSize._height / (length+1))
        this.group.position = new project.Point(this.canvasCenter*.5,xDistribution)
        let fromPoint = origin.group.position.add(new project.Point(-10,15));
        let toPoint = this.group.position.add(new project.Point(10,15));
        this.curve = new project.Path(fromPoint, toPoint);
        this.curve.strokeColor = 'black';
        this.group.addChild(this.curve);
    }

    registerEventListeners(toggleActive, toggleHover) {
        this.group.onDoubleClick = function(event){
            toggleActive(this.nodeId)
        },

        this.group.onClick = function(event){
            console.log('single click event was registered ', event)
        },

        this.group.onMouseEnter = function(event){
            toggleHover(this.nodeId)
        },

        this.group.onMouseLeave = function(event){
            toggleHover(0)
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
