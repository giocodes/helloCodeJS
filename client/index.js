import React from 'react';
import { render } from 'react-dom';

//import css
//import css from './styles/style.styl';

//import components
import Main from './components/Main';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
//import { Provider } from 'react-redux';
//import store, { history } from './store';

const router = (
  //<Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>

      </Route>
    </Router>
  //</Provider>
)

render(router, document.getElementById('root'));
