//FunctionTree.js
import React from 'react';
import paper from 'paper';
import NodeGen from './NodeGen';
// console.log(sampleData);

const HoverOver = React.createClass({


  render (){
    // console.log('heres the current ActiveFuncID in the child\n', this.props.toggledFuncID)
    let hoverOverStyle = {
          backgroundColor: "#7ec0ee",
          // need to figure out how to make it 100% (percentage instead of pixels)
          width: 100,
          height: 100
    };

    return(
        <div style={hoverOverStyle}> Hovered Over Node showed up </div>

    )
  }
});

export default HoverOver;

