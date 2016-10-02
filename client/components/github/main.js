//Main.js
import React from 'react';
import { Link } from 'react-router';
require("../../styles/style.css");

import Gist from './gists.js';

/*let something = 'this text';
let data;
fetch('https://api.github.com/users/octocat/gists').then(response => {
  // console.log('Fetch!');
  // console.log(response);
  return response.json()
}).then(response => {
  something = response;
  // console.log('JSON!');
   console.log(response);
});

const Main = React.createClass({
  render (){
    // Component styles (if needed)
    let style = {};

    return(
      <div className="col-md-12 row" style={ style }>
        <h1>Hello!</h1>
        <h2>{something}</h2>
        <Gist/>
      </div>
    )
  }
});

export default Main;*/

// let UserGist = React.createClass({
//   getInitialState: function() {
//     return {
//       username: '',
//       lastGistUrl: ''
//     };
//   },

//   componentDidMount: function() {
//     this.serverRequest = $.get(this.props.source, function (result) {
//       let lastGist = result[0];
//       this.setState({
//         username: lastGist.owner.login,
//         lastGistUrl: lastGist.html_url
//       });
//     }.bind(this));
//   },

//   componentWillUnmount: function() {
//     this.serverRequest.abort();
//   },

//   render: function() {
//     return (
//       <div>
//         {this.state.username}'s last gist is
//         <a href={this.state.lastGistUrl}>here</a>.
//       </div>
//     );
//   }
// });

// React.render(
//   <UserGist source="https://api.github.com/users/octocat/gists" />,
//   mountNode
// );

// export default UserGist;
