//FunctionTree.js
import React from 'react';
import paper from 'paper';
import sampleData from '../data/sample-data';
import NodeGen from './NodeGen';
// console.log(sampleData);

const FunctionTree = React.createClass({
  componentDidMount: function(){
    let canvas = document.getElementById('myCanvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    // Loading only a couple nodes for the curve example
    let firstNode = new NodeGen.DefinitionNode(paper,sampleData[1]);
    let secondNode = new NodeGen.ConnectOutgoing(paper,sampleData[3],firstNode);
    let third = new NodeGen.ConnectIncoming(paper,sampleData[3],firstNode);
    // console.log(paper.view)
    paper.view.zoom = 1;
    // sampleData.map(node => {
    //     if(node.type === 'definition'){
    //         new NodeGen.DefinitionNode(paper,node)
    //     } else if(node.type === 'invocation'){
    //         new NodeGen.InvocationNode(paper,node)
    //     }
    // })

    // console.log('heres the paper view size', paper.view.size)
  },
  

  render (){
    // console.log('heres the current ActiveFuncID in the child\n', this.props.toggledFuncID)

    let canvasStyle = {
          backgroundColor: "#edece8",
          // need to figure out how to make it 100% (percentage instead of pixels)
          width: 500,
          height: 600

    };

    return(
      <div className="row">

        <canvas id="myCanvas" style={canvasStyle}></canvas>
      </div>
    )
  }
});

export default FunctionTree;
