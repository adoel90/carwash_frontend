import axios from 'axios';
import { constant } from '../config';
import Cookies from 'universal-cookie';

export const AUTHENTICATE_MEMBER_FULFILLED = 'AUTHENTICATE_MEMBER_FULFILLED';
export const AUTHENTICATE_MEMBER_REJECTED = 'AUTHENTICATE_MEMBER_REJECTED';
export const GET_MEMBER_LIST_FULFILLED = 'GET_MEMBER_LIST_FULFILLED';
export const GET_MEMBER_LIST_REJECTED = 'GET_MEMBER_LIST_REJECTED';

const cookies = new Cookies();

export const authenticateMember = (data, accessToken) => {
	return async dispatch => {
		axios
			.post(`${constant.API_PATH}member/authenticate?accessToken=${accessToken}`, {
				card: data.card
			})
			.then((response) => {
				dispatch(handleSuccess(response.data.data));
			})
			.catch((error) => {
				dispatch(handleError(error.response.data))
			})
	}

	function handleSuccess(data) { return { type: AUTHENTICATE_MEMBER_FULFILLED, payload: data }}
	function handleError(data) { return { type: AUTHENTICATE_MEMBER_REJECTED, payload: data }}
}

export const getMemberList = (data, accessToken) => {
	return async dispatch => {
		axios
			.get(`${constant.API_PATH}member/list?accessToken=${accessToken}&limit=${data.limit}&offset=${data.offset}`)
			.then((response) => {
				dispatch(handleSuccess(response.data.data));
			})
			.catch((error) => {
				dispatch(handleError(error.response.data));
			})
	}

	function handleSuccess(data) { return { type: GET_MEMBER_LIST_FULFILLED, payload: data }}
	function handleError(data) { return { type: GET_MEMBER_LIST_REJECTED, payload: data }}
}

export const createNewMember = (data, accessToken) => {
	// return async dispatch => {
	// 	axios
	// 		.post(`${constant.API_PATH}/member/create?accessToken={accessToken}`, {
	// 			name: data.name,
	// 			phone: data.phone,
	// 			email: data.email,
	// 			address: data.address,
	// 			card: data.card
	// 		})
	// 		.then((response) => {
	// 			dispatch(handleSuccess(response.data))
	// 		})
	// 		.catch((error) => {
	// 			dispatch(handleError(error))
	// 		})
	// }
	//
	// function handleRequest() { return { type: CREATE_MEMBER_REQUESTED } };
	// function handleSuccess(data) { return { type: CREATE_MEMBER_FULFILLED, payload: data } };
	// function handleError(data) { return { type: CREATE_MEMBER_REJECTED }, payload: data}
}
