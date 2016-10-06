//Main.js
import React from 'react';
import { Link } from 'react-router';
require("../styles/style.scss"); 
require("../styles/codemirror.css");

//Other Needed Components
import FileTree from './FileTree';
import Code from './Code';
import FunctionWeb from './FunctionWeb';

const Main = React.createClass({
  /** Yi's code to wire up the components */
  getInitialState : function(){
    return {toggledFuncID: null };
  },

  toggleActiveFunc : function(){
  /** Need to rewire this to accept arbitrary id **/
    // console.log('toggleActive Funct triggered!')
    // console.log('heres the id we got\n', 25)
    this.setState({toggledFuncID: 25})
  },
  /** end of Yi's code*/
  render (){
      // console.log('heres the current state \n', this.state)
    return(
      // Main Cointainer
      <div className="container-fluid">
        {/*Navbar Container*/}
        <div id="navbar" className="col-sm-12">
          {/*Branding*/}
          <div className="col-sm-3 row">
            <h1><Link to="/">helloCode.js</Link></h1>
          </div>
          {/*Repo Selector*/}
          <div className="col-sm-8">
            <form ref="usernameForm" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input autoComplete="off" id="github-repo" className="form-control" type="text" ref="repo" placeholder="Enter Github repo URL"/>
                <input type="submit" hidden />
              </div>
            </form>
          </div>
          {/*Options Selector*/}
          <div className="col-sm-1">
            <div id="options"></div>
          </div>

        </div>

        {/*Panels Container*/}
        <div className="col-sm-12 row">
          {/*File Tree Container*/}
          <div id="fileTree" className="col-sm-2 row">
              <FileTree {...this.props}/>
          </div>
          {/*Code Mirror Container*/}
          <div id="code-container" className="col-sm-5 row">
              <Code {...this.props}/>
          </div>
          {/*Paper Container*/}
          <div className="col-sm-5 row">
              <FunctionWeb {...this.props} {...this.state}/>
          </div>

        </div> 



      </div>
    )
  }
});

export default Main;
