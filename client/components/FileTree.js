//FileTree.js
import React from 'react';
import { Link } from 'react-router';
import fileTreeBuilder from '../utilities/fileTreeBuilder';
import TreeView from '../utilities/TreeView';

const FileTree = React.createClass({

  handleSubmit(e) {
    e.preventDefault();

    const repo = this.refs.repo.value;
    this.props.requestRepoContents(repo);

    fetch('http://localhost:7770/api/repo?url=' + repo)
    .then(response => {
      return response.json();
    })
    .then(repoObj => {
      this.props.receiveRepoContents(repoObj.code);
      this.props.receiveNodes(repoObj.nodes);
    })

  },

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

    if(this.props.activeRepo === ""){
      return(
        <div className="col-md-12">
          <form ref="usernameForm" onSubmit={this.handleSubmit}>
            <div className="form-group col-md-12">
              {/*<label htmlFor="github-id">Enter Github username:</label>*/}
              <label htmlFor="github-repo">Enter Github repo address here</label>

              <input id="github-repo" className="form-control" type="text" ref="repo" placeholder="Repo URL"/>
              <input type="submit" hidden />
            </div>
          </form>
        </div>
      )
    }

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
});

export default FileTree;
