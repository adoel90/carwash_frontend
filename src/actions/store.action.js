import axios from 'axios';
import { constant } from '../config';
import { access } from 'fs';

export const GET_STORE_LIST_REQUESTED = 'GET_STORE_LIST_REQUESTED';
export const GET_STORE_LIST_FULFILLED = 'GET_STORE_LIST_FULFILLED';
export const GET_STORE_LIST_REJECTED = 'GET_STORE_LIST_REJECTED';

export const GET_STORE_DETAIL_REQUESTED = 'GET_STORE_DETAIL_REQUESTED';
export const GET_STORE_DETAIL_FULFILLED = 'GET_STORE_DETAIL_FULFILLED';
export const GET_STORE_DETAIL_REJECTED = 'GET_STORE_DETAIL_REJECTED';

export const CREATE_STORE_REQUESTED = 'CREATE_STORE_REQUESTED';
export const CREATE_STORE_FULFILLED = 'CREATE_STORE_FULFILLED';
export const CREATE_STORE_REJECTED = 'CREATE_STORE_REJECTED';

export const UPDATE_STORE_REQUESTED = 'UPDATE_STORE_REQUESTED';
export const UPDATE_STORE_FULFILLED = 'UPDATE_STORE_FULFILLED';
export const UPDATE_STORE_REJECTED = 'UPDATE_STORE_REJECTED';

export const CHANGE_STATUS_STORE_REQUESTED = 'CHANGE_STATUS_STORE_REQUESTED';
export const CHANGE_STATUS_STORE_FULFILLED = 'CHANGE_STATUS_STORE_FULFILLED';
export const CHANGE_STATUS_STORE_REJECTED = 'CHANGE_STATUS_STORE_REJECTED';

export const GET_CATEGORY_LIST_REQUESTED = 'GET_CATEGORY_LIST_REQUESTED';
export const GET_CATEGORY_LIST_FULFILLED = 'GET_CATEGORY_LIST_FULFILLED';
export const GET_CATEGORY_LIST_REJECTED = 'GET_CATEGORY_LIST_REJECTED';

const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;

export const getStoreList = (data) => {
	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}store/list?accessToken=${accessToken}`)
			.then((response) => {
				dispatch(fetchSuccess(response));
			})
			.catch((error) => {
				dispatch(fetchError(error));
			})
	}

	function fetchRequest() { return { type: GET_STORE_LIST_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_STORE_LIST_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_STORE_LIST_REJECTED, payload: data } }
}

export const getStoreDetail = (data) => {
	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}store/detail?accessToken=${accessToken}&id=${data.id}`)
			.then((response) => {
				dispatch(fetchSuccess(response));
			})
			.catch((error) => {
				dispatch(fetchError(error));
			})
	}

	function fetchRequest() { return { type: GET_STORE_DETAIL_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_STORE_DETAIL_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_STORE_DETAIL_REJECTED, payload: data } }
}

export const createStore = (data) => {
	return async dispatch => {
		dispatch(createRequest());
		return axios
			.post(`${constant.API_PATH}store/create?accessToken=${accessToken}`, data)
			.then((response) => {
				dispatch(createSuccess(response));
			})
			.catch((error) => {
				dispatch(createError(error))
			})
	}

	function createRequest() { return { type: CREATE_STORE_REQUESTED } }
	function createSuccess(data) { return { type: CREATE_STORE_FULFILLED, payload: data } }
	function createError(data) { return { type: CREATE_STORE_REJECTED, payload: data } }
}

export const updateStore = (data) => {
	return async dispatch => {
		dispatch(updateRequest());
		return axios
			.put(`${constant.API_PATH}store/update?accessToken=${accessToken}`, data)
			.then((response) => {
				dispatch(updateSuccess(response));
			})
			.catch((error) => {
				dispatch(updateError(error))
			})
	}

	function updateRequest() { return { type: UPDATE_STORE_REQUESTED } }
	function updateSuccess(data) { return { type: UPDATE_STORE_FULFILLED, payload: data } }
	function updateError(data) { return { type: UPDATE_STORE_REJECTED, payload: data } }
}

export const changeStatusStore = (data) => {
	return async dispatch => {
		dispatch(statusRequest());
		return axios
			.put(`${constant.API_PATH}store/status?accessToken=${accessToken}`, data)
			.then((response) => {
				dispatch(statusSuccess(response, data.id));
			})
			.catch((error) => {
				dispatch(statusError(error, data.id));
			})
	}

	function statusRequest(id) { return { type: CHANGE_STATUS_STORE_REQUESTED, id: id } }
	function statusSuccess(data, id) { return { type: CHANGE_STATUS_STORE_FULFILLED, payload: data, id: id } }
	function statusError(data, id) { return { type: CHANGE_STATUS_STORE_REJECTED, payload: data, id: id } }
}

export const getCategoryList = (data) => {
	return async dispatch => {
		dispatch(categoryRequest());
		return axios
			.get(`${constant.API_PATH}store/category?accessToken=${accessToken}`)
			.then((response) => {
				dispatch(categorySuccess(response));
			})
			.catch((err) => {
				dispatch(categoryError(err));
			})
	}

	function categoryRequest() { return { type: GET_CATEGORY_LIST_REQUESTED } }
	function categorySuccess(data) { return { type: GET_CATEGORY_LIST_FULFILLED, payload: data } }
	function categoryError(data) { return { type: GET_CATEGORY_LIST_REJECTED, payload: data } }
}