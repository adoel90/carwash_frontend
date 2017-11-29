import axios from 'axios';
import { constant } from '../config';

export const GET_CARD_TYPE_LIST_REQUESTED = 'GET_CARD_TYPE_LIST_REQUESTED';
export const GET_CARD_TYPE_LIST_FULFILLED = 'GET_CARD_TYPE_LIST_FULFILLED';
export const GET_CARD_TYPE_LIST_REJECTED = 'GET_CARD_TYPE_LIST_REJECTED';
export const GET_ALL_CARD_TYPE_REQUESTED = 'GET_ALL_CARD_TYPE_REQUESTED';
export const GET_ALL_CARD_TYPE_FULFILLED = 'GET_ALL_CARD_TYPE_FULFILLED';
export const GET_ALL_CARD_TYPE_REJECTED = 'GET_ALL_CARD_TYPE_REJECTED';
export const CREATE_CARD_TYPE_FULFILLED = 'CREATE_CARD_TYPE_FULFILLED';
export const CREATE_CARD_TYPE_REJECTED = 'CREATE_CARD_TYPE_REJECTED';
export const UPDATE_CARD_TYPE_FULFILLED = 'UPDATE_CARD_TYPE_FULFILLED';
export const UPDATE_CARD_TYPE_REJECTED = 'UPDATE_CARD_TYPE_REJECTED';
export const TOGGLE_CARD_TYPE_STATUS_FULFILLED = 'TOGGLE_CARD_TYPE_STATUS_FULFILLED';
export const TOGGLE_CARD_TYPE_STATUS_REJECTED = 'TOGGLE_CARD_TYPE_STATUS_REJECTED';
export const DELETE_CARD_TYPE_FULFILLED = 'DELETE_CARD_TYPE_FULFILLED';
export const DELETE_CARD_TYPE_REJECTED = 'DELETE_CARD_TYPE_REJECTED';

export const getCardTypeList = (data, accessToken) => {
	return async dispatch => {

		dispatch(handleRequest());

		return axios
			.get(`${constant.API_PATH}card/type/list?accessToken=${accessToken}`)
			.then((response) => {
				dispatch(handleSuccess(response.data));
			})
			.catch((error) => {
				dispatch(handleError(error));
			})
	}

	function handleRequest() { return { type: GET_ALL_CARD_TYPE_REQUESTED } }
	function handleSuccess(data) { return { type: GET_ALL_CARD_TYPE_FULFILLED, payload: data} }
	function handleError(data) { return { type: GET_ALL_CARD_TYPE_REJECTED, payload: data} }

	// function handleRequest() { return { type: GET_CARD_TYPE_LIST_REQUESTED } }
	// function handleSuccess(data) { return { type: GET_CARD_TYPE_LIST_FULFILLED, payload: data} }
	// function handleError(data) { return { type: GET_CARD_TYPE_LIST_REJECTED, payload: data} }
}

export const getAllCardType = (data, accessToken) => {
	return async dispatch => {
		return axios
			.get(`${constant.API_PATH}card/type?accessToken=${accessToken}`)
			.then((response) => {
				dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleRequest() { return { type: GET_ALL_CARD_TYPE_REQUESTED } }
	function handleSuccess(data) { return { type: GET_ALL_CARD_TYPE_FULFILLED, payload: data} }
	function handleError(data) { return { type: GET_ALL_CARD_TYPE_REJECTED, payload: data} }
}

export const createNewCardType = (data, accessToken) => {
	return async dispatch => {
		return axios
			.post(`${constant.API_PATH}card/type/create?accessToken=${accessToken}`, {
				name: data.name,
				minimum: data.minimum,
				bonus: data.bonus
			})
			.then((response) => {
				dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleSuccess(data) { return { type: CREATE_CARD_TYPE_FULFILLED, payload: data}}
	function handleError(data) { return { type: CREATE_CARD_TYPE_REJECTED, payload: data}}
}

export const updateCardType = (data, accessToken) => {
	return async dispatch => {
		return axios
			.put(`${constant.API_PATH}card/type/update?accessToken=${accessToken}`, {
				id: data.id,
				name: data.name,
				minimum: data.minimum,
				bonus: data.bonus
			})
			.then((response) => {
				return Promise.resolve(dispatch(handleSuccess(response.data)))
			})
			.catch((error) => {
				return Promise.resolve(dispatch(handleError(error)))
			})
	}

	function handleSuccess(data) { return { type: UPDATE_CARD_TYPE_FULFILLED, payload: data}}
	function handleError(data) { return { type: UPDATE_CARD_TYPE_REJECTED, payload: data}}
}

export const toggleCardTypeStatus = (data, accessToken) => {
	return async dispatch => {
		return axios
			.put(`${constant.API_PATH}card/type/status?accessToken=${accessToken}`, {
				id: data.id
			})
			.then((response) => {
				return dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				return dispatch(handleError(error))
			})
	}

	function handleSuccess(data) { return { type: TOGGLE_CARD_TYPE_STATUS_FULFILLED, payload: data} }
	function handleError(data) { return { type: TOGGLE_CARD_TYPE_STATUS_REJECTED, payload: data} }
}

export const deleteCardType = (data, accessToken) => {
	return async dispatch => {
		return axios
			.put(`${constant.API_PATH}card/type/delete?accessToken=${accessToken}`, {
				id: data.id
			})
			.then((response) => {
				return Promise.resolve(dispatch(handleSuccess(response.data)))
			})
			.catch((error) => {
				return Promise.resolve(dispatch(handleError(error)))
			})
	}

	function handleSuccess(data) { return { type: DELETE_CARD_TYPE_FULFILLED, payload: data}}
	function handleError(data) { return { type: DELETE_CARD_TYPE_REJECTED, payload: data}}
}
