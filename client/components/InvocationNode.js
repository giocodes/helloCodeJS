//InvocationNode.js
import PaperNode from './PaperNode';

class InvocationNode extends PaperNode {
  constructor(project, xPos, yPos) {
    super(...arguments)
    this.group.addChild(this.text);
  }

  renderNode(){
    //console.log('inv node', this.project);
    this.circle = new this.project.Path.Circle({
      center: [this.x, this.y],
      radius: 10,
      fillColor: '#749395'
    })
    this.group.addChild(this.circle);
  }
}

export default InvocationNode;
