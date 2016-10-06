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

  },
  // Active node holder
  holder : null,

  componentWillUpdate: function(nextProps, nextState){

    if (this.holder !== nextProps.activeNodeId){
      this.clearViz();
      this.holder = nextProps.activeNodeId;
      // Prevent trying to drawNodes without activeNode
      if (nextProps.activeNodeId !== 0){
      this.drawNodes(nextProps.nodes,nextProps.activeNodeId);
      }
    }
  },

  clearViz: function(){
      // targets the activeLayer and clears children groups
      paper.project.activeLayer.children.forEach(group =>
      {
        group.removeChildren();
      })
  },

  drawNodes: function(data,nodeId){
    let node = data[nodeId-1]
    let firstNode;
    // Set the first node
    if(node.type === 'definition'){
          firstNode = new NodeGen.DefinitionNode(paper,node, false, 6)
      } else if(node.type === 'invocation'){
          firstNode = new NodeGen.InvocationNode(paper,node, false, 6)
      }
    // Set incoming Nodes
    if(node.incomingEdges.length > 0){
      node.incomingEdges.forEach((item,index) => {
          // loop throug sampleData[node.id]
          let length = node.incomingEdges.length
          new NodeGen.ConnectIncoming(paper,data[item-1],firstNode,index,length)
      })
    }

    if(node.outgoingEdges.length > 0){
      node.outgoingEdges.forEach((item, index) => {
          // loop throug sampleData[node.id]
          let length = node.outgoingEdges.length
          new NodeGen.ConnectOutgoing(paper,data[item-1],firstNode,index, length)
      })
    }
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
        <strong>Function Web</strong>
        <canvas id="myCanvas" style={canvasStyle}></canvas>
      </div>
    )
  }
});

export default FunctionTree;
