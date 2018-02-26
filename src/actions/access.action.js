import axios from 'axios';
import { constant } from '../config';

export const GET_ACCESS_LIST_REQUESTED = 'GET_ACCESS_LIST_REQUESTED';
export const GET_ACCESS_LIST_FULFILLED = 'GET_ACCESS_LIST_FULFILLED';
export const GET_ACCESS_LIST_REJECTED = 'GET_ACCESS_LIST_REJECTED';

// <<<<<<< HEAD
// export const getAllAccess = (accessToken) => {

// 	return async dispatch => {
// 		dispatch(handleRequest());
// 		return axios
// 			.get(`${constant.API_PATH}access?accessToken=${accessToken}`)
// 			.then((response) => {
// 				dispatch(handleSuccess(response.data));
// 			})
// 			.catch((error) => {
// 				dispatch(handleSuccess(error));
// 			})
// 	}

// 	function handleRequest() { return { type: GET_ALL_ACCESS_REQUESTED } }
// 	function handleSuccess(data) { return { type: GET_ALL_ACCESS_FULFILLED, payload: data } }
// 	function handleError(data) { return { type: GET_ALL_ACCESS_REJECTED, payload: data } }
// }
// =======
const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;
// >>>>>>> 7ed3410e00f8d971d204a483add0958d4162951a

export const getAccessList = (accessToken) => {
	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}access/list?accessToken=${accessToken}`)
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