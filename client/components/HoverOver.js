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
      backgroundColor: "#b6d2dd",
      //#FF4500  #7ec0ee
      // need to figure out how to make it 100% (percentage instead of pixels)
      width: "400px",
      /* height: 90px, */
      position: "absolute",
      opacity: 0.9,
      margin: "auto",
      top: this.props.mouseLoc.y + 60,
      left: this.props.mouseLoc.x + (totalWidth/2),
      color: "#474747",
      textAlign: "center",
      borderRadius: "5px"
    };
    let hoveredOverNode = this.props.nodes[this.props.hoveredOverNodeId-1]
    let funcName = hoveredOverNode.name,
        funcType = hoveredOverNode.type,
        funcFilePath = '...'+hoveredOverNode.filePath.substr(-35),
        funcNumbIncNodes = hoveredOverNode.incomingEdges.length + hoveredOverNode.incomingDefinition.length,
        funcNumbOutNodes = hoveredOverNode.outgoingEdges.length + hoveredOverNode.outgoingDefinition.length,
        funcScope = hoveredOverNode.scope;
        // console.log(hoveredOverNode);

    return(
        <div id="hover-only-box" style={hoverOverStyle}>
            <div> Name: <strong>{funcName}   </strong> ▶︎ Incoming: <strong>{funcNumbIncNodes}</strong> ◀︎ Outgoing: <strong>{funcNumbOutNodes}</strong> </div>
            <div> Source File: <strong>{funcFilePath}</strong> </div>
        </div>

    )
  }
});

export default HoverOver;

