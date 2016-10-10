//reducers/index.js
import { combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import store from '../store';

//import code from './code';
//import edges from './edges';
import nodes from './nodes';
import username from './username';
import repos from './repos';
import activeRepo from './activeRepo';
import repoContents from './repoContents';
import activeFile from './activeFile';
import activeFileContent from './activeFileContent';
import activeNodeId from './activeNodeId';
import hoveredOverNodeId from './hoveredOverNodeId';
import highlightedNodeId from './highlightedNodeId';
import activeNodeLoc from './activeNodeLoc';
import isLoading from './isLoading';
import highlightedFile from './highlightedFile';
import highlightedFileContent from './highlightedFileContent';
import highlightedNodeLoc from './highlightedNodeLoc';

const rootReducer = combineReducers({nodes, username, repos, activeRepo, repoContents, activeFile, activeFileContent, activeNodeId, activeNodeLoc, isLoading, hoveredOverNodeId, highlightedNodeId, highlightedFile, highlightedFileContent, highlightedNodeLoc, routing: routerReducer });

export default rootReducer;

