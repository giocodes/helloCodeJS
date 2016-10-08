//Node.js
class PaperNode  {
  //project is a reference to the project in paper this node will belong to
  //will be rendered at (xPos, yPos) in the canvas
  constructor(paper, xPos, yPos, node) {
    this.project = paper;
    this.x = xPos;
    this.y = yPos;
    //this.group = new this.project.Group()
    this.text = new this.project.PointText({
        point: [this.x, this.y],
        content: node.name,
        fillColor: '#FFFFFF',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        justification: 'center'
    });
    this.outgoingEdges = node.outgoingEdges;
    this.incomingEdges = node.incomingEdges;
  }

  registerEventListeners(toggleActive, toggleHover) {
    this.group.onDoubleClick = function(event){
        console.log('heres node toggleActive ', toggleActive)
    },

    this.group.onClick = function(event){
        console.log('single click event was registered ', event)
    },

    this.group.onMouseEnter = function(event){
        toggleHover(this.nodeId)
    }
  }

  static getHeight(){
    return 20; //replace this at some point to better determine overall size
  }
}

export default PaperNode;
