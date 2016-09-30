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



export function receiveRepos(username, json){
	return {
		type: 'RECEIVE_REPOS',
		username,
		repos: json.data

	}
}