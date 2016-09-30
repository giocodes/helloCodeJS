//Code.js
import React from 'react';

import CodeMirror from 'codemirror';

const Code = React.createClass({

  componentDidMount(){
    this.codeMirror = CodeMirror(
      this.refs.container
      /*{
        value: this.props.code[0],
        mode: 'javascript',
        lineNumbers: true,
        readOnly: true,
      }*/
    );
  },

  render (){

    var style = {
        backgroundColor: "#de4512",
        fontFamily: "sans-serif",
        textAlign: "center"
    };

    return(
      //<div className="col-md-12" style={style}>
      <div className="col-md-12" style={style} ref="container">
      </div>
    )
  }
});

export default Code;
