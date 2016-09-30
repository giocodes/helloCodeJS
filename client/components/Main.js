//Main.js
import React from 'react';
import { Link } from 'react-router';
require("../styles/style.css");

//Other Needed Components
import FileTree from './FileTree';
import Code from './Code';
import FunctionWeb from './FunctionWeb';

const Main = React.createClass({
  render (){
    //An example of how we can style things right here if we want to
    var style = {
        display: "inline-block",
        backgroundColor: "#7824bb",
        fontFamily: "sans-serif",
        textAlign: "center"
      };

    return(
      <div className="col-md-12 row" style={ style }>
        <h1>
          <Link to="/">THIS IS MAIN</Link>
        </h1>

        <div id="sidebar" className="col-md-3">
          <FileTree {...this.props}/>
          <Code />
          <Code />
        </div>
        <FunctionWeb />
      </div>
    )
  }
});

export default Main;
