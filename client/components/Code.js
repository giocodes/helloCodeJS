//Code.js
import React from 'react';

const Code = React.createClass({
  render (){

    var style = {
        backgroundColor: "#de4512",
        fontFamily: "sans-serif",
        textAlign: "center"
    };

    return(
      <div className="col-md-12" style={style}>
        <h1>
          THIS IS THE CODE VIEW
        </h1>

      </div>
    )
  }
});

export default Code;
