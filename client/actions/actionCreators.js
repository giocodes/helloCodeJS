//actionCreators.js
export function placeCode(code){
  return {
    type: 'PUT_CODE',
    code
  }
}

export function requestRepos(username){
	return {
		type: 'REQUEST_REPOS',
		username

	}
}

export function receiveRepos(repos){
	return {
		type: 'RECEIVE_REPOS',
		repos
	}
}

export function requestRepoContents(activeRepo){
  return {
    type: 'REQUEST_REPO_CONTENTS',
    activeRepo

  }
}

export function receiveRepoContents(repoContents){
  return {
    type: 'RECEIVE_REPO_CONTENTS',
    repoContents
  }
}

export function requestFile(activeFile){
  return {
    type: 'REQUEST_FILE',
    activeFile

  }
}

export function receiveFileContent(activeFileContent){
  return {
    type: 'RECEIVE_FILE_CONTENT',
    activeFileContent
  }
}

export function receiveNodes(nodes){
  return {
    type: 'RECEIVE_NODES',
    nodes
  }
}

export function setActiveNodeId(activeNodeId){
  return {
    type: 'SET_ACTIVE_NODE_ID',
    activeNodeId
  }
}

export function setHoveredOverNodeId(hoveredOverNodeId){
  return {
    type: 'SET_HOVERED_OVER_NODE_ID',
    hoveredOverNodeId
  }
}

export function setActiveNodeLoc(activeNodeLoc){
  return {
    type: 'SET_ACTIVE_NODE_LOC',
    activeNodeLoc
  }
}

export function toggleLoading(isLoading){
  return {
    type: 'TOGGLE_LOADING',
    isLoading
  }
}

