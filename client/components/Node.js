//Node.js
class PaperNode  {
  //project is a reference to the project in paper this node will belong to
  //will be rendered at (xPos, yPos) in the canvas
  constructor(project, xPos, yPos) {
    this.project = project;
    this.xPos = xPos;
    this.yPos = yPos;
    this.group = new this.project.Group()
    this.text = new this.project.PointText({
        point: [this.xPos, this.yPos],
        content: node.name,
        fillColor: '#FFFFFF',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        justification: 'center'
    });
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

}

export default PaperNode;
