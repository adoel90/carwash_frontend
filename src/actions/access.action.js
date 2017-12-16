import axios from 'axios';
import { constant } from '../config';

import GET_ALL_ACCESS_REQUESTED = 'GET_ALL_ACCESS_REQUESTED';
import GET_ALL_ACCESS_FULFILLED = 'GET_ALL_ACCESS_FULFILLED';
import GET_ALL_ACCESS_REJECTED = 'GET_ALL_ACCESS_REJECTED';

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
	function handleSuccess(data) { return { type: GET_ALL_ACCESS_REQUESTED, payload: data } }
	function handleError(data) { return { type: GET_ALL_ACCESS_REQUESTED, payload: data } }
}