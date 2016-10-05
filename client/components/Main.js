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
      <div className="container-fluid">
        <h1>
          <Link to="/">helloCode.js</Link>
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
            <FunctionWeb {...this.props} {...this.state}/>
          </div>
        </div>

      </div>
    )
  }
});

export default Main;
