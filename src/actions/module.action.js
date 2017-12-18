import axios from 'axios';
import { constant } from '../config';

export const GET_ALL_MODULE_REQUESTED = 'GET_ALL_MODULE_REQUESTED';
export const GET_ALL_MODULE_FULFILLED = 'GET_ALL_MODULE_FULFILLED';
export const GET_ALL_MODULE_REJECTED = 'GET_ALL_MODULE_REJECTED';

export const getAllModule = (accessToken) => {
    return async dispatch => {
        dispatch(handleRequest());
        return axios
            .get(`${constant.API_PATH}module?accessToken=${accessToken}`)
            .then((response) => {
                dispatch(handleSuccess(response.data));      
            })
            .catch((error) => {
                dispatch(handleError(error));
            })
    }

    function handleRequest() { return { type: GET_ALL_MODULE_REQUESTED } }
    function handleSuccess(data) { return { type: GET_ALL_MODULE_FULFILLED, payload: data } }
    function handleError(data) { return { type: GET_ALL_MODULE_REJECTED, payload: data } }
}