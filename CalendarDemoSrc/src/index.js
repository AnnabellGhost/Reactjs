import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers/calendar.js';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
var store=createStore(reducers);
ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
