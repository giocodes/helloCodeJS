//toggleLegend.js
function toggleLegend(state = "", action) {
  switch(action.type) {
    case 'TOGGLE_LEGEND' :
      return !action.legendOn;
    default:
      return state;
  }
}

export default toggleLegend;
