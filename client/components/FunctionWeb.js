//FunctionTree.js
import React from 'react';
import paper from 'paper';
import sampleData from '../data/sample-data';
import NodeGen from './NodeGen';
// console.log(sampleData);
let firstNode = sampleData[0]
console.log(firstNode)

console.log(NodeGen.hello)

window.onload = function() {
    // Get a reference to the canvas object
    let canvas = document.getElementById('myCanvas');
    // // Create an empty project and a view for the canvas:
    paper.setup(canvas);
    // // Example line:

    // NodeGen.SingleNode(paper,'banana');
    sampleData.map(node => NodeGen.SingleNode(paper,node.name, node.id))

    // let path = new paper.Path();
    // path.strokeColor = 'blue';
    // path.add(new paper.Point(75, 25));
    // path.add(new paper.Point(75, 125));
    // // let start = new paper.Point(50, 50);
    // // // Move to start and draw a line from there
    // // path.moveTo(start);
    // // // Note that the plus operator on Point objects does not work
    // // // in JavaScript. Instead, we need to call the add() function:
    // // path.lineTo(start.add([ 50, 100 ]));

    // // Square / Rectangle example:
    // // Rectangle(start point, size)
    // let rectangle = new paper.Rectangle(new paper.Point(25, 25), new paper.Point(150, 50));
    // let path2 = new paper.Path.Rectangle(rectangle);
    // // path2.fillColor = '#e9e9ff';
    // path2.strokeColor = 'red';
    // // path2.selected = true;

    // // Text Example:
    // var text = new paper.PointText(new paper.Point(30, 35));
    // text.fillColor = 'black';
    // // Set the content of the text item:
    // text.content = 'banana';

    // // Example circle:
    // // Path.Circle(center, radius)
    // let myCircle = new paper.Path.Circle(new paper.Point(75, 125), 45);
    // myCircle.strokeColor = 'red';
    // // Add text to circle
    // var text = new paper.PointText(new paper.Point(75, 125));
    // text.fillColor = 'black';
    // // Set the content of the text item:
    // text.content = 'banana';

    
    // // Draw the view now:
    // paper.view.draw();
  }

const FunctionTree = React.createClass({
  render (){

    let style = {
        backgroundColor: "#aaee11",
        height: 850
        //fontFamily: "sans-serif",
        //textAlign: "center"
    };
    let canvasStyle = {
          backgroundColor: "#E6E6E6",
          // need to figure out how to make it 100% (percentage instead of pixels)
          width: 500,
          height: 700
          
    };

    return(
      <div className="row" style={style}>
        <h1>
          THIS IS THE FUNCTION WEB VIEW
        </h1>

        
        <canvas id="myCanvas" style={canvasStyle}></canvas>

      </div>
    )
  }
});

export default FunctionTree;
