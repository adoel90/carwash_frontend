import axios from 'axios';
import { constant } from '../config';

export const GET_USER_LIST_REQUESTED = 'GET_USER_LIST_REQUESTED';
export const GET_USER_LIST_FULFILLED = 'GET_USER_LIST_FULFILLED';
export const GET_USER_LIST_REJECTED = 'GET_USER_LIST_REJECTED';

const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;

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
