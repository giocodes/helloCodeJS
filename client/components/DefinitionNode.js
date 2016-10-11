//DefinitionNode.js
import PaperNode from './PaperNode';
import { Color } from 'paper';

const style = {

}

class DefinitionNode extends PaperNode {
  constructor(project, xPos, yPos) {
    super(...arguments)
    this.group.addChild(this.text);

  }

  renderNode() {
    //console.log('def node', this.project);
    var size = new this.project.Size(this.nodeWidth, this.nodeHeight)
    var rectangle = new this.project.Rectangle(new this.project.Point(this.x - this.nodeWidth/2, this.y-this.nodeHeight/2), size);
    this.path = new this.project.Path.Rectangle(rectangle);
    this.path.fillColor = '#b6d2dd';
    this.path.strokeColor = '#b6d2dd'
    this.path.strokeWidth = 2;
    // this.path.shadowColor = '#FFFFFF'
    // this.path.shadowBlur = 12
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
      if(!(this.children[0].shadowBlur === 12)){
        this.children[0].shadowColor = '#8aff3d';
        this.children[0].shadowBlur = 12;
        toggleHighlighted(thisNode.nodeId)
      }
      else{
        this.children[0].shadowBlur = 0;
        toggleHighlighted(0)
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
    this.path.fillColor = '#b3c623';
    this.path.strokeColor = new Color(255,255,0);
  }

}

export default DefinitionNode;
