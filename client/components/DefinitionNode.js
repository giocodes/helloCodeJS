//DefinitionNode.js
import PaperNode from './PaperNode';

const style = {

}

class DefinitionNode extends PaperNode {
  constructor(project, xPos, yPos) {
    super(...arguments)
    this.group.addChild(this.text);
  }

  renderNode() {
    //console.log('def node', this.project);
    var size = new this.project.Size(20,20)
    var rectangle = new this.project.Rectangle(new this.project.Point(this.x-10, this.y-10), size);
    this.path = new this.project.Path.Rectangle(rectangle);
    this.path.fillColor = '#b6d2dd';
    this.group.addChild(this.path);
  }

}

export default DefinitionNode;
