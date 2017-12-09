import axios from 'axios';
import { constant } from '../config';
import { push } from 'react-router-redux';
import Cookies from 'universal-cookie';

export const USER_LOGIN_REQUESTED = 'USER_LOGIN_REQUESTED';
export const USER_LOGIN_FULFILLED = 'USER_LOGIN_FULFILLED';
export const USER_LOGIN_REJECTED = 'USER_LOGIN_REJECTED';
export const USER_LOGOUT_FULFILLED = 'USER_LOGOUT_FULFILLED';

const cookies = new Cookies();

export const userLogin = (data) => {
	return async dispatch => {
		dispatch(handleRequest());

		return axios
			.post(`${constant.API_PATH}user/authenticate`, {
				username: data.username,
				password: data.password
			})
			.then((response) => {
				dispatch(handleSuccess(response.data.data));
				cookies.set('accessToken', response.data.data.accessToken, { path: '/' });
				cookies.set('user', response.data.data.user, { path: '/' });
			})
			.then(() => {
				window.location.reload();
			})
			.catch((error) => {
				dispatch(handleError(error))
			});
	}


	function handleRequest() { return { type: USER_LOGIN_REQUESTED } };
	function handleSuccess(data) { return { type: USER_LOGIN_FULFILLED, payload: data } };
	function handleError(error) { return { type: USER_LOGIN_REJECTED, payload: error } };
}

export const userLogout = () => {
	return async (dispatch) => {
		return Promise.resolve(dispatch(handleLogout()))
			.then(() => {
				cookies.remove('accessToken');
				cookies.remove('user');
				cookies.remove('member');
			})
			.then(() => {
				window.location.reload();
			})
	}

	function handleLogout() {
		return {
			type: USER_LOGOUT_FULFILLED
		}
	}
}
