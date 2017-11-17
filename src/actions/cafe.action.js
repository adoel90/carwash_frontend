import axios from 'axios';
import { constant } from '../config';

export const GET_CAFE_MENU_LIST_REQUESTED = 'GET_CAFE_MENU_LIST_REQUESTED';
export const GET_CAFE_MENU_LIST_FULFILLED = 'GET_CAFE_MENU_LIST_FULFILLED';
export const GET_CAFE_MENU_LIST_REJECTED = 'GET_CAFE_MENU_LIST_REJECTED';
export const GET_CAFE_TYPES_REQUESTED = 'GET_CAFE_TYPES_REQUESTED';
export const GET_CAFE_TYPES_FULFILLED = 'GET_CAFE_TYPES_FULFILLED';
export const GET_CAFE_TYPES_REJECTED = "GET_CAFE_TYPES_REJECTED";
export const CREATE_CAFE_MENU_FULFILLED = 'CREATE_CAFE_MENU_FULFILLED';
export const CREATE_CAFE_MENU_REJECTED = 'CREATE_CAFE_MENU_REJECTED';
export const UPDATE_CAFE_MENU_FULFILLED = 'UPDATE_CAFE_MENU_FULFILLED';
export const UPDATE_CAFE_MENU_REJECTED = 'UPDATE_CAFE_MENU_REJECTED';
export const DELETE_CAFE_MENU_FULFILLED = 'DELETE_CAFE_MENU_FULFILLED';
export const DELETE_CAFE_MENU_REJECTED = 'DELETE_CAFE_MENU_REJECTED';

export const getCafeMenuList = (data, accessToken) => {
	return async dispatch => {
		dispatch(handleRequest());
		return axios
			.get(`${constant.API_PATH}cafe/menu/list?accessToken=${accessToken}&cafe=${data.cafe}&limit=${data.limit}&offset=${data.offset}`)
			.then((response) => {
				dispatch(handleSuccess(response.data));
			})
			.catch((error) => {
				dispatch(handleError(error));
			})
	}

	function handleRequest() { return { type: GET_CAFE_MENU_LIST_REQUESTED } }
	function handleSuccess(data) { return { type: GET_CAFE_MENU_LIST_FULFILLED, payload: data }}
	function handleError(data) { return { type: GET_CAFE_MENU_LIST_REJECTED, payload: data }}
}

export const getAllCafeMenu = (data, accessToken) => {
	return async dispatch => {
		dispatch(handleRequest());
		return axios
			.get(`${constant.API_PATH}cafe/menu?accessToken=${accessToken}&cafe=${data.cafe}`)
			.then((response) => {
				dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleRequest() { return { type: GET_CAFE_MENU_LIST_REQUESTED } }
	function handleSuccess(data) { return { type: GET_CAFE_MENU_LIST_FULFILLED, payload: data }}
	function handleError(data) { return { type: GET_CAFE_MENU_LIST_REJECTED, payload: data }}
}

export const getCafeTypes = (accessToken) => {
	return async dispatch => {

		dispatch(handleRequest());

		return axios
			.get(`${constant.API_PATH}cafe/type?accessToken=${accessToken}`)
			.then((response) => {
				dispatch(handleSuccess(response.data.data));
			})
			.catch((error) => {
				dispatch(handleError(error));
			})
	}

	function handleRequest(data) { return { type: GET_CAFE_TYPES_REQUESTED } }
	function handleSuccess(data) { return { type: GET_CAFE_TYPES_FULFILLED, payload: data }}
	function handleError(data) { return { type: GET_CAFE_TYPES_REJECTED, payload: data }}
}


export const createCafeMenu = (data, accessToken) => {
	return async dispatch => {
		const formData = new FormData();
		formData.append("cafe", data.cafe);
		formData.append('name', data.name);
		formData.append('price', data.price);
		formData.append('description', data.description);
		formData.append('image', data.image);

		return axios
			.post(`${constant.API_PATH}cafe/menu/create?accessToken=${accessToken}`, formData)
			.then((response) => {
				dispatch(handleSuccess(response.data));
			})
			.catch((error) => {
				dispatch(handleError(error));
			})
	}

	function handleSuccess(data) { return { type: CREATE_CAFE_MENU_FULFILLED, payload: data}}
	function handleError(data) { return { type: CREATE_CAFE_MENU_REJECTED, payload: data}}
}

export const updateCafeMenu = (data, accessToken) => {
	return async dispatch => {
		return axios
			.put(`${constant.API_PATH}cafe/menu/update?accessToken=${accessToken}`, {
				cafe: data.cafe,
				id: data.id,
				name: data.name,
				price: data.price,
				description: data.description
			})
			.then((response) => {
				dispatch(handleSuccess(response.data));
			})
			.catch((error) => {
				dispatch(handleError(error));
			})
	}

	function handleSuccess(data) { return { type: UPDATE_CAFE_MENU_FULFILLED, payload: data }}
	function handleError(data) { return { type: UPDATE_CAFE_MENU_REJECTED, payload: data }}
}

export const deleteCafeMenu = (data, accessToken) => {
	return async dispatch => {
		return axios
			.put(`${constant.API_PATH}cafe/menu/delete?accessToken=${accessToken}`, {
				id: data.id
			})
			.then((response) => {
				dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleSuccess(data) { return { type: DELETE_CAFE_MENU_FULFILLED, payload: data }}
	function handleError(data) { return { type: DELETE_CAFE_MENU_REJECTED, payload: data }}
}
