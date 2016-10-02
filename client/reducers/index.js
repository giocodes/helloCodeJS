//reducers/index.js
import { combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import store from '../store';

import code from './code';
import edges from './edges';
import nodes from './nodes';
import username from './username';
import repos from './repos';
import activeRepo from './activeRepo';

const rootReducer = combineReducers({code, edges, nodes, username, repos, activeRepo, routing: routerReducer });

export default rootReducer;

