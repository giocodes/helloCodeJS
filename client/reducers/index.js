//reducers/index.js
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import code from './code';
import edges from './edges';
import nodes from './nodes';

const rootReducer = combineReducers({code, edges, nodes, username, repos, routing: routerReducer });

function username(state = [], action) {
  console.log(state)
  switch(action.type) {
    case 'REQUEST_REPOS' :
      
      return action.username
      
    default:
      return state;
  }
}

function repos(state = [], action) {
  
  switch(action.type) {
    case 'REQUEST_REPOS' :
      // Make the HTTP Request to GitHub API
      fetch('https://api.github.com/users/'+action.username+'/repos').then(response => {
		  console.log('Fetch!');
		  console.log(response);
  			return response.json()
			}).then(response => {
  				
			  console.log('JSON!');
			  console.log(response);
  				return response
			});
			// Add catch

		
      

    default:
      return state;
  }
}

// export default code;




export default rootReducer;



let something = 'this text';
let data;
fetch('https://api.github.com/users/octocat/gists').then(response => {
  // console.log('Fetch!');
  // console.log(response);
  return response.json()
}).then(response => {
  data = response
  // console.log('JSON!');
  // console.log(response);
});