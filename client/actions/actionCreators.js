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
/*
export function receiveRepoContents(repoContents){
  return {
    type: 'RECEIVE_REPO_CONTENTS',
    repoContents
  }
}*/

