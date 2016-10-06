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
    console.log('heres the data\n', data)
    let node = data[nodeId-1]
    let firstNode;
    let lengthToCenterNode = 6;
    // Set the first node
    if(node.type === 'definition'){
          firstNode = new NodeGen.DefinitionNode(paper,node, false, lengthToCenterNode)
      } else if(node.type === 'invocation'){
          firstNode = new NodeGen.InvocationNode(paper,node, false, lengthToCenterNode)
      }
    // Set incoming Nodes
    if(node.incomingEdges.length > 0){
      node.incomingEdges.forEach((item,index) => {
          // loop throug sampleData[node.id]
          let length = node.incomingEdges.length
          if(data[item-1].type === 'definition'){
            new NodeGen.ConnectIncomingDefinition(paper,data[item-1],firstNode,index,length, this.props.setActiveNodeId)
          }
          else if(data[item-1].type ==='invocation'){
            new NodeGen.ConnectIncomingInvocation(paper,data[item-1],firstNode,index,length, this.props.setActiveNodeId)
          }
      })
    }

    if(node.outgoingEdges.length > 0){
      node.outgoingEdges.forEach((item, index) => {
          // loop throug sampleData[node.id]
          let length = node.outgoingEdges.length
          if(data[item-1].type ==='definition')
          {
            new NodeGen.ConnectOutgoingDefinition(paper,data[item-1],firstNode,index, length, this.props.setActiveNodeId)
          }
          else if(data[item-1].type ==='invocation'){
            new NodeGen.ConnectOutgoingInvocation(paper,data[item-1],firstNode,index, length, this.props.setActiveNodeId)
          }
      })
    }
  },

  render (){
    // console.log('heres the current ActiveFuncID in the child\n', this.props.toggledFuncID)
    let canvasStyle = {
          backgroundColor: "#4C4C4C",
          // need to figure out how to make it 100% (percentage instead of pixels)
          width: 500,
          height: 600
    };

    return(
        <canvas id="myCanvas" style={canvasStyle}></canvas>
    )
  }
});

export default FunctionTree;
