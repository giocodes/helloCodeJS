//activeRepo.js
function activeRepo(state = "", action) {
  switch(action.type) {
    case 'REQUEST_REPO_CONTENTS' :
      return action.activeRepo;
    default:
      return state;
  }
}

export default activeRepo;
