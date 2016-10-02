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
import repoContents from './repoContents';

const rootReducer = combineReducers({code, edges, nodes, username, repos, activeRepo, repoContents, routing: routerReducer });

export default rootReducer;

