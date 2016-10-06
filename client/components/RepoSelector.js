//RepoSelector.js
import React from 'react';
//import { Link } from 'react-router';
//import fileTreeBuilder from '../utilities/fileTreeBuilder';
//import TreeView from '../utilities/TreeView';

const RepoSelector = React.createClass({

  handleSubmit(e){
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

  render() {
    return (
      <form ref="usernameForm" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input autocomplete="false" id="github-repo" className="form-control" type="text" ref="repo" placeholder="Enter Github repo URL"/>
          <input type="submit" hidden />
        </div>
      </form>
    )
  }
})

export default RepoSelector;
