//Main.js
import React from 'react';
import { Link } from 'react-router';
require("../styles/style.css");
require("../styles/codemirror.css");

//Other Needed Components
import FileTree from './FileTree';
import Code from './Code';
import FunctionWeb from './FunctionWeb';

const Main = React.createClass({
  render (){

    return(
      <div className="container-fluid">
        <h1>
          <Link to="/">Hellocodebase</Link>
        </h1>

        <div id="sidebar" className="col-md-2">

          <div className="row">
            <FileTree {...this.props}/>
          </div>

        </div>



        <div id="code-container" className="col-md-5">

          <div className="row">
            <Code {...this.props}/>
          </div>

        </div>

        <div className="col-md-5">
          <div className="row">
            <FunctionWeb {...this.props}/>
          </div>
        </div>

      </div>
    )
  }
});

export default Main;
