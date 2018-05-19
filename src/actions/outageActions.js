import * as types from './actionTypes';
import outageApi from '../api/mockOutageApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function loadOutagesSuccess(outages) {
    return { type: types.LOAD_OUTAGES_SUCCESS, outages };
}

export function updateOutageSuccess(outage) {
    return { type: types.UPDATE_OUTAGE_SUCCESS, outage };
}

export function createOutageSuccess(outage) {
    return { type: types.CREATE_OUTAGE_SUCCESS, outage };
}

export function loadOutages() {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return outageApi.getAllOutages().then(outages => {
            dispatch(loadOutagesSuccess(outages));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}

//can add getState next to dispatch parameter to reach redux state
export function saveOutage(outage) {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return outageApi.saveOutage(outage).then(savedOutage => {
            outage.id ? dispatch(updateOutageSuccess(savedOutage)) :
                dispatch(createOutageSuccess(savedOutage));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}