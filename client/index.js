import React from 'react';
import { render } from 'react-dom';

//import components
import App from './components/App';

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

