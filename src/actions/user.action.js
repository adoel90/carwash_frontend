import axios from 'axios';
import { constant } from '../config';
import { push } from 'react-router-redux';
import Cookies from 'universal-cookie';

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';

const cookies = new Cookies();

export const login = (username, password) => {
	return async dispatch => {
		dispatch(handleRequest());

		return axios
			.post(`${constant.API_PATH}user/authenticate`, {
				username: username,
				password: password
			})
			.then((response) => {
				dispatch(handleSuccess(response.data.data));
				cookies.set('accessToken', response.data.data.accessToken, { path: '/' });
				cookies.set('user', response.data.data.user, { path: '/' });
				// dispatch(push('admin/cafe'));
			})
			.catch((error) => {
				dispatch(handleError(error))
			});
	}


	function handleRequest() { return { type: LOGIN_REQUESTED } };
	function handleSuccess(data) { return { type: LOGIN_FULFILLED, payload: data } };
	function handleError(error) { return { type: LOGIN_REJECTED, payload: error } };
}
