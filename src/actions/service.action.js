import axios from 'axios';
import { constant } from '../config';
import Cookies from 'universal-cookie';

export const GET_SERVICE_LIST_REQUESTED = 'GET_SERVICE_LIST_REQUESTED';
export const GET_SERVICE_LIST_FULFILLED = 'GET_SERVICE_LIST_FULFILLED';
export const GET_SERVICE_LIST_REJECTED = 'GET_SERVICE_LIST_REJECTED';
export const GET_SERVICE_TYPES_REQUESTED = 'GET_SERVICE_TYPES_REQUESTED';
export const GET_SERVICE_TYPES_FULFILLED = 'GET_SERVICE_TYPES_FULFILLED';
export const GET_SERVICE_TYPES_REJECTED = 'GET_SERVICE_TYPES_REJECTED';
export const CREATE_SERVICE_FULFILLED = 'CREATE_SERVICE_FULFILLED';
export const CREATE_SERVICE_REJECTED = 'CREATE_SERVICE_REJECTED';
export const CREATE_SERVICE_TRANSACTION_FULFILLED = 'CREATE_SERVICE_TRANSACTION_FULFILLED';
export const CREATE_SERVICE_TRANSACTION_REJECTED = 'CREATE_SERVICE_TRANSACTION_REJECTED';

const cookies = new Cookies();

export const getServiceList = (data, accessToken) => {
	return async dispatch => {
		dispatch(handleRequest());

		return axios
			.get(`${constant.API_PATH}service/list?accessToken=${accessToken}&type=${data.type}&limit=${data.limit}&offset=${data.offset}`)
			.then((response) => {
				dispatch(handleSuccess(response.data));
			})
			.catch((error) => {
				dispatch(handleError(error));
			})
	}

	function handleRequest() { return { type: GET_SERVICE_LIST_REQUESTED } }
	function handleSuccess(data) { return { type: GET_SERVICE_LIST_FULFILLED, payload: data } }
	function handleError(data) { return { type: GET_SERVICE_LIST_REJECTED, payload: data } }
}

export const getServiceTypes = (accessToken) => {
	return async dispatch => {
		return axios
			.get(`${constant.API_PATH}service/type?accessToken=${accessToken}`)
			.then((response) => {
				dispatch({
					type: GET_SERVICE_TYPES_FULFILLED,
					payload: response.data
				})
			})
			.catch((error) => {
				dispatch({
					type: GET_SERVICE_TYPES_REJECTED,
					payload: error
				})
			})
	}
}

export const createNewService = (data, accessToken) => {
	return async dispatch => {

		let formData = new FormData();
		formData.append("type", data.type);
		formData.append("name", data.name);
		formData.append("price", data.price);
		formData.append("description", data.description);
		formData.append("image", data.image);

		return axios
			.post(`${constant.API_PATH}service/create?accessToken=${accessToken}`, formData)
			.then((response) => {
				dispatch(handleSuccess(response.data));
			})
			.catch((error) => {
				dispatch(handleError(error));
			})
	}

	function handleSuccess(data) { return { type: CREATE_SERVICE_FULFILLED, payload: data } }
	function handleError(data) { return { type: CREATE_SERVICE_REJECTED, payload: data } }
}

export const createServiceTransaction = (data, accessToken) => {
	return async dispatch => {
		return axios
			.post(`${constant.API_PATH}service/transaction/create?accessToken=${accessToken}`, {
				service: data.service
			})
			.then((response) => {
				dispatch(handleSuccess(response.data));
				cookies.set('member', response.data.data, { path: '/' });
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleSuccess(data) { return { type: CREATE_SERVICE_TRANSACTION_FULFILLED, payload: data } };
	function handleError(error) { return { type: CREATE_SERVICE_TRANSACTION_REJECTED, payload: error } };
}
