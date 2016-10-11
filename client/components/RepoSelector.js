//RepoSelector.js
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const RepoSelector = React.createClass({
  componentDidMount(){
    console.log('did update')
    if (this.props.location.query.repo){
      console.log(this.props.location.query);
    this.fetchRepo(this.props.location.query.repo);
    // window.document.getElementById('repo-title').innerHTML = "Repo"
    }
  },

  handleSubmit(e){
    e.preventDefault();
    let repo = this.refs.repo.value;
    console.log(repo)
    browserHistory.push('/?repo='+repo)
    this.fetchRepo(repo);
  },
  fetchRepo(repoUrl){
    this.props.requestRepoContents(repoUrl);
    this.props.toggleLoading(true);
    fetch('http://localhost:7770/api/repo?url=' + repoUrl)
    .then(response => {
      return response.json();
    })
    .then(repoObj => {
      this.props.receiveRepoContents(repoObj.code);
      this.props.receiveNodes(repoObj.nodes);
      this.props.toggleLoading(false);
      this.props.location.query = {
        repo : 'http',
        done : true
      }
    })
  },

  render() {
    return (
      <div>
      <h2 id="repo-title"></h2>
      <form ref="usernameForm" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input autoComplete="off" id="github-repo" className="form-control" type="text" ref="repo" placeholder="Enter Github repo URL"/>
          <input type="submit" hidden />
        </div>
      </form>
        
      </div>

    )
  }
})

export default RepoSelector;
