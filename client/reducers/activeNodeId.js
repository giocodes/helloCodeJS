//activeNodeId.js
function activeNodeId(state={}, action) {

  switch(action.type) {
    case 'SET_ACTIVE_NODE_ID':
      return action.activeNodeId;
    default:
      return state;
  }

}

export default activeNodeId;
