//highlightedNodeLoc.js
function highlightedNodeLoc(state={}, action) {

  switch(action.type) {
    case 'SET_HIGHLIGHTED_NODE_LOC':
      return action.highlightedNodeLoc;
    default:
      return state;
  }

}

export default highlightedNodeLoc;
