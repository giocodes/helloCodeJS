//FunctionTree.js
import React from 'react';
import paper from 'paper';

const HoverOver = React.createClass({


  render (){
    // let offsetWidthFileTree = window.document.getElementById('fileTree').offsetWidth;
    let offsetWidthCodeContainer = window.document.getElementById('code-container').offsetWidth;

    //realized that the fileTree will not be showing up if user is hovering over a node
    let totalWidth = offsetWidthCodeContainer

    // console.log('heres the respective widths for file tree and code container ,', offsetWidthFileTree, offsetWidthCodeContainer)

    let hoveredOverNode = this.props.nodes[this.props.hoveredOverNodeId-1]
    let funcName = hoveredOverNode.name,
        funcType = hoveredOverNode.type,
        funcFilePath = hoveredOverNode.filePath.substr(-50) === hoveredOverNode.filePath ? hoveredOverNode.filePath : '...'+ hoveredOverNode.filePath.substr(-50),
        funcNumbIncNodes = hoveredOverNode.incomingBody.length + hoveredOverNode.incomingDefinition.length,
        funcNumbOutNodes = hoveredOverNode.outgoingBody.length + hoveredOverNode.outgoingDefinition.length,
        funcScope = hoveredOverNode.scope,
        maxWidth = getTextWidth('Incoming: x > Name: ' + funcName + ' > Outgoing: x', 'Helvetica') >= getTextWidth('Source file: ' + funcFilePath, 'Helvetica') ? getTextWidth('Incoming: x > Name: ' + funcName + ' > Outgoing: x', 'Helvetica') : getTextWidth('Source file: ' + funcFilePath, 'Helvetica'),
        pixelifiedMaxWidth = (Math.floor(maxWidth)*1.55 + 20) + 'px';

    let hoverOverStyle = {
      backgroundColor: "#b6d2dd",
      //#FF4500  #7ec0ee
      // need to figure out how to make it 100% (percentage instead of pixels)
      width: pixelifiedMaxWidth,
      /* height: 90px, */
      position: "absolute",
      opacity: 0.9,
      margin: "auto",
      top: this.props.mouseLoc.y + 60 || 0,
      left: this.props.mouseLoc.x + (totalWidth/2) || 0,
      color: "#474747",
      textAlign: "center",
      borderRadius: "5px",
    };

    function getTextWidth(text, font) {
      // re-use canvas object for better performance
      var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
      var context = canvas.getContext("2d");
      context.font = font;
      var metrics = context.measureText(text);
      return metrics.width;
    }

    return(
        <div id="hover-only-box" style={hoverOverStyle}>
            <div>Incoming: <strong>{funcNumbIncNodes} ︎<span>▶</span> </strong> Name: <strong>{funcName}</strong> <span>▶</span> ︎ Outgoing: <strong>{funcNumbOutNodes}</strong> </div>
            <div> Source File: <strong>{funcFilePath}</strong> </div>
        </div>

    )
  }
});

export default HoverOver;

