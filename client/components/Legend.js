//Key.js
import Edge from './Edge';
import store from '../store.js'

const style = {

}

class Legend{
  
  constructor(project, canvasHeight, canvasWidth, toggleLegend){
    this.project = project;
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.toggleLegend = toggleLegend;
    this.legendOn = true;
  }

  draw(){
    if (store.getState().toggleLegend) {
        this.drawFull();
    } else {
        this.drawMin();
    }
  }

  drawMin(){
    this.legendOn = false;
    const leftPos = this.canvasWidth/2 - 50;
    const topPos = this.canvasHeight - 45;
    let size = new this.project.Size(100, 40)
    let rectangle = new this.project.Rectangle(new this.project.Point(leftPos, topPos), size);
    let path = new this.project.Path.Rectangle(rectangle);
    path.strokeColor = '#FFFFFF'
    path.fillColor = '#4C4C4C'
    path.strokeWidth = 2;

    let text1 = new this.project.PointText({
        point: [leftPos + 7, topPos + 24],
        content: 'Show legend',
        fillColor: '#FFFFFF',
        fontSize: 15,
        justification: 'left'
    });

    this.group = [path, text1];
    
    text1.onClick = (e) => {
        this.clearLegend();
        this.toggleLegend(this.legendOn);
        this.drawFull();
    };
    path.onClick = (e) => {
        this.clearLegend();
        this.toggleLegend(this.legendOn);
        this.drawFull();
    };

  }

  drawFull(){
    this.legendOn = true;
    const leftPos = this.canvasWidth/2 - 165;
    const topPos = this.canvasHeight - 180;
    let size = new this.project.Size(330, 175)
    let rectangle = new this.project.Rectangle(new this.project.Point(leftPos, topPos), size);
    let path = new this.project.Path.Rectangle(rectangle);
    path.strokeColor = '#FFFFFF'
    path.fillColor = '#4C4C4C'
    path.strokeWidth = 2;

    let definitionExSize = new this.project.Size(25, 20)
    let definitionExShape = new this.project.Rectangle(new this.project.Point(leftPos + 18, topPos + 20), definitionExSize);
    let definitionExPath = new this.project.Path.Rectangle(definitionExShape);
    definitionExPath.strokeColor = '#b6d2dd'
    definitionExPath.fillColor = '#b6d2dd'
    definitionExPath.strokeWidth = 2;

    let invocationExSize = new this.project.Size(25, 20)
    let invocationExShape = new this.project.Rectangle(new this.project.Point(leftPos + 18, topPos + 60), invocationExSize);
    let invocationExPath = new this.project.Shape.Ellipse(invocationExShape);
    invocationExPath.strokeColor = '#b6d2dd'
    invocationExPath.fillColor = '#b6d2dd'
    invocationExPath.strokeWidth = 2;

    let activeExSize = new this.project.Size(25, 20)
    let activeExShape = new this.project.Rectangle(new this.project.Point(leftPos + 168, topPos + 20), activeExSize);
    let activeExPath = new this.project.Path.Rectangle(activeExShape);
    activeExPath.strokeColor = '#c5523f'
    activeExPath.fillColor = '#c5523f'
    activeExPath.strokeWidth = 2;

    let secondaryExSize = new this.project.Size(25, 20)
    let secondaryExShape = new this.project.Rectangle(new this.project.Point(leftPos + 168, topPos + 60), secondaryExSize);
    let secondaryExPath = new this.project.Path.Rectangle(secondaryExShape);
    secondaryExPath.strokeColor = '#459045'
    secondaryExPath.fillColor = '#459045'
    secondaryExPath.strokeWidth = 2;

    let src1 = {x: leftPos+18, y: topPos+110};
    let dest1 = {x: leftPos+80, y: topPos+110};
    let src2 = {x: leftPos+18, y: topPos+150};
    let dest2 = {x: leftPos+80, y: topPos+150};

    let edge1 = new Edge(this.project, src1, dest1, false, true);
    let edge2 = new Edge(this.project, src2, dest2, true, true);
    edge1.draw();
    edge2.draw();

    let text1 = new this.project.PointText({
        point: [leftPos + 60, topPos + 35],
        content: 'definition',
        fillColor: '#FFFFFF',
        fontSize: 14,
        justification: 'left'
    });
    let text2 = new this.project.PointText({
        point: [leftPos + 60, topPos + 75],
        content: 'invocation',
        fillColor: '#FFFFFF',
        fontSize: 14,
        justification: 'left'
    });
    let text3 = new this.project.PointText({
        point: [leftPos + 210, topPos + 35],
        content: 'active',
        fillColor: '#FFFFFF',
        fontSize: 14,
        justification: 'left'
    });
    let text4 = new this.project.PointText({
        point: [leftPos + 210, topPos + 75],
        content: 'secondary',
        fillColor: '#FFFFFF',
        fontSize: 14,
        justification: 'left'
    });
    let text5 = new this.project.PointText({
        point: [leftPos + 90, topPos + 114],
        content: 'edge to a function\'s definition',
        fillColor: '#FFFFFF',
        fontSize: 14,
        justification: 'left'
    });
    let text6 = new this.project.PointText({
        point: [leftPos + 90, topPos + 145],
        content: 'edge to invocation/definition',
        fillColor: '#FFFFFF',
        fontSize: 14,
        justification: 'left'
    });
    let text7 = new this.project.PointText({
        point: [leftPos + 90, topPos + 164],
        content: 'inside another invocation/definition',
        fillColor: '#FFFFFF',
        fontSize: 14,
        justification: 'left'
    });
    let text8 = new this.project.PointText({
        point: [leftPos + 313, topPos + 22],
        content: 'x',
        fillColor: '#FFFFFF',
        fontSize: 19,
        justification: 'left'
    });

    text8.onClick = (e) => {
        this.clearLegend();
        this.toggleLegend(this.legendOn);
        this.drawMin();
    };
    this.group = [text1, text2, text3, text4, text5, text6, text7, text8, edge1, edge2, path, definitionExPath, invocationExPath, activeExPath, secondaryExPath];
  }

  clearLegend(){
    this.group.forEach(item=>{
        item.remove();
    });
  }


}

export default Legend;
