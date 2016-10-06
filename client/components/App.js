//App.js
// Global Container that connects Main routes to the store
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';

function mapStateToProps(state) {
  return {
    //code: state.code,
    nodes: state.nodes,
    //edges: state.edges,
    username : state.username,
    repos : state.repos,
    activeRepo: state.activeRepo,
    repoContents: state.repoContents,
    activeFile: state.activeFile,
    activeFileContent: state.activeFileContent,
    activeNodeId: state.activeNodeId,
    activeNodeLoc: state.activeNodeLoc
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;
