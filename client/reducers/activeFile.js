//activeFile.js
function activeFile(state = "", action) {
  switch(action.type) {
    case 'REQUEST_FILE' :
      return action.activeFile;
    default:
      return state;
  }
}

export default activeFile;
