//FileTree.js
import React from 'react';
import { Link } from 'react-router';
import buildRepoObject from '../utilities/buildRepoObject';

const FileTree = React.createClass({

  handleSubmit(e) {
    e.preventDefault();
    const username = this.refs.username.value;
    this.props.requestRepos(username);

    fetch('https://api.github.com/users/'+username+'/repos')
    .then(response => {
      return response.json()})
    .then(repos => {
      this.props.receiveRepos(repos);
    });

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
      console.log(fileContent);
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

    var repos = this.props.repos.map((repo, i) =>
        <button className="list-group-item" value={repo.name} key={i} onClick={this.logRepo} style={liStyle}>{repo.name}</button>
    )

    var contents = this.props.repoContents.map((content, i) =>
        <button className="list-group-item" value={content.name} key={'content-'+i} style={liStyle} onClick={this.chooseFile}>{content.name}</button>
    )

    if(this.props.username === ""){
      return(
        <div className="col-md-12">
          <form ref="usernameForm" onSubmit={this.handleSubmit}>
            <div className="form-group col-md-12">
              <label htmlFor="github-id">Enter Github username:</label>
              <input id="github-id" className="form-control" type="text" ref="username" placeholder="username"/>
              <input type="submit" hidden />
            </div>
          </form>
        </div>
      )
    }
    else if(this.props.activeRepo === ""){
      return(
        <div className="col-md-12">
          <button className="btn btn-primary" onClick={this.resetUser}>Reset</button>
          <p><strong>{this.props.username}</strong></p>
          <ul className="list-group"> {repos} </ul>
        </div>
      )
    }

    return(
        <div className="col-md-12">
          <button className="btn btn-primary" onClick={this.resetUser}>Reset</button>
          <p><strong>{this.props.username}/{this.props.activeRepo}</strong></p>
          <ul className="list-group"> {contents} </ul>
        </div>
      )

  }
});

export default FileTree;
