//FileTree.js
import React from 'react';

const FileTree = React.createClass({

  handleSubmit(e) {
    e.preventDefault();
    const username = this.refs.username.value;
    this.props.requestRepos(username);
    this.refs.usernameForm.reset();
  },

  render (){

    var style = {
        backgroundColor: "#ffde00",
        fontFamily: "sans-serif",
        textAlign: "center"
    };

    return(
      <div className="col-md-12" style={style}>
        <h1>
          THIS IS THE FILE TREE
        </h1>
        <div className="form-control">
          <form ref="usernameForm" className="username-form" onSubmit={this.handleSubmit}>
            <input type="text" ref="username" placeholder="username"/>
            <input type="submit" hidden />
          </form>
        </div>

      </div>
    )
  }
});

export default FileTree;
