import * as types from './actionTypes';
import outageApi from '../api/mockOutageApi';

export function loadOutagesSuccess(outages) {
    return { type:types.LOAD_OUTAGES_SUCCESS, outages};
}

export function loadOutages() {
    return (dispatch) => {
         return outageApi.getAllOutages().then(outages => {
             dispatch(loadOutagesSuccess(outages));
         }).catch(error=>{
             throw(error);
         })
    }
}