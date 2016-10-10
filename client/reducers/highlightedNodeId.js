//highlightedNode.js
function highlightedNodeId(state={}, action) {

  switch(action.type) {
    case 'SET_HIGHLIGHTED_NODE_ID':
      return action.highlightedNodeId;
    default:
      return state;
  }

}

export default highlightedNodeId;
