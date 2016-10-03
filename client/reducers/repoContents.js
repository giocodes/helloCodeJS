//repoContents.js
function repoContents(state = [], action) {

  switch(action.type) {
    case 'RECEIVE_REPO_CONTENTS':
      return action.repoContents;

    default:
      return state;
  }

}

export default repoContents;
