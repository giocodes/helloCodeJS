//Code.js
import React from 'react';

const Code = React.createClass({
  render (){

    var style = {
        padding: 10,
        margin: 10,
        backgroundColor: "#de4512",
        width: 500,
        fontFamily: "sans-serif",
        textAlign: "center"
    };

    return(
      <div style={style}>
        <h1>
          THIS IS THE CODE VIEW
        </h1>

      </div>
    )
  }
});

export default Code;
