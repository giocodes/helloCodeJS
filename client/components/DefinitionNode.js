//DefinitionNode.js
import PaperNode from './PaperNode';
import { Color } from 'paper';

class DefinitionNode extends PaperNode {
  constructor(project, xPos, yPos) {
    super(...arguments)
    this.group.addChild(this.text);

  }

  renderNode() {
    super.renderNode();
    this.path = new this.project.Path.Rectangle(this.rectangle);
    this.applyStylesForRender();
  }

}

export default DefinitionNode;
