import axios from 'axios';
import { constant } from '../config';
import { push } from 'react-router-redux';
import Cookies from 'universal-cookie';

export const USER_LOGIN_REQUESTED = 'USER_LOGIN_REQUESTED';
export const USER_LOGIN_FULFILLED = 'USER_LOGIN_FULFILLED';

export const GET_USER_LIST_REQUESTED = 'GET_USER_LIST_REQUESTED';
export const GET_USER_LIST_FULFILLED = 'GET_USER_LIST_FULFILLED';
export const GET_USER_LIST_REJECTED = 'GET_USER_LIST_REJECTED';
export const GET_ALL_USER_REQUESTED = 'GET_ALL_USER_REQUESTED';
export const GET_ALL_USER_FULFILLED = 'GET_ALL_USER_FULFILLED';
export const GET_ALL_USER_REJECTED = 'GET_ALL_USER_REJECTED';
export const CREATE_USER_REQUESTED = 'CREATE_USER_REQUESTED';
export const CREATE_USER_FULFILLED = 'CREATE_USER_FULFILLED';
export const CREATE_USER_REJECTED = 'CREATE_USER_REJECTED';
export const UPDATE_USER_REQUESTED = 'UPDATE_USER_REQUESTED';
export const UPDATE_USER_FULFILLED = 'UPDATE_USER_FULFILLED';
export const UPDATE_USER_REJECTED = 'UPDATE_USER_REJECTED';
export const CHANGE_USER_STATUS_REQUESTED = 'CHANGE_USER_STATUS_REQUESTED';
export const CHANGE_USER_STATUS_FULFILLED = 'CHANGE_USER_STATUS_FULFILLED';
export const CHANGE_USER_STATUS_REJECTED = 'CHANGE_USER_STATUS_REJECTED';
export const DELETE_USER_REQUESTED = 'DELETE_USER_REQUESTED';
export const DELETE_USER_FULFILLED = 'DELETE_USER_FULFILLED';
export const DELETE_USER_REJECTED = 'DELETE_USER_REJECTED';

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

export const getAllUser = (accessToken) => {
	return async dispatch => {
		dispatch(handleRequest());
		return axios
			.get(`${constant.API_PATH}user?accessToken=${accessToken}`)
			.then((response) => {
				dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleRequest() { return { type: GET_ALL_USER_REQUESTED } }
	function handleSuccess(data) { return { type: GET_ALL_USER_FULFILLED, payload: data } }
	function handleError(data) { return { type: GET_ALL_USER_REJECTED, payload: data } }
}

export const getUserList = (data, accessToken) => {
	return async dispatch => {
		dispatch(handleRequest());
		return axios
			.get(`${constant.API_PATH}user/list?accessToken=${accessToken}&limit=${data.limit}&offset=${data.offset}`)
			.then((response) => {
				dispatch(handleSuccess(response.data.data));
			})
			.catch((error) => {
				dispatch(handleError(error));
			})
	}

	function handleRequest() { return { type: GET_USER_LIST_REQUESTED } }
	function handleSuccess(data) { return { type: GET_USER_LIST_FULFILLED, payload: data } }
	function handleError(data) { return { type: GET_USER_LIST_REJECTED, payload: data } }
}

export const createUser = (data, accessToken) => {
	return async dispatch => { 
		dispatch(handleRequest());
		return axios
			.post(`${constant.API_PATH}user/create?accessToken=${accessToken}`, {
				name: data.name,
				username: data.username,
				password: data.password,
				email: data.email,
				level: data.level,
				cafe: data.cafe
			})
			.then((response) => {
				dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleRequest() { return { type: CREATE_USER_REQUESTED } }
	function handleSuccess(data) { return { type: CREATE_USER_FULFILLED, payload: data } }
	function handleError(data) { return { type: CREATE_USER_REJECTED, payload: data } }
}

export const updateUser = (data, accessToken) => {
	return async dispatch => {
		return axios
			.put(`${constant.API_PATH}user/update?accessToken=${accessToken}`, {
				id: data.id,
				name: data.name,
				username: data.username,
				password: data.password,
				email: data.email,
				level: data.level,
				cafe: data.cafe
			})
			.then((response) => {
				dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}
	
	function handleRequest() { return { type: UPDATE_USER_REQUESTED } }
	function handleSuccess(data) { return { type: UPDATE_USER_FULFILLED, payload: data } }
	function handleError(data) { return { type: UPDATE_USER_REJECTED, payload: data } }
}

export const changeUserStatus = (data, accessToken) => {
	return async dispatch => {
		return axios
			.put(`${constant.API_PATH}user/status?accessToken=${accessToken}`, {
				id: data.id
			})
			.then((response) => {
				dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleRequest() { return { type: CHANGE_USER_STATUS_REQUESTED } }
	function handleSuccess(data) { return { type: CHANGE_USER_STATUS_FULFILLED, payload: data } }
	function handleError(data) { return { type: CHANGE_USER_STATUS_REJECTED, payload: data } }
	
}

export const userLogout = () => {
	return async (dispatch) => {
		return Promise.resolve(dispatch(handleLogout()))
			.then(() => {
				cookies.remove('accessToken');
				cookies.remove('user');
				cookies.remove('member');
			})
	}

	function handleLogout() {
		return {
			type: USER_LOGOUT_FULFILLED
		}
	}
}
