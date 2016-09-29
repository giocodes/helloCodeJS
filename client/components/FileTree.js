//FileTree.js
import React from 'react';

const FileTree = React.createClass({
  render (){

    var style = {
        padding: 10,
        margin: 10,
        backgroundColor: "#ffde00",
        width: 100,
        fontFamily: "sans-serif",
        textAlign: "center"
    };

    return(
      <div style={style}>
        <h1>
          THIS IS THE FILE TREE
        </h1>

      </div>
    )
  }
});

export default FileTree;
