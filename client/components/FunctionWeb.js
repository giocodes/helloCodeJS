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

    function drawNodes (data,nodeId){
      let node = data[nodeId-1]
      let firstNode;
      // Set the first node
      if(node.type === 'definition'){
            firstNode = new NodeGen.DefinitionNode(paper,node)
        } else if(node.type === 'invocation'){
            firstNode = new NodeGen.InvocationNode(paper,node)
        }
      // Set incoming Nodes  
      console.log(node)
      node.incomingEdges.forEach((item,index) => {
          // loop throug sampleData[node.id]
          let length = node.incomingEdges.length
          new NodeGen.ConnectIncoming(paper,sampleData[item-1],firstNode,index,length)
      })
      node.outgoingEdges.forEach((item, index) => {
          // loop throug sampleData[node.id]
          let length = node.outgoingEdges.length
          new NodeGen.ConnectOutgoing(paper,sampleData[item-1],firstNode,index, length)
      })
    }

    drawNodes(sampleData,7)

    // Loading only a couple nodes for the curve example
    // let firstNode = new NodeGen.DefinitionNode(paper,sampleData[1]);
    // let secondNode = new NodeGen.ConnectOutgoing(paper,sampleData[3],firstNode);
    // let third = new NodeGen.ConnectIncoming(paper,sampleData[3],firstNode);

    // Draw all nodes on sampleData
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
