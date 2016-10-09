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
          width: 700,
          height: 80
    };
    let hoveredOverNode = this.props.nodes[this.props.hoveredOverNodeId-1]
    let funcName = hoveredOverNode.name,
        funcType = hoveredOverNode.type,
        funcFilePath = hoveredOverNode.filePath,
        funcNumbIncNodes = hoveredOverNode.incomingEdges.length,
        funcNumbOutNodes = hoveredOverNode.outgoingEdges.length;

    return(
        <div id="hover-only-box" style={hoverOverStyle}>
            <div> Func Name {funcName} </div>
            <div> File Path {funcFilePath} </div>
           <div> Numb incoming Edges {funcNumbIncNodes} </div>
           <div> Numb outgoing Edges {funcNumbOutNodes} </div>
        </div>

    )
  }
});

export default HoverOver;

