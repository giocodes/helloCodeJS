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


    this.drawNodes(sampleData,7)

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
  // Active node holder
  holder : null,

  componentWillUpdate: function(nextProps, nextState){

    if (this.holder !== nextProps.activeNodeId){
      this.clearViz();
      this.holder = nextProps.activeNodeId;
      this.drawNodes(nextProps.nodes,nextProps.activeNodeId);
    }

    // Use the button to draw a diferent node
    // let toggledID = nextProps.toggledFuncID

    // if(toggledID !== null){
    //   this.clearViz();
    //   this.drawNodes(sampleData,5);

    // }

  },

  clearViz: function(){
      // not sure why I have to do it like this but otherwise only some of the group items get removed

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
