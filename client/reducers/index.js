//reducers/index.js
import { combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import store from '../store';

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
  			response.json()
			}).then(json => {
			  console.log('JSON!');
			  console.log(json);
			  console.log(store)
			  	repos = json.data
			  	isReady = true
  				store.dispatch();
			});
		return state;

	case 'RECEIVE_REPOS' :
		console.log(action)
		return action.repos

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