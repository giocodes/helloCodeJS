//FunctionTree.js
import React from 'react';
//import paper from 'paper';
import sampleData from '../data/sample-data';
import NodeGen from './NodeGen';
import Paper from './Paper';
// console.log(sampleData);

const FunctionTree = React.createClass({

  componentDidUpdate(){
    if(this.props.activeNodeId !== 0){
      window.document.getElementById('paper-container').className='fadeinpanel';
      // window.document.getElementById('paper-container').style.visibility='visible';
    }
  },

  componentDidMount: function(){
    let canvas = document.getElementById('myCanvas');
    this.paper = new Paper(canvas);
  },
  // Active node holder
  holder : null,

  componentWillUpdate: function(nextProps, nextState){

    if (this.holder !== nextProps.activeNodeId){
      if(this.paper) {
        this.paper.clearScreen();
      }
      this.holder = nextProps.activeNodeId;
      // Prevent trying to drawNodes without activeNode
      if (nextProps.activeNodeId !== 0){
        this.paper.drawTree(nextProps.activeNodeId, nextProps.nodes);
      //this.drawNodes(nextProps.nodes);
      //this.drawLegend()
      }
    }

    if (this.holder !== nextProps.hoveredOverNodeId){

    }
    console.log('heres the nextprops hoverOverId ,', nextProps.hoveredOverNodeId)
  },

  /*clearViz: function(){
      // targets the activeLayer and clears children groups
      if(this.paper.activeLayer){
        this.paper.activeLayer.children.forEach(group =>
        {
          group.removeChildren();
        })
      }

      //this.resizeCanvas();
  },*/
  //Have Gio use his CSS/Design Eye here to make the legend look better
  /*drawLegend: function(){
        let size = new paper.Size(60,60)
        let legendGroup = new paper.Group()
        let rectangle = new paper.Rectangle( new paper.Point(230, 540), size);
        let path = new paper.Path.Rectangle(rectangle);
        path.fillColor = '#b6d2dd';

        let legendTitle = new paper.PointText({
            point: new paper.Point(270, 540),
            content: 'Legend',
            fillColor: '#FFFFFF',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontWeight: 'bold',
            fontSize: 5,
            justification: 'center'
        });

        let legendKey = new paper.PointText({
            point: new paper.Point(250, 560),
            content: 'Invocation',
            fillColor: '#FFFFFF',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontWeight: 'bold',
            fontSize: 5,
            justification: 'center'
        })

        let legendKey2 = new paper.PointText({
            point: new paper.Point(250, 580),
            content: 'Definition',
            fillColor: '#FFFFFF',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontWeight: 'bold',
            fontSize: 5,
            justification: 'center'
        })

        let invocIcon = new paper.Rectangle( new paper.Point(270, 560), new paper.Size(5,5));
        let invocIconPath = new paper.Path.Rectangle(invocIcon)
        invocIconPath.fillColor = '#FFA500';

        let circleIcon = new paper.Path.Circle({
                center: [270, 580],
                radius: 5,
                fillColor: '#FFA500'
            }
        )

        legendGroup.addChildren([path, legendTitle, legendKey, legendKey2, invocIconPath, circleIcon])
  },*/

  /*drawNodes: function(data,nodeId){
    let node = data[nodeId-1]
    let firstNode;
    let lengthToCenterNode = 6;
    // Set the first node
    if(node.type === 'definition'){
          firstNode = new NodeGen.DefinitionNode(this.paper.project,node, false, lengthToCenterNode, null, null, this.props.setHoveredOverNodeId)
      } else if(node.type === 'invocation'){
          firstNode = new NodeGen.InvocationNode(this.paper.project,node, false, lengthToCenterNode, null, null, this.props.setHoveredOverNodeId)
      }
    // Set incoming Nodes
    if(node.incomingEdges.length > 0){
      node.incomingEdges.forEach((item,index) => {
          // loop throug sampleData[node.id]
          let length = node.incomingEdges.length
          if(data[item-1].type === 'definition'){
            new NodeGen.ConnectIncomingDefinition(this.paper.project,data[item-1],firstNode,index,length, this.props.setActiveNodeId, this.props.setHoveredOverNodeId)
          }
          else if(data[item-1].type ==='invocation'){
            new NodeGen.ConnectIncomingInvocation(this.paper.project,data[item-1],firstNode,index,length, this.props.setActiveNodeId, this.props.setHoveredOverNodeId)
          }
      })
    }

    if(node.outgoingEdges.length > 0){
      node.outgoingEdges.forEach((item, index) => {
          // loop throug sampleData[node.id]
          let length = node.outgoingEdges.length
          if(data[item-1].type ==='definition')
          {
            new NodeGen.ConnectOutgoingDefinition(this.paper.project,data[item-1],firstNode,index, length, this.props.setActiveNodeId, this.props.setHoveredOverNodeId)
          }
          else if(data[item-1].type ==='invocation'){
            new NodeGen.ConnectOutgoingInvocation(this.paper.project,data[item-1],firstNode,index, length, this.props.setActiveNodeId, this.props.setHoveredOverNodeId)
          }
      })
    }
  },*/

  render (){
    let canvasStyle = {
          backgroundColor: "#4C4C4C",
          // need to figure out how to make it 100% (percentage instead of pixels)
          width: 500,
          height: 600
    };
    return(
        <div>
        <div id="paper-title" className="">
          Functions Web
        </div>
        <canvas id="myCanvas"></canvas>
      </div>
    )
  }
});

export default FunctionTree;


//Regarding drawing the tree of nodes - I want it to function like this:
//
//startingNode...the starting node (NOT AN ID),
//nodeSet is the data set of all active nodes
//
//drawTree(startingNode, nodeSet){
//
//  drawNode(startingNode, center.x, center.y);
//
//  let numOfEdges = startingNode.outgoingEdges.length;
//  for all of the nodeIds in outgoingEdges,
//  draw the nodes with an offset
//  draw the connection
//
//  numOfEdges = startingNode.incomingEdges.length;
//  for all of the nodeIds in incomingEdges,
//  draw the nodes with an offset
//  draw the connection
//
//  --- could possibly support more levels by recursively calling drawTree
//
//}
//
//drawNode(nodeId, xPos, yPos){
//
//  draw the node at xPos, yPos
//
//}
//
//
//
//needs to take in Node objects
//drawConnection(fromNode, toNode){
//
// draw the connection between fromNode and toNode
//
//}
