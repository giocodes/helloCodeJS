//FunctionTree.js
import React from 'react';
import sampleData from '../data/sample-data';
import Paper from './Paper';
import HoverOver from './HoverOver';
import paper from 'paper'

const FunctionTree = React.createClass({

  componentDidUpdate(){
    if(this.props.activeNodeId !== 0){
      window.document.getElementById('paper-container').className='fadeinpanel';
      // window.document.getElementById('paper-container').style.visibility='visible';
    }
    console.log('heres this ,', this)
    console.log('heres this ', this.props.highlightedNodeId)
    console.log('heres showHover, ', this.showHover())
  },

  componentDidMount: function(){
    let canvas = document.getElementById('myCanvas');
    this.paper = new Paper(canvas, this.props.setActiveNodeId, this.props.setHoveredOverNodeId, this.props.setHighlightedNodeId, this.props.highlightedNodeId);
  },
  // Active node holder
  holder : null,

  componentWillUpdate: function(nextProps, nextState){
    if (this.holder !== nextProps.activeNodeId){
      if(this.paper) {
        this.paper.clearScreen();
        if (nextProps.activeNodeId !== 0){
          this.paper.drawTree(nextProps.activeNodeId, nextProps.nodes);
        }
      }

      this.holder = nextProps.activeNodeId;
    }

    if (this.paper.highlightedNodeId !== nextProps.highlightedNodeId){
      this.clearHighlighting(nextProps.highlightedNodeId)
    }

  },

    clearHighlighting: function(newHighlightedNodeId){
      let activeLayer = this.paper.getActiveLayer();
        // activeLayer.children.filter(child => return)
      let groups = activeLayer.children.filter(child => child.constructor === paper.Group)
      groups.forEach(group =>
          {
            if(group.nodeId !== newHighlightedNodeId){
              group.children[0].shadowBlur = 0;
            }
          }
      )

  },

  showHover: function(){
      return this.props.hoveredOverNodeId !== 0
  },

  render (){
    let canvasStyle = {
          backgroundColor: "#4C4C4C",
          // need to figure out how to make it 100% (percentage instead of pixels)
          width: 500,
          height: 600
    };

    return(
        <div style={{height: "75vh"}}>
        <div id="paper-title" className="">
          Functions Web
        </div>
            <canvas id="myCanvas"></canvas>
            {
              this.showHover() ?
                <HoverOver  {...this.props} {...this.state}/>
                : null
            }
        </div>
    )
  }
});

export default FunctionTree;

