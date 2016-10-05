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

    if(node.text.substr(node.text.length-3)==='.js'){
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

    var divStyle = {
      backgroundColor: "#ffde00",
      height: 650
    };

    var liStyle = {
      padding: "2px 15px"
    }

    var ulStyle = {
      padding: "0px"
    }

    var repos = this.props.repos.map((repo, i) =>
        <button className="list-group-item" value={repo.name} key={i} onClick={this.logRepo} style={liStyle}>{repo.name}</button>
    )

    //a tree to help with forming file paths
    var data = fileTreeBuilder(this.props.repoContents);

    if(this.props.activeRepo === ""){
      return(
        <div className="col-md-12">
          <form ref="usernameForm" onSubmit={this.handleSubmit}>
            <div className="form-group col-md-12">
              {/*<label htmlFor="github-id">Enter Github username:</label>*/}
              <label htmlFor="github-repo">Enter Github repo address:</label>

              <input id="github-repo" className="form-control" type="text" ref="repo" placeholder="https://github.com/<YOUR USERNAME>/<YOUR REPO>.git"/>
              <input type="submit" hidden />
            </div>
          </form>
        </div>
      )
    }


    return(
      <div className="container-fluid" style={{overflow: "hidden"}}>
        <button className="btn btn-primary" onClick={this.resetUser}>Reset</button>
        <p><strong>{this.props.activeRepo.substr(18)}</strong></p>
        <TreeView {...this.props} data={data} levels={0} showBorder={false} onDoubleClick={this.chooseFile} />
      </div>
    )

  }
});

export default FileTree;
