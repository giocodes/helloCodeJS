//activeNodeLoc.js
function activeNodeLoc(state={}, action) {

  switch(action.type) {
    case 'SET_ACTIVE_NODE_LOC':
      return action.activeNodeLoc;
    default:
      return state;
  }

}

export default activeNodeLoc;
