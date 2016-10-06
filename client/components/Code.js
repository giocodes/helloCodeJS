//Code.js
import React from 'react';
import _ from 'lodash';
// This module below is how we are getting syntax highlighting!
require('codemirror/mode/javascript/javascript');
const CodeMirror = require('codemirror');

const Code = React.createClass({

  componentWillReceiveProps(nextProps) {

    let activeNode;

    if(nextProps.activeFileContent !== this.props.activeFileContent){
      this.codeMirror.setValue(nextProps.activeFileContent);
    }

    if(nextProps.activeNodeId !== this.props.activeNodeId){
      activeNode = this.props.nodes[nextProps.activeNodeId-1];
      this.props.requestFile(activeNode.filePath);
      this.props.receiveFileContent(this.props.repoContents[activeNode.filePath]);
      this.props.setActiveNodeLoc({line: activeNode.start.line, ch: activeNode.start.column});
    }

    if(nextProps.activeNodeLoc !== this.props.activeNodeLoc){
      this.codeMirror.scrollIntoView(nextProps.activeNodeLoc);
      const newLineNum = nextProps.activeNodeLoc.line-1;
      const oldLineNum = this.props.activeNodeLoc.line-1;
      this.doc.addLineClass(newLineNum, "background", "highlight");
      if(!_.isEmpty(this.props.activeNodeLoc) && newLineNum !== oldLineNum)
        this.doc.removeLineClass(oldLineNum, "background", "highlight");
    }

  },

  jumpToNode(e){
    e.preventDefault();
    this.props.setActiveNodeId(+this.refs.selectedNode.value);
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

    this.doc = this.codeMirror.getDoc();

    this.codeMirror.on('cursorActivity', ()=>{
      let cursor = this.codeMirror.getCursor();
      let foundId = this.findChosenNode(cursor.line+1, cursor.ch);
      if(foundId > 0){
        //this.doc.removeLineClass(this.props.activeNodeLoc.line-1, "background", "highlight");
        this.props.setActiveNodeId(foundId);
        let activeNode = this.props.nodes[foundId-1];
        this.props.setActiveNodeLoc({line: activeNode.start.line, ch: activeNode.start.column})
      }

    })

  },

  findChosenNode(line, ch){

    const foundNodes = this.props.nodes
    .filter(node => this.isInBoundsOfClick(node, line, ch))
    .sort((a,b)=>{
      let colDiff = 0.0;
      if(a.start.line == b.start.line){
        colDiff = Number("."+(b.start.column-a.start.column));
      }
      return (b.start.line-a.start.line) + colDiff;
    })
    .map(node => node.id);

    if(foundNodes.length > 0) {
      return foundNodes[0];
    }

    return this.props.activeNodeId;

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
      <div className="col-md-11">
        <strong>{this.props.activeFile}</strong>
        <div ref="container">
        </div>
      </div>
    )
  }
});

export default Code;


