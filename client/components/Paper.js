import paper from 'paper';
import DefinitionNode from './DefinitionNode';
import InvocationNode from './InvocationNode';

class Paper {

  constructor(canvas){
    this.project = new paper.PaperScope();
    this.canvas = canvas;
    this.project.setup(canvas);
    this.activeLayer = new this.project.Layer();
    this.center = {x: canvas.width/2, y: canvas.height/2}
  }

  clearScreen() {
    this.activeLayer.children.forEach(group => {
        group.removeChildren();
    })
  }

  drawTree(startingNode, nodeList) {
    this.drawNode(startingNode, this.center.x, this.center.y);
  }

  drawNode(node, xPos, yPos){
    let paperNode;

    switch(node.type){
      case 'definition':
        paperNode = new DefinitionNode(this.project, xPos, yPos);
        break;
      case 'invocation':
        paperNode = new InvocationNode(this.project, xPos, yPos);
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
