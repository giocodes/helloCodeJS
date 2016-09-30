import React from 'react';
import { render } from 'react-dom';

//import css
// We won't use this Stylus Language 
// import css from './styles/style.styl';

//import components
import App from './components/App';
import Github from './components/github/main';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}></Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'));
      
// <Route path="/github" component={Github}></Route>
