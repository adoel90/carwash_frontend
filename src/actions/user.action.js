import axios from 'axios';
import { constant } from '../config';

export const GET_USER_LIST_REQUESTED = 'GET_USER_LIST_REQUESTED';
export const GET_USER_LIST_FULFILLED = 'GET_USER_LIST_FULFILLED';
export const GET_USER_LIST_REJECTED = 'GET_USER_LIST_REJECTED';
export const GET_USER_ACCESS_LIST_REQUESTED = 'GET_USER_ACCESS_LIST_REQUESTED';
export const GET_USER_ACCESS_LIST_FULFILLED = 'GET_USER_ACCESS_LIST_FULFILLED';
export const GET_USER_ACCESS_LIST_REJECTED = 'GET_USER_ACCESS_LIST_REJECTED';
export const CREATE_USER_FULFILLED = 'CREATE_USER_FULFILLED';
export const CREATE_USER_REJECTED = 'CREATE_USER_REJECTED';

const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;
// console.log(accessToken);

export const getUserList = (data) => {
	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}user/list?accessToken=${accessToken}`)
			.then((response) => {
				dispatch(fetchSuccess(response));
			})
			.catch((error) => {
				dispatch(fetchError(error));
			})
	}

	function fetchRequest() { return { type: GET_USER_LIST_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_USER_LIST_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_USER_LIST_REJECTED, payload: data } }
}


export const getUserAccess = () => {
	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}user/access/list?accessToken=${accessToken}`)
			.then((response) => {
				dispatch(fetchSuccess(response));
			})
			.response((error) => {
				dispatch(fetchError(error));
			})
	}	

	function fetchRequest() { return { type: GET_USER_ACCESS_LIST_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_USER_ACCESS_LIST_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_USER_ACCESS_LIST_REJECTED, payload: data } }
}

export const createUser = (data) => {
	return async dispatch => {
		return axios
			.post(`${constant.API_PATH}user/create?accessToken=${accessToken}`, {
				username: data.username,
				password: data.password,
				name: data.name,
				email: data.email,
				level: data.level,
			})
			.then((response) => {
				dispatch(createSuccess(response));
			})
			.catch((error) => {
				dispatch(createError(error))
			})
	}

	function createSuccess(data) { return { type: CREATE_USER_FULFILLED, payload: data } }
	function createError(data) { return { type: CREATE_USER_REJECTED, payload: data } }
}