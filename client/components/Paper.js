import paper from 'paper';
import PaperNode from './PaperNode';
import DefinitionNode from './DefinitionNode';
import InvocationNode from './InvocationNode';
import Edge from './Edge';
import Legend from './Legend';

class Paper {

  constructor(canvas, toggleActiveFn, toggleHoverFn, toggleHighlightedFn, highlightedNodeId, toggleMouseLocFn){
    paper.setup(canvas);
    this.canvas = canvas;
    this.center = paper.project.view.center;
    this.activeNodes = [];
    this.toggleActive = toggleActiveFn;
    this.toggleHover = toggleHoverFn;
    this.toggleHighlighted = toggleHighlightedFn;
    this.highlightedNodeId = highlightedNodeId;
    this.toggleMouseLoc = toggleMouseLocFn;
    this.topPadding = 30;
    this.maxNodeHeight = 60;
  }

  clearScreen() {
    paper.project.clear();
    this.activeNodes = [];
  }


  //paperNode is a reference to a paperNode object which has the node props
  //as well as some position data
  drawTree(startingNodeId, nodeList) {
    const startingNode = nodeList[startingNodeId-1];
    let paperNode = this.drawNode(startingNode, this.center.x, this.center.y + this.topPadding, this.maxNodeHeight, 'center');
    paperNode.colorAsActive();
    this.drawConnectedNodes(paperNode, nodeList, true);
    this.drawConnectedNodes(paperNode, nodeList, false);
    this.drawKey();
  }

  drawConnectedNodes(paperNode, nodeList, isOutgoing){
    let textAlign = isOutgoing ? 'right' : 'left';
    let connectedDefinitionNodes = isOutgoing ? paperNode.outgoingDefinition : paperNode.incomingDefinition;
    let connectedBodyNodes = isOutgoing ? paperNode.outgoingBody : paperNode.incomingBody;
    let numOfEdges = connectedDefinitionNodes.length + connectedBodyNodes.length;
    let spacePerNode = this.calculateVerticalSpacePerNode(numOfEdges);
    let nodeHeight = spacePerNode * 0.7 <= this.maxNodeHeight ? spacePerNode * 0.7 : this.maxNodeHeight;
    let paddingTop = (spacePerNode - nodeHeight) / 2;
    let currentY = paddingTop + this.topPadding;

    let horizOffsetValue = this.calculateHorizontalOffset();
    let horizontalOffset = isOutgoing ? horizOffsetValue : -horizOffsetValue;

    const draw = (connectedNodes, dashed) => {
      connectedNodes.forEach(nodeId => {
        let newNode = this.drawNode(nodeList[nodeId-1], paperNode.x + horizontalOffset, currentY, nodeHeight, textAlign);
        isOutgoing ? this.drawEdge(paperNode, newNode, dashed) : this.drawEdge(newNode, paperNode, dashed);
        currentY = currentY + spacePerNode;
      });
    };

    draw(connectedDefinitionNodes, false);
    draw(connectedBodyNodes, true);

  }

  calculateVerticalSpacePerNode(numOfEdges){
    const verticalSpace = paper.project.view.size.height - this.topPadding;
    return verticalSpace / numOfEdges;
  }

  calculateHorizontalOffset(){
    const horizontalSpace = paper.project.view.size.width;
    return horizontalSpace * 0.3;
  }

  drawNode(node, xPos, yPos, nodeHeight, textAlign){
    let paperNode;
    switch(node.type){
      case 'definition':
        paperNode = new DefinitionNode(paper, xPos, yPos, node, nodeHeight, textAlign);
        break;
      case 'invocation':
        paperNode = new InvocationNode(paper, xPos, yPos, node, nodeHeight, textAlign);
        break;
      default:
        paperNode = null;
    }
    console.log('we are drawing nodes heres this in paper constructor', this)
    console.log('Heres the mouseLoc Fn in this ', this.toggleMouseLoc)

    paperNode.registerEventListeners(this.toggleActive, this.toggleHover, this.toggleHighlighted, this.toggleMouseLoc);
    paperNode.renderNode();
    return paperNode;
  }

  drawEdge(fromPaperNode, toPaperNode, dashed, toFront){
    const edge = new Edge(paper, fromPaperNode, toPaperNode, dashed, toFront);
    edge.draw();
  }

