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
