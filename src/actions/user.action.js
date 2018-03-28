import axios from 'axios';
import { constant } from '../config';

export const GET_USER_LIST_REQUESTED = 'GET_USER_LIST_REQUESTED';
export const GET_USER_LIST_FULFILLED = 'GET_USER_LIST_FULFILLED';
export const GET_USER_LIST_REJECTED = 'GET_USER_LIST_REJECTED';

export const GET_USER_DETAIL_REQUESTED = 'GET_USER_DETAIL_REQUESTED';
export const GET_USER_DETAIL_FULFILLED = 'GET_USER_DETAIL_FULFILLED';
export const GET_USER_DETAIL_REJECTED = 'GET_USER_DETAIL_REJECTED';

export const CREATE_USER_REQUESTED = 'CREATE_USER_REQUESTED';
export const CREATE_USER_FULFILLED = 'CREATE_USER_FULFILLED';
export const CREATE_USER_REJECTED = 'CREATE_USER_REJECTED';

export const UPDATE_USER_REQUESTED = 'UPDATE_USER_REQUESTED';
export const UPDATE_USER_FULFILLED = 'UPDATE_USER_FULFILLED';
export const UPDATE_USER_REJECTED = 'UPDATE_USER_REJECTED';

export const CHANGE_STATUS_USER_REQUESTED = 'CHANGE_STATUS_USER_REQUESTED';
export const CHANGE_STATUS_USER_FULFILLED = 'CHANGE_STATUS_USER_FULFILLED';
export const CHANGE_STATUS_USER_REJECTED = 'CHANGE_STATUS_USER_REJECTED';

const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;
// console.log(accessToken);

export const getUserList = (e) => {
	let data = {
		access: e.access ? e.access : "",
		active: e.active ? e.active : ""
	}
	
	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}user/list?accessToken=${accessToken}&access=${data.access}&active=${data.active}`)
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

export const getUserDetail = (data) => {
	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}user/detail?accessToken=${accessToken}&id=${data.id}`)
			.then((response) => {
				dispatch(fetchSuccess(response));
			})
			.catch((error) => {
				dispatch(fetchError(error));
			})
	}

	function fetchRequest() { return { type: GET_USER_DETAIL_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_USER_DETAIL_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_USER_DETAIL_REJECTED, payload: data } }
}

export const createUser = (data) => {
	return async dispatch => {
		dispatch(createRequest());
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

	function createRequest() { return { type: CREATE_USER_REQUESTED } }
	function createSuccess(data) { return { type: CREATE_USER_FULFILLED, payload: data } }
	function createError(data) { return { type: CREATE_USER_REJECTED, payload: data } }
}

export const updateUser = (data) => {
	return async dispatch => {
		dispatch(updateRequest());
		return axios
			.put(`${constant.API_PATH}user/update?accessToken=${accessToken}`, data)
			.then((response) => {
				dispatch(updateSuccess(response));
			})
			.catch((error) => {
				dispatch(updateError(error))
			})
	}

	function updateRequest() { return { type: UPDATE_USER_REQUESTED } }
	function updateSuccess(data) { return { type: UPDATE_USER_FULFILLED, payload: data } }
	function updateError(data) { return { type: UPDATE_USER_REJECTED, payload: data } }
}

export const changeStatusUser = (data) => {
	return async dispatch => {
		dispatch(statusRequest());
		return axios
			.put(`${constant.API_PATH}user/status?accessToken=${accessToken}`, data)
			.then((response) => {
				dispatch(statusSuccess(response, data.id));
			})
			.catch((error) => {
				dispatch(statusError(error, data.id));
			})
	}

	function statusRequest(id) { return { type: CHANGE_STATUS_USER_REQUESTED, id: id } }
	function statusSuccess(data, id) { return { type: CHANGE_STATUS_USER_FULFILLED, payload: data, id: id } }
	function statusError(data, id) { return { type: CHANGE_STATUS_USER_REJECTED, payload: data, id: id } }
}

