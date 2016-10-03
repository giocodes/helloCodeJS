//username.js
function username(state = "", action) {
  switch(action.type) {
    case 'REQUEST_REPOS' :
      return action.username;
    default:
      return state;
  }
}

export default username;
