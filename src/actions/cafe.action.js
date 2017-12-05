import axios from 'axios';
import { constant } from '../config';

export const GET_CAFE_MENU_LIST_REQUESTED = 'GET_CAFE_MENU_LIST_REQUESTED';
export const GET_CAFE_MENU_LIST_FULFILLED = 'GET_CAFE_MENU_LIST_FULFILLED';
export const GET_CAFE_MENU_LIST_REJECTED = 'GET_CAFE_MENU_LIST_REJECTED';
export const GET_CAFE_TYPES_REQUESTED = 'GET_CAFE_TYPES_REQUESTED';
export const GET_CAFE_TYPES_FULFILLED = 'GET_CAFE_TYPES_FULFILLED';
export const GET_CAFE_TYPES_REJECTED = "GET_CAFE_TYPES_REJECTED";
export const UPDATE_CAFE_TYPE_REQUESTED = 'GET_CAFE_TYPE_REQUESTED';
export const UPDATE_CAFE_TYPE_FULFILLED = 'UPDATE_CAFE_TYPE_FULFILLED';
export const UPDATE_CAFE_TYPE_REJECTED = 'UPDATE_CAFE_TYPE_REJECTED';
export const CREATE_CAFE_MENU_REQUESTED = 'CREATE_CAFE_MENU_REQUESTED';
export const CREATE_CAFE_MENU_FULFILLED = 'CREATE_CAFE_MENU_FULFILLED';
export const CREATE_CAFE_MENU_REJECTED = 'CREATE_CAFE_MENU_REJECTED';
export const CREATE_CAFE_TRANSACTION_FULFILLED = 'CREATE_CAFE_TRANSACTION_FULFILLED';
export const CREATE_CAFE_TRANSACTION_REJECTED = 'CREATE_CAFE_TRANSACTION_REJECTED';
export const UPDATE_CAFE_MENU_REQUESTED = 'UPDATE_CAFE_MENU_REQUESTED';
export const UPDATE_CAFE_MENU_FULFILLED = 'UPDATE_CAFE_MENU_FULFILLED';
export const UPDATE_CAFE_MENU_REJECTED = 'UPDATE_CAFE_MENU_REJECTED';
export const CHANGE_CAFE_MENU_STATUS_REQUESTED = 'CHANGE_CAFE_MENU_STATUS_REQUESTED';
export const CHANGE_CAFE_MENU_STATUS_FULFILLED = 'CHANGE_CAFE_MENU_STATUS_FULFILLED';
export const CHANGE_CAFE_MENU_STATUS_REJECTED = 'CHANGE_CAFE_MENU_STATUS_REJECTED';
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
	return dispatch => {
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
				dispatch(handleSuccess(response.data));
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
				dispatch(handleSuccess(response.data, data.id));
			})
			.catch((error) => {
				dispatch(handleError(error, data.id));
			})
	}

	function handleRequest(id) { return { type: CREATE_CAFE_MENU_REQUESTED, id: id } }
	function handleSuccess(data, id) { return { type: CREATE_CAFE_MENU_FULFILLED, id: id, payload: data}}
	function handleError(data, id) { return { type: CREATE_CAFE_MENU_REJECTED, id: id, payload: data}}
}

export const createCafeTransaction = (data, accessToken) => {
	return async dispatch => {

		console.log(data);

		return axios
			.post(`${constant.API_PATH}cafe/transaction/create?accessToken=${accessToken}`, {
				menu: data
			}, {
				'Content-Type': 'application/json'
			})
			.then((response) => {
				dispatch(handleSuccess(response.data));
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleSuccess(data) { return { type: CREATE_CAFE_TRANSACTION_FULFILLED, payload: data }}
	function handleError(data) { return { type: CREATE_CAFE_TRANSACTION_REJECTED, payload: data }}
}

export const updateCafeMenu = (data, accessToken) => {
	return async dispatch => {
		dispatch(handleRequest(data.id));

		return axios
			.put(`${constant.API_PATH}cafe/menu/update?accessToken=${accessToken}`, {
				cafe: data.cafe,
				id: data.id,
				name: data.name,
				price: data.price,
				description: data.description
			})
			.then((response) => {
				dispatch(handleSuccess(response.data, data.id));
			})
			.catch((error) => {
				dispatch(handleError(error, data.id));
			})
	}

	function handleRequest(id) { return { type: UPDATE_CAFE_MENU_REQUESTED, id: id } }
	function handleSuccess(data, id) { return { type: UPDATE_CAFE_MENU_FULFILLED, id: id, payload: data }}
	function handleError(data, id) { return { type: UPDATE_CAFE_MENU_REJECTED, id: id, payload: data }}
}

export const changeCafeMenuStatus = (data, accessToken) => {
	return async dispatch => {
		dispatch(handleRequest(data.id));

		return axios
			.put(`${constant.API_PATH}cafe/menu/status?accessToken=${accessToken}`, {
				id: data.id
			})
			.then((response) => {
				dispatch(handleSuccess(response.data, data.id));
			})
			.catch((error) => {
				dispatch(handleError(error, data.id))
			})
	}

	function handleRequest(id) { return { type: CHANGE_CAFE_MENU_STATUS_REQUESTED, id: id } }
	function handleSuccess(data, id) { return { type: CHANGE_CAFE_MENU_STATUS_FULFILLED, payload: data, id: id } }
	function handleError(data, id) { return { type: CHANGE_CAFE_MENU_STATUS_REJECTED, payload: data, id: id } }
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
