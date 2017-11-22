import axios from 'axios';
import { constant } from '../config';

export const GET_TRANSACTION_REPORT_REQUESTED = 'GET_TRANSACTION_REPORT_REQUESTED';
export const GET_TRANSACTION_REPORT_FULFILLED = 'GET_TRANSACTION_REPORT_FULFILLED';
export const GET_TRANSACTION_REPORT_REJECTED = 'GET_TRANSACTION_REPORT_REJECTED';

export const getTransactionReport = (data, accessToken) => {
    return async dispatch => {

        dispatch(handleRequest());
        
        return axios
            .get(`${constant.API_PATH}report/${data.type}/transaction?accessToken=${accessToken}`)
            .then((response) => {
                dispatch(handleSuccess(response.data))
            })
            .catch((error) => {
                dispatch(handleError(error))
            })
    }

    function handleRequest() {
        return { type: GET_TRANSACTION_REPORT_REQUESTED }
    }

    function handleSuccess(data) { 
        return {
            type: GET_TRANSACTION_REPORT_FULFILLED,
            payload: data
        }
    }
    
    function handleError(data) {
        return {
            type: GET_TRANSACTION_REPORT_REJECTED,
            payload: data
        }
    }
}