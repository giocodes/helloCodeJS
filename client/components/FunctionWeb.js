//FunctionTree.js
import React from 'react';
import paper from 'paper';
import sampleData from '../data/sample-data';
import NodeGen from './NodeGen';
// console.log(sampleData);

const FunctionTree = React.createClass({

  componentWillMount: function(){

  },
  resizeCanvas: function() { 
    let canvas = document.getElementById('myCanvas');
    let canvasWidth = document.getElementById('paper-container').offsetWidth;
    let canvasHeight = document.getElementById('paper-container').offsetHeight;
    console.log(canvasWidth,canvasHeight)
    canvas.width = canvasWidth;
    canvas.height = canvasHeight; 
  },

  componentDidMount: function(){
    // Create an empty project and a view for the canvas:
    // make canvas 100% width and height
    // window.onresize = this.resizeCanvas();
    let canvas = document.getElementById('myCanvas');
    this.resizeCanvas()
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
      this.resizeCanvas();
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
    // Commented out animation because it breaks resizing
    // if(this.props.isLoading){
    //       return (<div><img src="/loading-icon_amaze.gif" /></div>)
    // } 

    return(
        <canvas id="myCanvas"></canvas>
    )
  }
});

export default FunctionTree;
