//highlightedNode.js
function hoverTime(state={}, action) {

  switch(action.type) {
    case 'SET_HOVER_TIME':
      return action.hoverTime;
    default:
      return state;
  }

}

export default hoverTime;
