//FileTree.js
import React from 'react';
import { Link } from 'react-router';
import fileTreeBuilder from '../utilities/fileTreeBuilder';
import TreeView from '../utilities/TreeView';

const FileTree = React.createClass({

  handleSubmit(e) {
    e.preventDefault();
    /*const username = this.refs.username.value;
    this.props.requestRepos(username);

    fetch('https://api.github.com/users/'+username+'/repos')
    .then(response => {
      return response.json()})
    .then(repos => {
      this.props.receiveRepos(repos);
    });*/

    const repo = this.refs.repo.value;
    this.props.requestRepoContents(repo);

    fetch('http://localhost:7770/api/repo?url=' + repo)
    .then(response => {
      return response.json();
    })
    .then(repoObj => {
      this.props.receiveRepoContents(repoObj);
    })

  },

  logRepo(e) {
    e.preventDefault();
    const repo = e.target.value;
    const baseUrl = 'https://api.github.com/repos/'+this.props.username+'/'+repo+'/contents';
    this.props.requestRepoContents(repo);

    fetch(baseUrl)
    .then(response => {
      return response.json()})
    .then(repoContents => {
      //console.log(repoContents);
      this.props.receiveRepoContents(repoContents);

    });
  },

  chooseFile(e) {
    e.preventDefault();
    const file = e.target.value;
    this.props.requestFile(file);

    fetch('https://api.github.com/repos/'+this.props.username+'/'+this.props.activeRepo+'/contents/' + file)
    .then(response => {
      return response.json()})
    .then(fileContent => {
      //console.log(fileContent);
      this.props.receiveFileContent(atob(fileContent.content));
    });
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

    /*var contents;

    if(fileTree.length !== 0){
      contents = Object.keys(this.props.repoContents).map((key, i) =>
        <p key={'key-'+i} style={liStyle} >{key}</p>
      )
    }*/



    //  if(this.props.username === ""){
    //   return(
    //     <div className="col-md-12">
    //       <form ref="usernameForm" onSubmit={this.handleSubmit}>
    //         <div className="form-group col-md-12">
    //           {/*<label htmlFor="github-id">Enter Github username:</label>*/}
    //           <label htmlFor="github-repo">Enter Github repo address:</label>
    //           {/*<input id="github-id" className="form-control" type="text" ref="username" placeholder="username"/>*/}
    //           <input id="github-repo" className="form-control" type="text" ref="repo" placeholder="https://github.com/<YOUR USERNAME>/<YOUR REPO>.git"/>
    //           <input type="submit" hidden />
    //         </div>
    //       </form>
    //     </div>
    //   )
    // }
    // else if(this.props.activeRepo === ""){
    //   return(
    //     <div className="col-md-12">
    //       <button className="btn btn-primary" onClick={this.resetUser}>Reset</button>
    //       <p><strong>{this.props.username}</strong></p>
    //       <ul className="list-group"> {repos} </ul>
    //     </div>
    //   )
    // }

    // return(
    //     <div className="col-md-12">
    //       <button className="btn btn-primary" onClick={this.resetUser}>Reset</button>
    //       <p><strong>{this.props.username}/{this.props.activeRepo}</strong></p>
    //       <ul className="list-group"> {contents} </ul>
    //     </div>
    //   )

    //if(fileTree.length !== 0){

      // return(
      //   <div className="col-md-12">

      //     <p><strong>{this.props.activeRepo}</strong></p>
      //     <ul className="list-group"> {contents} </ul>
      //   </div>
      // )
    //}
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
      <TreeView data={data} levels={0} showBorder={false} />
    )

  }
});

export default FileTree;
