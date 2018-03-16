import axios from 'axios';
import { constant } from '../config';

//GET STORE LIST
export const GET_STORE_LIST_REQUESTED = 'GET_STORE_LIST_REQUESTED';
export const GET_STORE_LIST_FULFILLED = 'GET_STORE_LIST_FULFILLED';
export const GET_STORE_LIST_REJECTED = 'GET_STORE_LIST_REJECTED';

//#GET MENU LIST STORE
export const GET_MENU_LIST_STORE_REQUESTED = 'GET_MENU_LIST_STORE_REQUESTED';
export const GET_MENU_LIST_STORE_FULFILLED = 'GET_MENU_LIST_STORE_FULFILLED';
export const GET_MENU_LIST_STORE_REJECTED = 'GET_MENU_LIST_STORE_REJECTED';

const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;


//GET STORE LIST
export const getStoreList = (data) => {
	return async dispatch => {
		dispatch(fetchRequest());
		return axios
            
            // .get(`${constant.API_PATH}vendor/list?accessToken=${accessToken}`)
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

//#GET MENU LIST STORE
export const getMenuListStore = (data) => {

	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			
            .get(`${constant.API_PATH}store/menu/list?accessToken=${accessToken}&store=${data.id}`)
            // .get(`${constant.API_PATH}store/menu/list?accessToken=${accessToken}&store=${data.store}&name=${data.name}`)
            // .get(`${constant.API_PATH}store/menu/list?accessToken=${accessToken}`,{
			// 	store : data.store,
			// 	name: data.name
			// })
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