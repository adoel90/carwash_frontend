import axios from 'axios';
import { constant } from '../config';

export const ADMIN_LOGIN_REQUESTED = 'ADMIN_LOGIN_REQUESTED';
export const ADMIN_LOGIN_FULFILLED = 'ADMIN_LOGIN_FULFILLED';
export const ADMIN_LOGIN_REJECTED = 'ADMIN_LOGIN_REJECTED';

export const VENDOR_LOGIN_REQUESTED = 'VENDOR_LOGIN_REQUESTED';
export const VENDOR_LOGIN_FULFILLED = 'VENDOR_LOGIN_FULFILLED';
export const VENDOR_LOGIN_REJECTED = 'VENDOR_LOGIN_REJECTED';

export const LOGOUT_FULFILLED = 'LOGOUT_FULFILLED';

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

                window.location.reload();
            })
            .catch((error) => {
                dispatch(loginError(error));
            })
    }

    function loginRequest() { return { type: ADMIN_LOGIN_REQUESTED } }
    function loginSuccess(data) { return { type: ADMIN_LOGIN_FULFILLED, payload: data } }
    function loginError(data) { return { type: ADMIN_LOGIN_REJECTED, payload: data } }
}

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
                localStorage.setItem('userData', JSON.stringify(result.employee.username));
               
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

export const logout = () => {
	return async (dispatch) => {
		return Promise.resolve(dispatch(handleLogout()))
			.then(() => {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('user');
				localStorage.removeItem('member');
			})
	}

	function handleLogout() {
		return {
			type: LOGOUT_FULFILLED
		}
	}
}