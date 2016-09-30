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
  code,
  nodes,
  edges
};

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
