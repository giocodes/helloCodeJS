//Code.js
import React from 'react';

//import CodeMirror from 'codemirror';

const Code = React.createClass({

  componentDidMount() {
    this.codeMirror = CodeMirror( // eslint-disable-line new-cap
      this.refs.container
      /*{
        value: this.props.defaultValue,
        mode: this.props.mode,
        lineNumbers: this.props.lineNumbers,
        readOnly: this.props.readOnly,
      }*/
    );
  }

  render (){

    var style = {
        backgroundColor: "#de4512",
        fontFamily: "sans-serif",
        textAlign: "center"
    };

    return(
      //<div className="col-md-12" style={style}>
      <div className="col-md-12" ref="container">
        <h1>
          THIS IS THE CODE VIEW
        </h1>

      </div>
    )
  }
});

export default Code;
