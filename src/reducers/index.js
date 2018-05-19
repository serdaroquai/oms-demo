import {combineReducers} from 'redux';
import outages from './outageReducer';

const rootReducer = combineReducers({
    outages // ES6 short hand property name
});

export default rootReducer; 