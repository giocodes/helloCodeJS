//Main.js
import React from 'react';
import { Link } from 'react-router';
require("../styles/style.scss");
require("../styles/codemirror.css");

//Other Needed Components
import FileTree from './FileTree';
import Code from './Code';
import FunctionWeb from './FunctionWeb';
import RepoSelector from './RepoSelector';
import Welcome from './Welcome';

const Main = React.createClass({

  componentDidUpdate(){
    // window.document.getElementById('floating-share').innerHTML = window.location.href;
    window.document.getElementById('share-input').innerHTML = window.location.href;
  },

  // Handler to reset the app through the navbar
  reloadHome(){
    window.location.reload(true)
  },
  toggleShare(e){
    let shareLinkDiv = window.document.getElementById('floating-share');
    let activeClass = shareLinkDiv.className;
    if (activeClass === 'no-display') {shareLinkDiv.className = ''}
      else {shareLinkDiv.className='no-display'}
  },

  render (){
      // console.log('heres the current state \n', this.state)
    return(
      // Main Cointainer
      <div className="row">
        {/*Navbar Container*/}
        <div id="navbar" className="col-xs-12">
          {/*Branding*/}
          <div className="col-xs-6 col-sm-2">
            <h3><a href="/" onClick={this.reloadHome}>helloCode.js</a></h3>
          </div>
          {/*Repo Selector*/}
          <div className="hidden-xs col-sm-6 col-sm-offset-1 col-md-8 col-md-offset-0">
            <RepoSelector {...this.props}/>
          </div>
          {/*Options Selector*/}
          <div className="col-xs-6 col-sm-3 col-md-2 row">
            <a href="https://github.com/giocodes/helloCodeJS/">
              <div id="navbar-github" className="navbar-item"></div>
            </a>
            <div id="navbar-share" className="navbar-item" onClick={this.toggleShare}>
            </div>
            <div id="floating-share" className="no-display">
              <span className="glyphicon glyphicon-duplicate"></span>
              <span id="share-input"></span>
            </div>
            <a href="/" onClick={this.reloadHome}>
              <div id="navbar-new" className="navbar-item"></div>
            </a>
          </div>
        {/*Repo Selector for mobile*/}
          <div className="col-xs-12 hidden-sm hidden-md hidden-lg ">
            <RepoSelector {...this.props}/>
          </div>
        </div>
        {/*Welcome*/}
        <Welcome {...this.props}/>

        {/*Panels Container*/}
        <div id="panels-container" className="col-xs-12">
          {/*File Tree Container col-sm-2 col-md-1 row*/ }
          <div id="fileTree" className="babies center">
              <FileTree {...this.props}/>
          </div>
          {/*Code Mirror Container col-sm-5 col-lg-4*/}
          <div id="code-container" className="hidepanel">
              <Code isPrimary={true} {...this.props}/>
              <Code isPrimary={false} {...this.props}/>
          </div>
          {/*Paper Container col-sm-5 col-md-6 col-lg-7*/}
          <div id="paper-container" className="hidepanel">
              <FunctionWeb {...this.props} />
          </div>
        </div>
      </div>
    )
  }
});

export default Main;
