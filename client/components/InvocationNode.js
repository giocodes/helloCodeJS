//InvocationNode.js
import PaperNode from './PaperNode';
import { Color } from 'paper';

const style = {

}

class InvocationNode extends PaperNode {
  constructor(project, xPos, yPos) {
    super(...arguments)
    this.group.addChild(this.text);

  }

  renderNode(){
    //console.log('inv node', this.project);
    /*this.circle = new this.project.Path.Circle({
      center: [this.x, this.y],
      radius: 10,
      fillColor: '#749395'
    })*/
    var size = new this.project.Size(100,80)
    var rectangle = new this.project.Rectangle(new this.project.Point(this.x-50, this.y-40), size);
    this.path = new this.project.Shape.Ellipse(rectangle);
    this.path.fillColor = '#b6d2dd';
    this.path.strokeColor = '#b6d2dd'
    this.path.strokeWidth = 2;
    // this.path.shadowColor = '#FFFFFF';
    // this.path.shadowBlur = 12
    this.group.addChild(this.path);
    this.text.bringToFront();
    this.group.highlighted = false;
    //this.group.addChild(this.circle);
  }

  registerEventListeners(toggleActive, toggleHover) {

    let thisNode = this;

    this.group.onDoubleClick = function(event){
      toggleActive(thisNode.nodeId);
    },

    this.group.onClick = function(event){
      console.log('single click event was registered ', event)
      console.log('heres the group', this)
      console.log('heres the shadowColor', this.ShadowColor)
      //first child is the path object
      if(!(this.children[0].shadowBlur === 12)){
        this.children[0].shadowColor = '#ffff00';
        this.children[0].shadowBlur = 12;
      }
      else{
        console.log('heres this before', this)
        console.log('heres this before', this.children[0].shadowBlur)
        console.log('you hit the else')
        this.children[0].shadowBlur = 0;
        console.log('heres this before', this)
        console.log('heres this before', this.children[0].shadowBlur)

      }
    }

    this.group.onMouseEnter = function(event){
      toggleHover(thisNode.nodeId)
    }

    this.group.onMouseLeave = function(event){
    console.log('we are done hovering', this.nodeId)
    toggleHover(0)
    }
  }

  colorAsActive(){
    this.path.fillColor = '#b3c623';
    this.path.strokeColor = new Color(255,255,0);
  }
}

export default InvocationNode;
