//FileTree.js
import React from 'react';
import { Link } from 'react-router';
import fileTreeBuilder from '../utilities/fileTreeBuilder';
import TreeView from '../utilities/TreeView';

const FileTree = React.createClass({

  //Plugs into TreeView API.
  //This function is what will be passed into 'OnDoubleClick'
  chooseFile(data, node) {

    if(node.text.endsWith('.js')){
      console.log(node.path);
      this.props.requestFile(node.path);
      this.props.receiveFileContent(this.props.repoContents[node.path]);
    }

  },


  resetUser(e) {
    e.preventDefault();
    //Reset state
    this.props.requestRepos("");
    this.props.receiveRepos([]);
    this.props.requestRepoContents("");
    this.props.receiveRepoContents([]);
  },

  render (){

    //a tree to help with forming file paths
    var data = fileTreeBuilder(this.props.repoContents);

    if(this.props.activeRepo.length > 0){
      return(
        <div>
          <span><strong>{this.props.activeRepo.substr(18)}</strong></span>
          <span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={this.resetUser} style={{float: "right"}}></span>
          <TreeView
            {...this.props}
            data={data}
            levels={0}
            showBorder={false}
            onDoubleClick={this.chooseFile}
            color={"white"}
            backColor={"#25406B"}
            expandIcon={"glyphicon glyphicon-folder-close"}
            collapseIcon={"glyphicon glyphicon-folder-open"}
          />
        </div>
      )
    }

    return (<div>No repo selected.</div>)

  }
});

export default FileTree;
