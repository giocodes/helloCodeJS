//Code.js
import React from 'react';
import _ from 'lodash';
// This module below is how we are getting syntax highlighting!
require('codemirror/mode/javascript/javascript');
const CodeMirror = require('codemirror');

const Code = React.createClass({
  componentDidUpdate(){
    if(this.props.activeFile !== ""){
      window.document.getElementById('fileTree').className="overleft";
      window.document.getElementById('code-container').className='fadeinpanel';
      // window.document.getElementById('code-container').style.visibility='visible';
    }
  },
  componentWillReceiveProps(nextProps) {

    this.notUpdating = false;
    let activeNode;

    if(this.isPrimary && nextProps.activeFileContent !== this.props.activeFileContent){
      this.codeMirror.setValue(nextProps.activeFileContent);
    }

    if(!this.isPrimary && nextProps.highlightedFileContent !== this.props.highlightedFileContent){
      this.codeMirror.setValue(nextProps.highlightedFileContent);
    }

    if(this.isPrimary && nextProps.activeNodeId !== this.props.activeNodeId){
      activeNode = this.props.nodes[nextProps.activeNodeId-1];
      this.props.requestFile(activeNode.filePath);
      this.props.receiveFileContent(this.props.repoContents[activeNode.filePath]);
      this.props.setActiveNodeLoc({line: activeNode.start.line, ch: activeNode.start.column});
    }

    if(!this.isPrimary && nextProps.highlightedNodeId !== this.props.highlightedNodeId){
      activeNode = this.props.nodes[nextProps.highlightedNodeId-1];
      this.props.setHighlightedFile(activeNode.filePath);
      this.props.setHighlightedFileContent(this.props.repoContents[activeNode.filePath]);
      this.props.setHighlightedNodeLoc({line: activeNode.start.line, ch: activeNode.start.column});
    }

    if(this.isPrimary && nextProps.activeNodeLoc !== this.props.activeNodeLoc){
      this.codeMirror.scrollIntoView(nextProps.activeNodeLoc);
      const newLineNum = nextProps.activeNodeLoc.line-1;
      const oldLineNum = this.props.activeNodeLoc.line-1;
      this.doc.addLineClass(newLineNum, "background", "highlight");
      if(!_.isEmpty(this.props.activeNodeLoc) && newLineNum !== oldLineNum)
        this.doc.removeLineClass(oldLineNum, "background", "highlight");
    }

    if(!this.isPrimary && nextProps.highlightedNodeLoc !== this.props.highlightedNodeLoc){
      this.codeMirror.scrollIntoView(nextProps.highlightedNodeLoc);
      const newLineNum = nextProps.highlightedNodeLoc.line-1;
      const oldLineNum = this.props.highlightedNodeLoc.line-1;
      this.doc.addLineClass(newLineNum, "background", "highlight_other");
      if(!_.isEmpty(this.props.highlightedNodeLoc) && newLineNum !== oldLineNum)
        this.doc.removeLineClass(oldLineNum, "background", "highlight_other");
    }

    this.notUpdating = true;

  },


  componentDidMount() {

    this.notUpdating = true;

    this.isPrimary = this.props.isPrimary;

    this.setActiveFile = this.isPrimary ?
      this.props.activeFile : this.props.highlightedFile;
    this.setActiveFileContent = this.isPrimary ?
      this.props.activeFileContent : this.props.highlightedFileContent;
    this.setActiveNodeId = this.isPrimary ?
      this.props.setActiveNodeId : this.props.sethighlightedNodeId;
    this.setActiveNodeLoc = this.isPrimary ?
      this.props.setActiveNodeLoc : this.props.sethighlightedNodeLoc;

    this.codeMirror = CodeMirror( // eslint-disable-line new-cap
      this.refs.container,
      {
        lineNumbers: true,
        readOnly: false,
        mode: 'javascript',
        theme: 'blackboard',
        value: this.props.activeFileContent,
        lineWrapping: true,
        scrollbarStyle: 'null'
      }
    );

    this.doc = this.codeMirror.getDoc();

    this.codeMirror.on('cursorActivity', ()=>{
      if(this.notUpdating){
        let cursor = this.codeMirror.getCursor();
        let foundId = this.findChosenNode(cursor.line+1, cursor.ch);
        if(foundId > 0){
          this.setActiveNodeId(foundId);
          let activeNode = this.props.nodes[foundId-1];
          this.setActiveNodeLoc({line: activeNode.start.line, ch: activeNode.start.column})
        }
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

    return this.isPrimary ? this.props.activeNodeId : this.props.highlightedNodeId;

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
    return(
      <div className="half">
        <div className="panel-title">
          {this.isPrimary ? this.props.activeFile : this.props.highlightedFile}
        </div>
        <div ref="container">
        </div>
      </div>

    )
  }
});

export default Code;


