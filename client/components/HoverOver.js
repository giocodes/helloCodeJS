//FunctionTree.js
import React from 'react';
import paper from 'paper';
import NodeGen from './NodeGen';

const HoverOver = React.createClass({


  render (){
    // let offsetWidthFileTree = window.document.getElementById('fileTree').offsetWidth;
    let offsetWidthCodeContainer = window.document.getElementById('code-container').offsetWidth;

    //realized that the fileTree will not be showing up if user is hovering over a node
    let totalWidth = offsetWidthCodeContainer

    // console.log('heres the respective widths for file tree and code container ,', offsetWidthFileTree, offsetWidthCodeContainer)

    let hoverOverStyle = {
          backgroundColor: "#FF4500",
          //#FF4500  #7ec0ee
          // need to figure out how to make it 100% (percentage instead of pixels)
          width: 400,
          height: 90,
          position: "absolute",
          opacity: 0.5,
          margin: "auto",
          top: this.props.mouseLoc.y + 40,
          left: this.props.mouseLoc.x + totalWidth
    };
    let hoveredOverNode = this.props.nodes[this.props.hoveredOverNodeId-1]
    let funcName = hoveredOverNode.name,
        funcType = hoveredOverNode.type,
        funcFilePath = hoveredOverNode.filePath,
        funcNumbIncNodes = hoveredOverNode.incomingEdges.length,
        funcNumbOutNodes = hoveredOverNode.outgoingEdges.length;

    return(
        <div id="hover-only-box" style={hoverOverStyle}>
            <div> Func Name: {funcName} </div>
            <div> File Path: {funcFilePath} </div>
           <div> Numb Incoming Edges: {funcNumbIncNodes} </div>
           <div> Numb Outgoing Edges: {funcNumbOutNodes} </div>
        </div>

    )
  }
});

export default HoverOver;

