import axios from 'axios';
import { constant } from '../config';

export const GET_ALL_ACCESS_REQUESTED = 'GET_ALL_ACCESS_REQUESTED';
export const GET_ALL_ACCESS_FULFILLED = 'GET_ALL_ACCESS_FULFILLED';
export const GET_ALL_ACCESS_REJECTED = 'GET_ALL_ACCESS_REJECTED';

export const GET_ACCESS_LIST_REQUESTED = 'GET_ACCESS_LIST_REQUESTED';
export const GET_ACCESS_LIST_FULFILLED = 'GET_ACCESS_LIST_FULFILLED';
export const GET_ACCESS_LIST_REJECTED = 'GET_ACCESS_LIST_REJECTED';

export const GET_ACCESS_DETAIL_REQUESTED = 'GET_ACCESS_DETAIL_REQUESTED';
export const GET_ACCESS_DETAIL_FULFILLED = 'GET_ACCESS_DETAIL_FULFILLED';
export const GET_ACCESS_DETAIL_REJECTED = 'GET_ACCESS_DETAIL_REJECTED';

export const CREATE_NEW_ACCESS_REQUESTED = 'CREATE_NEW_ACCESS_REQUESTED';
export const CREATE_NEW_ACCESS_FULFILLED = 'CREATE_NEW_ACCESS_FULFILLED';
export const CREATE_NEW_ACCESS_REJECTED = 'CREATE_NEW_ACCESS_REJECTED';

export const UPDATE_ACCESS_REQUESTED = 'UPDATE_ACCESS_REQUESTED';
export const UPDATE_ACCESS_FULFILLED = 'UPDATE_ACCESS_FULFILLED';
export const UPDATE_ACCESS_REJECTED = 'UPDATE_ACCESS_REJECTED';

export const CHANGE_ACCESS_STATUS_REQUESTED = 'CHANGE_ACCESS_STATUS_REQUESTED';
export const CHANGE_ACCESS_STATUS_FULFILLED = 'CHANGE_ACCESS_STATUS_FULFILLED';
export const CHANGE_ACCESS_STATUS_REJECTED = 'CHANGE_ACCESS_STATUS_REJECTED';

const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;

export const getAllAccess = () => {
	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}access?accessToken=${accessToken}`)
			.then((response) => {
				dispatch(fetchSuccess(response.data));
			})
			.catch((error) => {
				dispatch(fetchSuccess(error));
			})
	}

	function fetchRequest() { return { type: GET_ALL_ACCESS_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_ALL_ACCESS_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_ALL_ACCESS_REJECTED, payload: data } }
}

export const getAccessList = (e) => {
	let data = {
		active: e.active ? e.active : ""
	}
	
	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}access/list?accessToken=${accessToken}&active=${data.active}`)
			.then((response) => {
				dispatch(fetchSuccess(response));
			})
			.catch((error) => {
				dispatch(fetchError(error));
			})
	}

	function fetchRequest() { return { type: GET_ACCESS_LIST_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_ACCESS_LIST_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_ACCESS_LIST_REJECTED, payload: data } }
}

export const getAccessDetail = (data) => {
	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}access/detail?accessToken=${accessToken}&id=${data.id}`)
			.then((response) => {
				dispatch(fetchSuccess(response));
			})
			.catch((error) => {
				dispatch(fetchError(error));
			});
	}

	function fetchRequest() { return { type: GET_ACCESS_DETAIL_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_ACCESS_DETAIL_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_ACCESS_DETAIL_REJECTED, payload: data } }
}

export const createNewAccess = (data) => {
	return async dispatch => {
		dispatch(createRequest());
		return axios
			.post(`${constant.API_PATH}access/create?accessToken=${accessToken}`, data)
			.then((response) => {
				dispatch(createSuccess(response));
			})
			.catch((error) => {
				dispatch(createError(error));
			});
	}

	function createRequest() { return { type: CREATE_NEW_ACCESS_REQUESTED } }
	function createSuccess(data) { return { type: CREATE_NEW_ACCESS_FULFILLED } }
	function createError(data) { return { type: CREATE_NEW_ACCESS_REJECTED } }
}

export const updateAccess = (data) => {
	return async dispatch => {
		dispatch(updateRequest());
		return axios
			.put(`${constant.API_PATH}access/update?accessToken=${accessToken}`, data)
			.then((response) => {
				dispatch(updateSuccess(response));
			})
			.catch((error) => {
				dispatch(updateError(error));
			});
	}

	function updateRequest() { return { type: UPDATE_ACCESS_REQUESTED } }
	function updateSuccess(data) { return { type: UPDATE_ACCESS_FULFILLED } }
	function updateError(data) { return { type: UPDATE_ACCESS_REJECTED } }
}

export const changeStatusAccess = (data) => {
	return async dispatch => {
		dispatch(statusRequest(data.id));
		return axios
			.put(`${constant.API_PATH}access/status?accessToken=${accessToken}`, data)
			.then((response) => {
				dispatch(statusSuccess(response, data.id));
			})
			.catch((error) => {
				dispatch(statusError(error, data.id));
			});
	}

	function statusRequest(id) { return { type: CHANGE_ACCESS_STATUS_REQUESTED, id: id } }
	function statusSuccess(data, id) { return { type: CHANGE_ACCESS_STATUS_FULFILLED, payload: data, id: id } }
	function statusError(data, id) { return { type: CHANGE_ACCESS_STATUS_REJECTED, payload: data, id: id } }
}