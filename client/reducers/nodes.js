//nodes.js
function nodes(state = [], action) {

  switch(action.type) {
    case 'RECEIVE_NODES':
      return action.nodes;

    default:
      return state;
  }
}

export default nodes;
