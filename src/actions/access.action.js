import axios from 'axios';
import { constant } from '../config';

export const GET_ALL_ACCESS_REQUESTED = 'GET_ALL_ACCESS_REQUESTED';
export const GET_ALL_ACCESS_FULFILLED = 'GET_ALL_ACCESS_FULFILLED';
export const GET_ALL_ACCESS_REJECTED = 'GET_ALL_ACCESS_REJECTED';
export const GET_ACCESS_DETAIL_REQUESTED = 'GET_ACCESS_DETAIL_REQUESTED';
export const GET_ACCESS_DETAIL_FULFILLED = 'GET_ACCESS_DETAIL_FULFILLED';
export const GET_ACCESS_DETAIL_REJECTED = 'GET_ACCESS_DETAIL_REJECTED';
export const UPDATE_ACCESS_REQUESTED = 'UPDATE_ACCESS_REQUESTED';
export const UPDATE_ACCESS_FULFILLED = 'UPDATE_ACCESS_FULFILLED';
export const UPDATE_ACCESS_REJECTED = 'UPDATE_ACCESS_REJECTED';
export const CREATE_ACCESS_REQUESTED = 'CREATE_ACCESS_REQUESTED';
export const CREATE_ACCESS_FULFILLED = 'CREATE_ACCESS_FULFILLED';
export const CREATE_ACCESS_REJECTED = 'CREATE_ACCESS_REJECTED';
export const CHANGE_ACCESS_STATUS_REQUESTED = 'CHANGE_ACCESS_STATUS_REQUESTED';
export const CHANGE_ACCESS_STATUS_FULFILLED = 'CHANGE_ACCESS_STATUS_FULFILLED';
export const CHANGE_ACCESS_STATUS_REJECTED = 'CHANGE_ACCESS_STATUS_REJECTED';

export const getAllAccess = (accessToken) => {
	return async dispatch => {
		dispatch(handleRequest());
		return axios
			.get(`${constant.API_PATH}access?accessToken=${accessToken}`)
			.then((response) => {
				dispatch(handleSuccess(response.data));
			})
			.catch((error) => {
				dispatch(handleSuccess(error));
			})
	}

	function handleRequest() { return { type: GET_ALL_ACCESS_REQUESTED } }
	function handleSuccess(data) { return { type: GET_ALL_ACCESS_FULFILLED, payload: data } }
	function handleError(data) { return { type: GET_ALL_ACCESS_REJECTED, payload: data } }
}

export const getAccessDetail = (data, accessToken) => {
	return async dispatch => {
		dispatch(handleRequest());
		return axios
			.get(`${constant.API_PATH}access/detail?accessToken=${accessToken}&id=${data.id}`)
			.then((response) => {
				dispatch(handleSuccess(response.data.data));
			})
			.catch((error) => {
				dispatch(handleError(error));
			})
	}

	function handleRequest() { return { type: GET_ACCESS_DETAIL_REQUESTED } }
	function handleSuccess(data) { return { type: GET_ACCESS_DETAIL_FULFILLED, payload: data } }
	function handleError(data) { return { type: GET_ACCESS_DETAIL_REJECTED, payload: data } }	
}

export const createAccess = (data, accessToken) => {
	return async dispatch => {
		dispatch(handleRequest());
		return axios
			.post(`${constant.API_PATH}access/create?accessToken=${accessToken}`, {
				name: data.name,
				module: data.module
			})
			.then((response) => {
				dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleRequest() { return { type: CREATE_ACCESS_REQUESTED } }
	function handleSuccess(data) { return { type: CREATE_ACCESS_FULFILLED, payload: data } }
	function handleError(data) { return { type: CREATE_ACCESS_REJECTED, payload: data } }	
}

export const updateAccess = (data, accessToken) => {
	return async dispatch => {
		dispatch(handleRequest());
		return axios
			.put(`${constant.API_PATH}access/update?accessToken=${accessToken}`, {
				id: data.id,
				name: data.name,
				module: data.module
			})
			.then((response) => {
				dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				dispatch(handleError(error))	
			})
	}

	function handleRequest() { return { type: UPDATE_ACCESS_REQUESTED } }
	function handleSuccess(data) { return { type: UPDATE_ACCESS_FULFILLED, payload: data } }
	function handleError(data) { return { type: UPDATE_ACCESS_REJECTED, payload: data } }
}

export const changeAccessStatus = (data, accessToken) => {
	return async dispatch => {
		dispatch(handleRequest());
		return axios
			.put(`${constant.API_PATH}access/status?accessToken=${accessToken}`, {
				id: data.id
			})
			.then((response) => {
				dispatch(handleSuccess(response.data, data.id))
			})
			.catch((error) =>  {
				dispatch(handleError(error, data.id))
			})
	}

	function handleRequest() { return { type: CHANGE_ACCESS_STATUS_REQUESTED } }
	function handleSuccess(data, id) { return { type: CHANGE_ACCESS_STATUS_FULFILLED, payload: data, id: id } }
	function handleError(data, id) { return { type: CHANGE_ACCESS_STATUS_REJECTED, payload: data, id: id } }
}