//Edge.js

const style = {

}

class Edge{
  //project = a reference to the project object in paper
  //src = the source of the edge (PaperNode)
  //dest = the destination of the edge (PaperNode)
  constructor(project, src, dest, dash){
    this.project = project;
    this.src = src;
    this.dest = dest;
    this.dash = dash;
  }

  draw(){
    let srcPt = new this.project.Point(this.src.x, this.src.y);
    let destPt = new this.project.Point(this.dest.x, this.dest.y);
    let h1 = new this.project.Point(100, 0);
    let h2 = new this.project.Point(-100, 0);

    var r1seg = new this.project.Segment(srcPt, null, h1);
    var r2seg = new this.project.Segment(destPt, h2, null);

    var connector = new this.project.Path(r1seg, r2seg);

    connector.strokeColor = 'black';
    if (this.dash) {
      connector.dashArray = [10, 10]
    }
    connector.sendToBack();
  }

}

export default Edge;
