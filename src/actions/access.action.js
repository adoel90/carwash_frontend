import axios from 'axios';
import { constant } from '../config';

export const GET_ALL_ACCESS_REQUESTED = 'GET_ALL_ACCESS_REQUESTED';
export const GET_ALL_ACCESS_FULFILLED = 'GET_ALL_ACCESS_FULFILLED';
export const GET_ALL_ACCESS_REJECTED = 'GET_ALL_ACCESS_REJECTED';
export const UPDATE_ACCESS_REQUESTED = 'UPDATE_ACCESS_REQUESTED';
export const UPDATE_ACCESS_FULFILLED = 'UPDATE_ACCESS_FULFILLED';
export const UPDATE_ACCESS_REJECTED = 'UPDATE_ACCESS_REJECTED';

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

export const updateAccess = (data, accessToken) => {
	return async dispatch => {
		dispatch(handleRequest());
		return axios
			.put(`${constant.API_PATH}access/update?accessToken=${accessToken}`)
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