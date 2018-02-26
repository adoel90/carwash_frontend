import axios from 'axios';
import { constant } from '../config';

const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;

/*
//  GET USER LIST
*/
export const getUserList = (data) => {
    
    return async dispatch => {
        
        dispatch(fetchRequest());

        return axios
            .get(`${constant.API_PATH}user/list?accessToken=${accessToken}`)
            .then((response) => {
                dispatch(fetchSuccess(response))
            })
            .catch((error) => {
                dispatch(fetchError(error))
            })
    }

    function fetchRequest() { return { type: GET_USER_LIST_REQUESTED } }
    function fetchSuccess() { return { type: GET_USER_LIST_FULFILLED, payload: data } }
    function fetchError() { return { type: GET_USER_LIST_REJECTED, payload: data } }
}

/*
//  CREATE USER
*/
export const createUser = (data) => {
    return async dispatch => {
        dispatch(createRequest());
        return axios
            .post(`${constant.API_PATH}user/create?accessToken=${accessToken}`, {
                username: data.username,
                password: data.password,
                name: data.name,
                email: data.email,
                level: data.level
            })
            .then((response) => {
                dispatch(createSuccess(response));
            })
            .catch((error) => {
                dispatch(createError(error));
            })
    }

    function createRequest() { return { type: CREATE_USER_REQUESTED } }
    function createSuccess(data) { return { type: CREATE_USER_FULFILLED, payload: data } }
    function createError(data) { return { type: CREATE_USER_ERROR, payload: data } }
}