import {combineReducers} from 'redux';
import outages from './outageReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

// add any new reducer you add here
const rootReducer = combineReducers({
    outages, // ES6 short hand property name
    ajaxCallsInProgress
});

export default rootReducer; 