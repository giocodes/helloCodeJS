//reducers/index.js
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import code from './code';
import edges from './edges';
import nodes from './nodes';

const rootReducer = combineReducers({code, edges, nodes, routing: routerReducer });

export default rootReducer;
