import paper from 'paper';
import PaperNode from './PaperNode';
import DefinitionNode from './DefinitionNode';
import InvocationNode from './InvocationNode';
import Edge from './Edge';

class Paper {

  constructor(canvas, toggleActiveFn, toggleHoverFn){
    paper.setup(canvas);
    this.canvas = canvas;
    this.center = paper.project.view.center;
    this.activeNodes = [];
    this.toggleActive = toggleActiveFn;
    this.toggleHover = toggleHoverFn;
  }

  clearScreen() {
    paper.project.clear();
    this.activeNodes = [];
  }

  //paperNode is a reference to a paperNode object which has the node props
  //as well as some position data
  drawTree(startingNodeId, nodeList) {
    const startingNode = nodeList[startingNodeId-1];
    let paperNode = this.drawNode(startingNode, this.center.x, this.center.y);
    this.drawConnectedNodes(paperNode, nodeList, true);
    this.drawConnectedNodes(paperNode, nodeList, false);
  }

  drawConnectedNodes(paperNode, nodeList, isOutgoing){
    let horizOffsetValue = this.calculateHorizontalOffset();
    let horizontalOffset = isOutgoing ? horizOffsetValue : -horizOffsetValue;
    let connectedNodes = isOutgoing ? paperNode.outgoingEdges : paperNode.incomingEdges;
    let numOfEdges = connectedNodes.length;
    let offsetY = this.calculateVerticalOffset(numOfEdges);
    let currentY = 0; //shaky.  might need to revist.
    connectedNodes.forEach(nodeId => {
      currentY = currentY + offsetY;
      let newNode = this.drawNode(nodeList[nodeId-1], paperNode.x + horizontalOffset, currentY);
      isOutgoing ? this.drawEdge(paperNode, newNode) : this.drawEdge(newNode, paperNode);
    })
  }

  calculateVerticalOffset(numOfEdges){
    const verticalSpace = paper.project.view.size.height;
    return (verticalSpace - (PaperNode.getHeight()*numOfEdges)) / (numOfEdges + 1);
  }

  calculateHorizontalOffset(){
    const horizontalSpace = paper.project.view.size.width;
    return horizontalSpace/4;
  }

  drawNode(node, xPos, yPos){
    let paperNode;
    switch(node.type){
      case 'definition':
        paperNode = new DefinitionNode(paper, xPos, yPos, node);
        break;
      case 'invocation':
        paperNode = new InvocationNode(paper, xPos, yPos, node);
        break;
      default:
        paperNode = null;
    }
    paperNode.registerEventListeners(this.toggleActive, this.toggleHover);
    paperNode.renderNode();
    return paperNode;
  }

  drawEdge(fromPaperNode, toPaperNode){
    const edge = new Edge(paper, fromPaperNode, toPaperNode);
    edge.draw();
  }

  //TODO - Need a resize handler

}

export default Paper;
