//Node.js
class PaperNode  {
  //project is a reference to the project in paper this node will belong to
  //will be rendered at (xPos, yPos) in the canvas
  constructor(paper, xPos, yPos, node, nodeHeight, textPos) {
    const widthHeightRatio = 1.25;
    const paddingFromNodeToText = 7;
    const fontSize = 15;
    let textJustification = 'center';
    let xTextOffset = 0; 
    let yTextOffset = fontSize/2;
    this.project = paper;
    this.x = xPos;
    this.y = yPos;
    this.nodeHeight = nodeHeight;
    this.nodeWidth = nodeHeight * widthHeightRatio;
    this.group = new this.project.Group();
    if (textPos === 'right') {
      textJustification = 'left';
      xTextOffset = this.nodeWidth/2 + paddingFromNodeToText;
    } else if (textPos === 'left') {
      textJustification = 'right';
      xTextOffset = (this.nodeWidth*0.5 + paddingFromNodeToText) * -1;
    } else {
      yTextOffset = (this.nodeHeight/2 + paddingFromNodeToText) * -1;
    }
    this.text = new this.project.PointText({
        point: [this.x + xTextOffset, this.y + yTextOffset],
        content: node.name,
        fillColor: '#FFFFFF',
        //fontFamily: 'Arial, Helvetica, sans-serif',
        //fontWeight: 'bold',
        fontSize: fontSize,
        justification: textJustification
    });
    this.outgoingBody = node.outgoingBody;
    this.incomingBody = node.incomingBody;
    this.outgoingDefinition = node.outgoingDefinition;
    this.incomingDefinition = node.incomingDefinition;
    this.nodeId = node.id;
  }

  /*registerEventListeners(toggleActive, toggleHover) {

    let thisNode = this;

    this.group.onDoubleClick = function(event){
      toggleActive(thisNode.nodeId);
    },

    this.group.onClick = function(event){
      console.log('single click event was registered ', event)
    }

    this.group.onMouseEnter = function(event){
        toggleHover(thisNode.nodeId)
    }
  }*/

  static getHeight(){
    return this.nodeHeight; //replace this at some point to better determine overall size
  }
}

export default PaperNode;
