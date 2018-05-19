import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.outages, action) => {
    switch (action.type) {
        case types.LOAD_OUTAGES_SUCCESS:
            return action.outages;
        case types.CREATE_OUTAGE_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.outage)
            ];
        case types.UPDATE_OUTAGE_SUCCESS:
            return [
                ...state.filter(outage => outage.id !== action.outage.id),
                Object.assign({}, action.outage)
            ];
        default:
            return state;
    }
};