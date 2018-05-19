import * as types from '../actions/actionTypes';

export default (state = [], action) => {
    switch(action.type) {
        case types.LOAD_OUTAGES_SUCCESS:
            return action.outages;
        default: 
            return state;
    }
};