//highlightedNodeLoc.js
function mouseLoc(state={}, action) {

  switch(action.type) {
    case 'SET_MOUSE_LOC':
      return action.mouseLoc;
    default:
      return state;
  }

}

export default mouseLoc;
