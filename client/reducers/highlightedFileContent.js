//highlightedFileContent.js
function highlightedFileContent(state = "", action) {
  switch(action.type) {
    case 'SET_HIGHLIGHTED_FILE_CONTENT' :
      return action.highlightedFileContent;
    default:
      return state;
  }
}

export default highlightedFileContent;
