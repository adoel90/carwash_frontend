import axios from 'axios';
import { constant } from '../config';

export const ADMIN_LOGIN_REQUESTED = 'ADMIN_LOGIN_REQUESTED';
export const ADMIN_LOGIN_FULFILLED = 'ADMIN_LOGIN_FULFILLED';
export const ADMIN_LOGIN_REJECTED = 'ADMIN_LOGIN_REJECTED';

/*
//  ADMIN LOGIN
//  Calls the API to get `accessToken` required to access the app.
*/
export const adminLogin = (data) => {    
    return async dispatch => {
        
        dispatch(loginRequest());

        return axios
            .post(`${constant.API_PATH}admin/authenticate`, {
                username: data.username,
                password: data.password
            })
            .then((response) => {
                let result = response.data.result;
                
                localStorage.setItem('accessToken', result.accessToken);
                localStorage.setItem('userData', JSON.stringify(result.data));
                dispatch(loginSuccess(result));
            })
            .catch((error) => {
                dispatch(loginError(error));
            })
    }

    function loginRequest() { return { type: ADMIN_LOGIN_REQUESTED } }
    function loginSuccess(data) { return { type: ADMIN_LOGIN_FULFILLED, payload: data } }
    function loginError(data) { return { type: ADMIN_LOGIN_REJECTED, payload: data } }
}