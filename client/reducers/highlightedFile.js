//highlightedFile.js
function highlightedFile(state = "", action) {
  switch(action.type) {
    case 'SET_HIGHLIGHTED_FILE' :
      return action.highlightedFile;
    default:
      return state;
  }
}

export default highlightedFile;
