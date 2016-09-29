//Main.js
import React from 'react';
import { Link } from 'react-router';

//Other Needed Components
import FileTree from './FileTree';
import Code from './Code';
import FunctionTree from './FunctionTree';

const Main = React.createClass({
  render (){
    //An example of how we can style things right here if we want to
    var style = {
        padding: 10,
        margin: 10,
        display: "inline-block",
        backgroundColor: "#7824bb",
        fontFamily: "sans-serif",
        textAlign: "center"
      };

    return(
      <div style={ style }>
        <h1>
          <Link to="/">THIS IS MAIN</Link>
        </h1>
        <FileTree />
        <Code /><Code />
        <FunctionTree />
      </div>
    )
  }
});

export default Main;
