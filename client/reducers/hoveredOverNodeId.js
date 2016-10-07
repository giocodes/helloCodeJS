//hoveredOverNodeId.js
function hoveredOverNodeId(state={}, action) {
  console.log('hoveredOverNodeId reducer is firing \n',  state)
  switch(action.type) {
    case 'SET_HOVERED_OVER_NODE_ID':
      return action.hoveredOverNodeId;
    default:
      return state;
  }

}

export default hoveredOverNodeId;
