//FileTree.js
import React from 'react';

const FileTree = React.createClass({
  render (){

    var style = {
        backgroundColor: "#ffde00",
        fontFamily: "sans-serif",
        textAlign: "center"
    };

    return(
      <div className="col-md-12" style={style}>
        <h1>
          THIS IS THE FILE TREE
        </h1>

      </div>
    )
  }
});

export default FileTree;
