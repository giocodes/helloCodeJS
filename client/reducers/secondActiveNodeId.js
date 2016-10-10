//secondActiveNodeId.js
function secondActiveNodeId(state={}, action) {

  switch(action.type) {
    case 'SET_SECOND_ACTIVE_NODE_ID':
      return action.secondActiveNodeId;
    default:
      return state;
  }

}

export default secondActiveNodeId;
