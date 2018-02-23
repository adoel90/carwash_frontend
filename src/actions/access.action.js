import axios from 'axios';
import { constant } from '../config';

export const GET_ACCESS_LIST_REQUESTED = 'GET_ACCESS_LIST_REQUESTED';
export const GET_ACCESS_LIST_FULFILLED = 'GET_ACCESS_LIST_FULFILLED';
export const GET_ACCESS_LIST_REJECTED = 'GET_ACCESS_LIST_REJECTED';

const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;

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