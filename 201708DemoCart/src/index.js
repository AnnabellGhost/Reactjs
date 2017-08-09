import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers/index.js';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
const logger= store => next => action => {
    console.log('Dispatching ',action);
    let result=next(action);
    console.log('next state ',store.getState());
    return result;
}
var store=createStore(reducers,applyMiddleware(logger));
ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
