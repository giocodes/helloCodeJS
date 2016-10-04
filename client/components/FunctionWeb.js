//FunctionTree.js
import React from 'react';
import paper from 'paper';
import sampleData from '../data/sample-data';
import NodeGen from './NodeGen';
// console.log(sampleData);
let firstNode = sampleData[0]
console.log(firstNode)

window.onload = function() {
    // Get a reference to the canvas object
    let canvas = document.getElementById('myCanvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);
    
    sampleData.map(node => {
        if(node.type === 'definition'){
            new NodeGen.DefinitionNode(paper,node)
        } else if(node.type === 'invocation'){
            new NodeGen.InvocationNode(paper,node)
        }
    })
    
  }

const FunctionTree = React.createClass({
  render (){

    let canvasStyle = {
          backgroundColor: "#edece8",
          // need to figure out how to make it 100% (percentage instead of pixels)
          width: 500,
          height: 900

    };

    return(
      <div className="row">

        <canvas id="myCanvas" style={canvasStyle}></canvas>

      </div>
    )
  }
});

export default FunctionTree;