  drawKey(){
    const canvasHeight = paper.project.view.size.height;
    const canvasWidth = paper.project.view.size.width;
    const legend = new Legend(paper, canvasHeight, canvasWidth);
    legend.draw();
    // const leftPos = canvasWidth/2 - 165;
    // const topPos = canvasHeight - 180;
    // let size = new paper.Size(330, 175)
    // let rectangle = new paper.Rectangle(new paper.Point(leftPos, topPos), size);
    // let path = new paper.Path.Rectangle(rectangle);
    // path.strokeColor = '#FFFFFF'
    // path.fillColor = '#4C4C4C'
    // path.strokeWidth = 2;

    // let definitionExSize = new paper.Size(25, 20)
    // let definitionExShape = new paper.Rectangle(new paper.Point(leftPos + 18, topPos + 20), definitionExSize);
    // let definitionExPath = new paper.Path.Rectangle(definitionExShape);
    // definitionExPath.strokeColor = '#b6d2dd'
    // definitionExPath.fillColor = '#b6d2dd'
    // definitionExPath.strokeWidth = 2;

    // let invocationExSize = new paper.Size(25, 20)
    // let invocationExShape = new paper.Rectangle(new paper.Point(leftPos + 18, topPos + 60), invocationExSize);
    // let invocationExPath = new paper.Shape.Ellipse(invocationExShape);
    // invocationExPath.strokeColor = '#b6d2dd'
    // invocationExPath.fillColor = '#b6d2dd'
    // invocationExPath.strokeWidth = 2;

    // let activeExSize = new paper.Size(25, 20)
    // let activeExShape = new paper.Rectangle(new paper.Point(leftPos + 168, topPos + 20), activeExSize);
    // let activeExPath = new paper.Path.Rectangle(activeExShape);
    // activeExPath.strokeColor = '#FF0'
    // activeExPath.fillColor = '#b3c623'
    // activeExPath.strokeWidth = 2;

    // let secondaryExSize = new paper.Size(25, 20)
    // let secondaryExShape = new paper.Rectangle(new paper.Point(leftPos + 168, topPos + 60), secondaryExSize);
    // let secondaryExPath = new paper.Path.Rectangle(secondaryExShape);
    // secondaryExPath.strokeColor = '#8aff3d'
    // secondaryExPath.fillColor = '#8aff3d'
    // secondaryExPath.strokeWidth = 2;

    // let src1 = {x: leftPos+18, y: topPos+110};
    // let dest1 = {x: leftPos+80, y: topPos+110};
    // let src2 = {x: leftPos+18, y: topPos+150};
    // let dest2 = {x: leftPos+80, y: topPos+150};

    // this.drawEdge(src1, dest1, false, true)
    // this.drawEdge(src2, dest2, true, true)

    // let text = new paper.PointText({
    //     point: [leftPos + 60, topPos + 35],
    //     content: 'definition',
    //     fillColor: '#FFFFFF',
    //     //fontFamily: 'Arial, Helvetica, sans-serif',
    //     //fontWeight: 'bold',
    //     fontSize: 14,
    //     justification: 'left'
    // });
    // let text2 = new paper.PointText({
    //     point: [leftPos + 60, topPos + 75],
    //     content: 'invocation',
    //     fillColor: '#FFFFFF',
    //     //fontFamily: 'Arial, Helvetica, sans-serif',
    //     //fontWeight: 'bold',
    //     fontSize: 14,
    //     justification: 'left'
    // });
    // let text3 = new paper.PointText({
    //     point: [leftPos + 210, topPos + 35],
    //     content: 'active',
    //     fillColor: '#FFFFFF',
    //     //fontFamily: 'Arial, Helvetica, sans-serif',
    //     //fontWeight: 'bold',
    //     fontSize: 14,
    //     justification: 'left'
    // });
    // let text4 = new paper.PointText({
    //     point: [leftPos + 210, topPos + 75],
    //     content: 'secondary',
    //     fillColor: '#FFFFFF',
    //     //fontFamily: 'Arial, Helvetica, sans-serif',
    //     //fontWeight: 'bold',
    //     fontSize: 14,
    //     justification: 'left'
    // });
    // let text5 = new paper.PointText({
    //     point: [leftPos + 90, topPos + 114],
    //     content: 'edge to a function\'s definition',
    //     fillColor: '#FFFFFF',
    //     //fontFamily: 'Arial, Helvetica, sans-serif',
    //     //fontWeight: 'bold',
    //     fontSize: 14,
    //     justification: 'left'
    // });
    // let text6 = new paper.PointText({
    //     point: [leftPos + 90, topPos + 145],
    //     content: 'edge to invocation/definition',
    //     fillColor: '#FFFFFF',
    //     //fontFamily: 'Arial, Helvetica, sans-serif',
    //     //fontWeight: 'bold',
    //     fontSize: 14,
    //     justification: 'left'
    // });
    // let text7 = new paper.PointText({
    //     point: [leftPos + 90, topPos + 164],
    //     content: 'inside another invocation/definition',
    //     fillColor: '#FFFFFF',
    //     //fontFamily: 'Arial, Helvetica, sans-serif',
    //     //fontWeight: 'bold',
    //     fontSize: 14,
    //     justification: 'left'
    // });
  }

  getActiveLayer(){
    return paper.project.activeLayer

  }

  updateHighlightedNodeId(highlightedNodeId){
    this.highlightedNodeId = highlightedNodeId;
  }
  //TODO - Need a resize handler

}

export default Paper;
