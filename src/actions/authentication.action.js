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

//#CUSTOMER TOP-UP LOGIN 
// export const CUSTOMER_TOPUP_LOGIN_REQUESTED = 'CUSTOMER_TOPUP_LOGIN_REQUESTED';
// export const CUSTOMER_TOPUP_LOGIN_FULFILLED = 'CUSTOMER_TOPUP_LOGIN_FULFILLED';
// export const CUSTOMER_TOPUP_LOGIN_REJECTED = 'CUSTOMER_TOPUP_LOGIN_REJECTED';

//#KASIR LOGIN
export const KASIR_LOGIN_REQUESTED = 'KASIR_LOGIN_REQUESTED';
export const KASIR_LOGIN_FULFILLED = 'KASIR_LOGIN_FULFILLED';
export const KASIR_LOGIN_REJECTED = 'KASIR_LOGIN_REJECTED';

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
                // if(result.data.module[0].group === 'admin') {
                // if(result.data.level.id === 1){
                    localStorage.setItem('accessToken', result.accessToken);
                    localStorage.setItem('userData', JSON.stringify(result.data));
                    dispatch(loginSuccess(result));
    
                    window.location.reload();
                // } else {
                //     dispatch(loginError(result));              
                // }
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
        dispatch(loginRequest());
        return axios
            .post(`${constant.API_PATH}member/authenticate`, {
                card: data.cardID
            })
            .then((response) => {
                let result = response.data.result;            
                localStorage.setItem('accessToken', result.accessToken);
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



/*
//  KASIR LOGIN
//  Calls the API to get `accessToken` required to access the app.
*/
export const kasirLogin = (data) => {   
     
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

    function loginRequest() { return { type: KASIR_LOGIN_REQUESTED } }
    function loginSuccess(data) { return { type: KASIR_LOGIN_FULFILLED, payload: data } }
    function loginError(data) { return { type: KASIR_LOGIN_REJECTED, payload: data } }
}

export const logout = () => {
	return async (dispatch) => {
		return Promise.resolve(dispatch(handleLogout()))
			.then(() => {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('userData');
				localStorage.removeItem('member');
			})
	}

	function handleLogout() {
		return {
			type: LOGOUT_FULFILLED
		}
	}
}