import axios from 'axios';
import { constant } from '../config';

export const GET_BALANCE_CARD_LIST_REQUESTED = 'GET_BALANCE_CARD_LIST_REQUESTED';
export const GET_BALANCE_CARD_LIST_FULFILLED = 'GET_BALANCE_CARD_LIST_FULFILLED';
export const GET_BALANCE_CARD_LIST_REJECTED = 'GET_BALANCE_CARD_LIST_REJECTED';
export const GET_ALL_BALANCE_CARD_REQUESTED = 'GET_ALL_BALANCE_CARD_REQUESTED';
export const GET_ALL_BALANCE_CARD_FULFILLED = 'GET_ALL_BALANCE_CARD_FULFILLED';
export const GET_ALL_BALANCE_CARD_REJECTED = 'GET_ALL_BALANCE_CARD_REJECTED';
export const CREATE_BALANCE_CARD_FULFILLED = 'CREATE_BALANCE_CARD_FULFILLED';
export const CREATE_BALANCE_CARD_REJECTED = 'CREATE_BALANCE_CARD_REJECTED';
export const UPDATE_BALANCE_CARD_REQUESTED = 'UPDATE_BALANCE_CARD_REQUESTED';
export const UPDATE_BALANCE_CARD_FULFILLED = 'UPDATE_BALANCE_CARD_FULFILLED';
export const UPDATE_BALANCE_CARD_REJECTED = 'UPDATE_BALANCE_CARD_REJECTED';
export const CHANGE_BALANCE_CARD_STATUS_REQUESTED = 'CHANGE_BALANCE_CARD_STATUS_REQUESTED';
export const CHANGE_BALANCE_CARD_STATUS_FULFILLED = 'CHANGE_BALANCE_CARD_STATUS_FULFILLED';
export const CHANGE_BALANCE_CARD_STATUS_REJECTED = 'CHANGE_BALANCE_CARD_STATUS_REJECTED';
export const DELETE_BALANCE_CARD_FULFILLED = 'DELETE_BALANCE_CARD_FULFILLED';
export const DELETE_BALANCE_CARD_REJECTED = 'DELETE_BALANCE_CARD_REJECTED';


const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;

export const getBalanceCardList = (data) => {
	return async dispatch => {

		dispatch(handleRequest());

		return axios
			.get(`${constant.API_PATH}saldo/list?accessToken=${accessToken}`)
			.then((response) => {
				dispatch(handleSuccess(response.data));
			})
			.catch((error) => {
				dispatch(handleError(error));
			})
	}

	function handleRequest() { return { type: GET_ALL_BALANCE_CARD_REQUESTED } }
	function handleSuccess(data) { return { type: GET_ALL_BALANCE_CARD_FULFILLED, payload: data} }
	function handleError(data) { return { type: GET_ALL_BALANCE_CARD_REJECTED, payload: data} }
}

export const getAllBalanceCard = (data) => {
	return async dispatch => {
		return axios
			.get(`${constant.API_PATH}saldo/list?accessToken=${accessToken}`)
			.then((response) => {
				dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleRequest() { return { type: GET_ALL_BALANCE_CARD_REQUESTED } }
	function handleSuccess(data, id) { return { type: GET_ALL_BALANCE_CARD_FULFILLED, payload: data} }
	function handleError(data) { return { type: GET_ALL_BALANCE_CARD_REJECTED, payload: data} }
}

export const createNewBalanceCard = (data) => {
	return async dispatch => {
		return axios
			.post(`${constant.API_PATH}saldo/create?accessToken=${accessToken}`, data)
			.then((response) => {
				dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleSuccess(data) { return { type: CREATE_BALANCE_CARD_FULFILLED, payload: data}}
	function handleError(data) { return { type: CREATE_BALANCE_CARD_REJECTED, payload: data}}
}

export const updateBalanceCard = (data) => {
	// return async dispatch => {
	// 	return axios
	// 		.put(`${constant.API_PATH}saldo/update?accessToken=${accessToken}`, {
	// 			id: data.id,
	// 			name: data.name,
	// 			minimum: data.min,
	// 			bonus: data.bonus,
	// 			refund: data.refund,
	// 			charge: data.charge
	// 		})
	// 		.then((response) => {
	// 			dispatch(handleSuccess(response.data))
	// 		})
	// 		.catch((error) => {
	// 			dispatch(handleError(error))
	// 		})
	// }

	return async dispatch => {
		dispatch(updateRequest());
		return axios
			.put(`${constant.API_PATH}saldo/update?accessToken=${accessToken}`, data)
			.then((response) => {
				dispatch(updateSuccess(response.data));
			})
			.catch((error) => {
				dispatch(updateError(error))
			})
	}

	function updateRequest() { return { type: UPDATE_BALANCE_CARD_REQUESTED } }
	function updateSuccess(data) { return { type: UPDATE_BALANCE_CARD_FULFILLED, payload: data}}
	function updateError(data) { return { type: UPDATE_BALANCE_CARD_REJECTED, payload: data}}
}

export const changeBalanceCardStatus = (data) => {
	return async dispatch => {
		dispatch(handleRequest(data.id));

		return axios
			.put(`${constant.API_PATH}saldo/status?accessToken=${accessToken}`, {
				id: data.id
			})
			.then((response) => {
				return dispatch(handleSuccess(response.data, data.id))
			})
			.catch((error) => {
				return dispatch(handleError(error, data.id))
			})
	}

	function handleRequest(id) { return { type: CHANGE_BALANCE_CARD_STATUS_REQUESTED, id: id } }
	function handleSuccess(data, id) { return { type: CHANGE_BALANCE_CARD_STATUS_FULFILLED, id: id, payload: data} }
	function handleError(data, id) { return { type: CHANGE_BALANCE_CARD_STATUS_REJECTED, id: id, payload: data} }
}

export const deleteBalanceCard = (data) => {
	return async dispatch => {
		return axios
			.put(`${constant.API_PATH}saldo/delete?accessToken=${accessToken}`, {
				id: data.id
			})
			.then((response) => {
				return Promise.resolve(dispatch(handleSuccess(response.data)))
			})
			.catch((error) => {
				return Promise.resolve(dispatch(handleError(error)))
			})
	}

	function handleSuccess(data) { return { type: DELETE_BALANCE_CARD_FULFILLED, payload: data}}
	function handleError(data) { return { type: DELETE_BALANCE_CARD_REJECTED, payload: data}}
}