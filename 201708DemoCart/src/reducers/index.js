import {combineReducers} from 'redux';
import cart from './cart.js';
import * as calendar from './calendar.js';
// console.log(calendar.calendar);
/* let finalReducers = {}
Object.keys(reducers).forEach(key => finalReducers[key] = reducers[key])
finalReducers.routing = routerReducer

const reducer = combineReducer(finalReducers) */
let finaleReducer=Object.assign({},calendar,{cart:cart});
let reducers=combineReducers(finaleReducer);
export default reducers;