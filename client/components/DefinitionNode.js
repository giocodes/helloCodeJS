//DefinitionNode.js
import PaperNode from './PaperNode';

class DefinitionNode extends PaperNode {
  constructor(project, xPos, yPos) {
    super(...arguments)
    this.group.addChildren([this.path,this.text])
  }

  renderNode() {
    let size = new this.project.Size(20,20)
    let rectangle = new this.project.Rectangle(new this.project.Point(this.xPos-10, 10 + this.yPos), size);
    this.path = new this.project.Path.Rectangle(rectangle);
    this.path.fillColor = '#b6d2dd';
  }
}

export default DefinitionNode;
