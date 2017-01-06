import React from 'react';
import {render} from 'react-dom';
import App from './containers/App';
import Main from './containers/Main';
import Sub from './containers/Sub';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import reducers from './reducers';
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}
var store=createStore(reducers,applyMiddleware(logger));
render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Main}/>
                <Route path='a' component={Sub}/>
            </Route>            
        </Router>
    </Provider>,
    document.getElementById('root')
);
//                 <Route path='about' component={About}/>