 //store.js
import { createStore, compse } from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';

// import the root reducer
import rootReducer from './reducers/index';

import code from './data/code';
import nodes from './data/nodes';
import edges from './data/edges'; //{edgesToDefinition...{}, edgesToBody...{}}

// create an object for the default data
const defaultState = {
	//code,
	nodes,
	//edges,
	username: "",
	repos: [],
  activeRepo: "",
  repoContents: {},
  activeFile: "",
  activeFileContent: "",
  activeNodeId: 0,
  highlightedNodeId: 0,
  hoveredOverNodeId: 0,
  activeNodeLoc: {},
  isLoading: false,
  highlightedFile: "",
  highlightedFileContent: "",
  highlightedNodeLoc: {}
};

// const store = createStore(rootReducer, defaultState);
let store = createStore(rootReducer, defaultState, window.devToolsExtension && window.devToolsExtension());

export const history = syncHistoryWithStore(browserHistory, store);

if(module.hot) {
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
