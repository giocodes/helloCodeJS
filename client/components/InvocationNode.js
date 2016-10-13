//InvocationNode.js
import PaperNode from './PaperNode';


class InvocationNode extends PaperNode {
  constructor(project, xPos, yPos) {
    super(...arguments)
    this.group.addChild(this.text);

  }

  renderNode(){
    super.renderNode();
    this.path = new this.project.Shape.Ellipse(this.rectangle);
    this.applyStylesForRender();
    this.group.highlighted = false;
  }

}

export default InvocationNode;
