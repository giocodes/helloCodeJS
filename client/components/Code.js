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
      let cursor = this.codeMirror.getCursor();
      this.props.setActiveNodeId(this.findChosenNode(cursor.line+1, cursor.ch) || 0);
    })

  },

  findChosenNode(line, ch){

    return this.props.nodes
    .filter(node => this.isInBoundsOfClick(node, line, ch))
    .sort((a,b)=>{
      let colDiff = 0.0;
      if(a.start.line == b.start.line){
        colDiff = Number("."+(b.start.column-a.start.column));
      }
      return (b.start.line-a.start.line) + colDiff;
    })
    .map(node => node.id)[0];

  },

  isInBoundsOfClick(node, line, ch){
    return node.filePath == this.props.activeFile && (
           (node.start.line == line && node.start.column <= ch &&
           node.end.line == line && node.end.column >= ch) ||
           (node.start.line < line && node.end.line > line) ||
           (node.start.line == line && node.end.line > line && node.start.column <= ch) ||
           (node.end.line == line && node.start.line < line && node.end.column >= ch));
  },

  render() {

    return (
      <div>
        <strong>{this.props.activeFile}</strong>
        <div className="col-md-11" ref="container">
        </div>
      </div>
    )
  }
});

export default Code;


