import { Color, Size, Rectangle, Group, PointText, Point } from 'paper';

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
    this.textName = node.name;
    this.x = xPos;
    this.y = yPos;
    this.nodeHeight = nodeHeight;
    this.nodeWidth = nodeHeight * widthHeightRatio;
    this.group = new Group();
    if (textPos === 'right') {
      textJustification = 'left';
      xTextOffset = this.nodeWidth/2 + paddingFromNodeToText;
    } else if (textPos === 'left') {
      textJustification = 'right';
      xTextOffset = (this.nodeWidth*0.5 + paddingFromNodeToText) * -1;
    } else {
      yTextOffset = (this.nodeHeight/2 + paddingFromNodeToText) * -1;
    }
    if (this.textName.length > 16) {
      this.textName = this.textName.slice(0, 13) + '...';
    }
    this.text = new PointText({
        point: [this.x + xTextOffset, this.y + yTextOffset],
        content: this.textName,
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
    //putting this on the group so I can access for highlighting purposes -Yi
    this.group.nodeId = this.nodeId;
    this.highlightedNodeId = this.project.highlightedNodeId;
    this.isActiveNode = false; //colorActive method will overwrite this

  }

  renderNode() {
    this.size = new Size(this.nodeWidth, this.nodeHeight)
    this.rectangle = new Rectangle(new Point(this.x - this.nodeWidth/2, this.y-this.nodeHeight/2), this.size);

  }

  applyStylesForRender(){
    this.path.fillColor = '#FFCC66';
    this.path.strokeColor = '#FFCC66'
    this.path.strokeWidth = 2;
    this.group.addChild(this.path);
    this.text.bringToFront();
  }

  registerEventListeners(toggleActive, toggleHover, toggleHighlighted, toggleMouseLoc) {

    let thisNode = this;
    this.group.onDoubleClick = function(event){
      toggleActive(thisNode.nodeId);
    },

    this.group.onClick = function(event){
      //first child is the path object
      if(!thisNode.isActiveNode){
        if(!(this.children[0].shadowBlur === 12)){
          this.children[0].shadowColor = '#8aff3d';
          this.children[0].shadowBlur = 12;
          this.children[0].fillColor = '#459045'
          this.children[0].strokeColor = '#459045'

          toggleHighlighted(thisNode.nodeId)
        }
        else{
          // this.children[0].shadowBlur = 0;
          // this.children[0].fillColor = '#b6d2dd';
          // this.children[0].strokeColor = '#b6d2dd';
          toggleHighlighted(0)
        }
      }

    }

    this.group.onMouseEnter = function(event){
      toggleHover(thisNode.nodeId)
    }

    this.group.onMouseLeave = function(event){
      toggleHover(0)
    }

    this.group.onMouseMove = function(event){
      toggleMouseLoc(event.point);
    }
  }

  colorAsActive(){
    this.isActiveNode = true;
    this.path.fillColor = '#c5523f';
    this.path.strokeColor = '#c5523f';
  }

  static getHeight(){
    return this.nodeHeight; //replace this at some point to better determine overall size
  }
}

export default PaperNode;
