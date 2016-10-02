//activeFileContent.js
function activeFileContent(state = "", action) {

  switch(action.type) {
    case 'RECEIVE_FILE_CONTENT':
      return action.activeFileContent;

    default:
      return state;
  }

}

export default activeFileContent;
