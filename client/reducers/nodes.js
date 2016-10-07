//nodes.js
function nodes(state = [], action) {
   console.log('nodes reducer is firing')
   console.log('heres the state', state)

  switch(action.type) {
    case 'RECEIVE_NODES':
      return action.nodes;

    default:
      return state;
  }
}

export default nodes;
