import axios from 'axios';
import { constant } from '../config';

//#ADMIN LOGIN
export const ADMIN_LOGIN_REQUESTED = 'ADMIN_LOGIN_REQUESTED';
export const ADMIN_LOGIN_FULFILLED = 'ADMIN_LOGIN_FULFILLED';
export const ADMIN_LOGIN_REJECTED = 'ADMIN_LOGIN_REJECTED';

//#VENDOR LOGIN
export const VENDOR_LOGIN_REQUESTED = 'VENDOR_LOGIN_REQUESTED';
export const VENDOR_LOGIN_FULFILLED = 'VENDOR_LOGIN_FULFILLED';
export const VENDOR_LOGIN_REJECTED = 'VENDOR_LOGIN_REJECTED';

//#CUSTOMER LOGIN
export const CUSTOMER_LOGIN_REQUESTED = 'CUSTOMER_LOGIN_REQUESTED';
export const CUSTOMER_LOGIN_FULFILLED = 'CUSTOMER_LOGIN_FULFILLED';
export const CUSTOMER_LOGIN_REJECTED = 'CUSTOMER_LOGIN_REJECTED';

/*
//  ADMIN LOGIN
//  Calls the API to get `accessToken` required to access the app.
*/
export const adminLogin = (data) => {    
    return async dispatch => {
        
        dispatch(loginRequest());

        return axios
            .post(`${constant.API_PATH}user/authenticate`, {
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

/*
//  VENDOR LOGIN
//  Calls the API to get `accessToken` required to access the app.
*/
export const vendorLogin = (data) => {   
     
    return async dispatch => {
        
        dispatch(loginRequest());

        return axios
            .post(`${constant.API_PATH}vendor/authenticate`, {
                username: data.username,
                password: data.password
            })
            .then((response) => {
                let result = response.data.result;
                // console.log(result); hasil-nya ada atribute 'employee'
                
                localStorage.setItem('accessToken', result.accessToken);
                // localStorage.setItem('userData', JSON.stringify(result.employee.username));
                localStorage.setItem('userData', JSON.stringify(result.employee));
               
                dispatch(loginSuccess(result));
            })
            .catch((error) => {
                dispatch(loginError(error));
            })
    }

    function loginRequest() { return { type: VENDOR_LOGIN_REQUESTED } }
    function loginSuccess(data) { return { type: VENDOR_LOGIN_FULFILLED, payload: data } }
    function loginError(data) { return { type: VENDOR_LOGIN_REJECTED, payload: data } }
}


/*
//  CUSTOMER LOGIN
//  Calls the API to get `accessToken` required to access the app.
*/

export const customerLogin = (data) => {   
     
    return async dispatch => {
        console.log(data);

        dispatch(loginRequest());

        return axios
            .post(`${constant.API_PATH}member/authenticate`, {
                card: data.cardID
                // password: data.password
            })
            .then((response) => {
                let result = response.data.result;

                console.log(result);
                
                
                localStorage.setItem('accessToken', result.accessToken);
                // localStorage.setItem('userData', JSON.stringify(result.employee.username));
                localStorage.setItem('userData', JSON.stringify(result));
               
                dispatch(loginSuccess(result));
            })
            .catch((error) => {
                dispatch(loginError(error));
            })
    }

    function loginRequest() { return { type: CUSTOMER_LOGIN_REQUESTED } }
    function loginSuccess(data) { return { type: CUSTOMER_LOGIN_FULFILLED, payload: data } }
    function loginError(data) { return { type: CUSTOMER_LOGIN_REJECTED, payload: data } }
}