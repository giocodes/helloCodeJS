import paper from 'paper';
import DefinitionNode from './DefinitionNode';
import InvocationNode from './InvocationNode';

class Paper {

  constructor(canvas){
    this.project = new paper.PaperScope();
    this.canvas = canvas;
    this.project.setup(canvas);
    this.activeLayer = new this.project.Layer();
    this.center = this.project.view.center;
    console.dir(this.project.view);
    //this.defineEventHandlers();
  }

  /*defineEventHandlers(){
    this.project.view.onResize(evt =>
      this.center = this.project.view.center
    )
  }*/

  clearScreen() {
    this.activeLayer.children.forEach(group => {
        group.removeChildren();
    })
  }

  drawTree(startingNodeId, nodeList) {
    this.drawNode(nodeList[startingNodeId], this.center.x, this.center.y);
  }

  drawNode(node, xPos, yPos){
    let paperNode;
    //console.log(node.type);
    switch(node.type){
      case 'definition':
        paperNode = new DefinitionNode(this.project, xPos, yPos, node.name);
        break;
      case 'invocation':
        paperNode = new InvocationNode(this.project, xPos, yPos, node.name);
        break;
      default:
        paperNode = null;
    }

    paperNode.renderNode();
  }

  drawConnection(fromNode, toNode){

  }


}

export default Paper;
