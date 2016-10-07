//isLoading.js
function isLoading(state = "", action) {
  switch(action.type) {
    case 'TOGGLE_LOADING' :
      return action.isLoading;
    default:
      return state;
  }
}

export default isLoading;
