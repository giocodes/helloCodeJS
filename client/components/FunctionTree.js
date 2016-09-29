//FunctionTree.js
import React from 'react';

const FunctionTree = React.createClass({
  render (){

    var style = {
        padding: 10,
        margin: 10,
        backgroundColor: "#aaee11",
        width: 600,
        fontFamily: "sans-serif",
        textAlign: "center"
    };

    return(
      <div style={style}>
        <h1>
          THIS IS THE FUNCTION TREE VIEW
        </h1>

      </div>
    )
  }
});

export default FunctionTree;
