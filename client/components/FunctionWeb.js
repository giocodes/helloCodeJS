//FunctionTree.js
import React from 'react';
import sampleData from '../data/sample-data';
import Paper from './Paper';
import HoverOver from './HoverOver';

const FunctionTree = React.createClass({

  componentDidUpdate(){
    if(this.props.activeNodeId !== 0){
      window.document.getElementById('paper-container').className='fadeinpanel';
      // window.document.getElementById('paper-container').style.visibility='visible';
    }

    console.log('In FunctionWeb  AAAAA')
    console.log('heres showHover, ', this.showHover())
  },

  componentDidMount: function(){
    let canvas = document.getElementById('myCanvas');
    this.paper = new Paper(canvas, this.props.setActiveNodeId, this.props.setHoveredOverNodeId);
        console.log('In FunctionWeb BBBBB')

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

            console.log('In FunctionWeb  CCCCC')

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
        <div>
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

