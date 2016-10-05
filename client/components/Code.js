//Code.js
import React from 'react';

//import CodeMirror from 'react-codemirror';
// Is this no longer needed? - Gio
// It is needed - this module below is how we are getting syntax highlighting!

require('codemirror/mode/javascript/javascript');
const CodeMirror = require('codemirror');

const Code = React.createClass({

  componentWillReceiveProps(nextProps) {
    if(nextProps.activeFileContent !== this.props.activeFileContent){
      this.codeMirror.setValue(nextProps.activeFileContent);
    }
  },

  componentDidMount() {

    this.codeMirror = CodeMirror( // eslint-disable-line new-cap
      this.refs.container,
      {
        lineNumbers: true,
        readOnly: false,
        mode: 'javascript',
        theme: 'blackboard',
        value: this.props.activeFileContent
      }
    );

    this.codeMirror.on('cursorActivity', ()=>{
      console.log('DAT CURSOR BRO',
        this.codeMirror.getCursor());

    })

  },

  render() {

    return (

        <div className="col-md-11" ref="container">

        </div>
    )
  }
});

export default Code;


