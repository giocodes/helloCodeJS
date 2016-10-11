//Edge.js

const style = {

}

class Edge{
  //project = a reference to the project object in paper
  //src = the source of the edge (PaperNode)
  //dest = the destination of the edge (PaperNode)
  constructor(project, src, dest, dash, toFront){
    this.project = project;
    this.src = src;
    this.dest = dest;
    this.dash = dash;
    this.toFront = toFront;
  }

  draw(){
    let srcPt = new this.project.Point(this.src.x, this.src.y);
    let destPt = new this.project.Point(this.dest.x, this.dest.y);
    let h1 = new this.project.Point(80, 0);
    let h2 = new this.project.Point(-80, 0);

    var r1seg = new this.project.Segment(srcPt, null, h1);
    var r2seg = new this.project.Segment(destPt, h2, null);

    var connector = new this.project.Path(r1seg, r2seg);
    this.drawArrow(srcPt, destPt);

    connector.strokeColor = '#FFF';
    connector.strokeWidth = 2;
    
    if (this.dash) {
      connector.dashArray = [10, 10]
    }

    if (!this.toFront) {
      connector.sendToBack();
    }
  }

  drawArrow(start, end){
    var headLength = 10;
    var headAngle = 135;
    var arrowColor = '#FFF';
    
    var tailVector = new this.project.Point(end.x - start.x, end.y - start.y);
    var middle = new this.project.Point((end.x-start.x)/2 + start.x, (end.y-start.y)/2 + start.y);
    //var tailLine = new this.project.Path.Line(start, end);
    var headLine = tailVector.normalize(headLength);
    var point1 = new this.project.Point(middle.x + headLine.rotate(headAngle).x, middle.y + headLine.rotate(headAngle).y);
    var point2 = new this.project.Point(middle.x + headLine.rotate(-headAngle).x, middle.y + headLine.rotate(-headAngle).y);

    var arrow = new this.project.Path([
      point1,
      middle,
      point2
    ]);

    arrow.strokeColor = arrowColor;
    arrow.strokeWidth = 2;
  }

}

export default Edge;
