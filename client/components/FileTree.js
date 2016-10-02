//FileTree.js
import React from 'react';
import { Link } from 'react-router';

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
    this.props.requestRepoContents(repo);

    fetch('https://api.github.com/repos/'+this.props.username+'/'+repo+'/contents')
    .then(response => {
      return response.json()})
    .then(repoContents => {
      console.log(repoContents);
      this.props.receiveRepoContents(repoContents);
    });
  },

  resetUser(e) {
    e.preventDefault();
    this.props.requestRepos("");
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

    return(
      <div className="col-md-12">
        <button className="btn btn-primary" onClick={this.resetUser}>Reset</button>
        <p><strong>{this.props.username}</strong></p>
        <ul className="list-group"> {repos} </ul>
      </div>
    )
  }
});

export default FileTree;
