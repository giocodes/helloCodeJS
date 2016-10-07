//RepoSelector.js
import React from 'react';

const RepoSelector = React.createClass({

  handleSubmit(e){
    e.preventDefault();

    const repo = this.refs.repo.value;
    this.props.requestRepoContents(repo);
    this.props.toggleLoading(true);
    fetch('http://localhost:7770/api/repo?url=' + repo)
    .then(response => {
      return response.json();
    })
    .then(repoObj => {
      this.props.receiveRepoContents(repoObj.code);
      this.props.receiveNodes(repoObj.nodes);
      this.props.toggleLoading(false);
    })
  },

  render() {
    return (
      <form ref="usernameForm" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input autoComplete="false" id="github-repo" className="form-control" type="text" ref="repo" placeholder="Enter Github repo URL"/>
          <input type="submit" hidden />
        </div>
      </form>
    )
  }
})

export default RepoSelector;
