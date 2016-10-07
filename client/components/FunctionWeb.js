//FunctionTree.js
import React from 'react';
import paper from 'paper';
import sampleData from '../data/sample-data';
import NodeGen from './NodeGen';
// console.log(sampleData);

const FunctionTree = React.createClass({

  componentDidUpdate(){
    if(this.props.activeNodeId !== 0){
      window.document.getElementById('paper-container').className='fadeinpanel';
      // window.document.getElementById('paper-container').style.visibility='visible';
    } 
  },
  resizeCanvas: function() { 
    let canvas = document.getElementById('myCanvas');
    let canvasWidth = document.getElementById('paper-container').offsetWidth;
    let canvasHeight = document.getElementById('paper-container').offsetHeight;
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
      this.drawLegend()
      }
    }

    if (this.holder !== nextProps.hoveredOverNodeId){

    }
    console.log('heres the nextprops hoverOverId ,', nextProps.hoveredOverNodeId)
  },

  clearViz: function(){
      // targets the activeLayer and clears children groups
      paper.project.activeLayer.children.forEach(group =>
      {
        group.removeChildren();
      })
      this.resizeCanvas();
  },
  //Have Gio use his CSS/Design Eye here to make the legend look better
  drawLegend: function(){
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
  },

  drawNodes: function(data,nodeId){
    let node = data[nodeId-1]
    let firstNode;
    let lengthToCenterNode = 6;
    // Set the first node
    if(node.type === 'definition'){
          firstNode = new NodeGen.DefinitionNode(paper,node, false, lengthToCenterNode, null, null, this.props.setHoveredOverNodeId)
      } else if(node.type === 'invocation'){
          firstNode = new NodeGen.InvocationNode(paper,node, false, lengthToCenterNode, null, null, this.props.setHoveredOverNodeId)
      }
    // Set incoming Nodes
    if(node.incomingEdges.length > 0){
      node.incomingEdges.forEach((item,index) => {
          // loop throug sampleData[node.id]
          let length = node.incomingEdges.length
          if(data[item-1].type === 'definition'){
            new NodeGen.ConnectIncomingDefinition(paper,data[item-1],firstNode,index,length, this.props.setActiveNodeId, this.props.setHoveredOverNodeId)
          }
          else if(data[item-1].type ==='invocation'){
            new NodeGen.ConnectIncomingInvocation(paper,data[item-1],firstNode,index,length, this.props.setActiveNodeId, this.props.setHoveredOverNodeId)
          }
      })
    }

    if(node.outgoingEdges.length > 0){
      node.outgoingEdges.forEach((item, index) => {
          // loop throug sampleData[node.id]
          let length = node.outgoingEdges.length
          if(data[item-1].type ==='definition')
          {
            new NodeGen.ConnectOutgoingDefinition(paper,data[item-1],firstNode,index, length, this.props.setActiveNodeId, this.props.setHoveredOverNodeId)
          }
          else if(data[item-1].type ==='invocation'){
            new NodeGen.ConnectOutgoingInvocation(paper,data[item-1],firstNode,index, length, this.props.setActiveNodeId, this.props.setHoveredOverNodeId)
          }
      })
    }
  },

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
