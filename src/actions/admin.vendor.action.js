import axios from 'axios';
import { constant } from '../config';

export const GET_ADMIN_VENDOR_LIST_REQUESTED = 'GET_ADMIN_VENDOR_LIST_REQUESTED';
export const GET_ADMIN_VENDOR_LIST_FULFILLED = 'GET_ADMIN_VENDOR_LIST_FULFILLED';
export const GET_ADMIN_VENDOR_LIST_REJECTED = 'GET_ADMIN_VENDOR_LIST_REJECTED';

export const CREATE_NEW_ADMIN_VENDOR_FULFILLED = 'CREATE_NEW_ADMIN_VENDOR_FULFILLED';
export const CREATE_NEW_ADMIN_VENDOR_REJECTED = 'CREATE_NEW_ADMIN_VENDOR_REJECTED';

const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;

export const getAdminVendorList = (data) => {

	
	return async dispatch => {
        
		dispatch(fetchRequest());
		return axios
    
            .get(`${constant.API_PATH}vendor/list?accessToken=${accessToken}`)
			.then((response) => {
				dispatch(fetchSuccess(response));
			})
			.catch((error) => {
				dispatch(fetchError(error));
			})
	}

	function fetchRequest() { return { type: GET_ADMIN_VENDOR_LIST_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_ADMIN_VENDOR_LIST_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_ADMIN_VENDOR_LIST_REJECTED, payload: data } }
}

export const createNewAdminVendor = (data) => {


	console.log("Data From vendor.action.js : " + data);

	return async dispatch => {
		return axios
	
			.post(`${constant.API_PATH}vendor/create?accessToken=${accessToken}`, {
				

				cafe_name: data.cafe_name,
                fullname: data.fullname,
                email: data.email,
                username: data.username,
                password: data.password
			})
			.then((response) => {
				dispatch(createSuccess(response));

				console.log("From vendorLogin.action.js" + response);
				
			})
			.catch((error) => {
				dispatch(createError(error))
			})
	}

	function createSuccess(data) {
		return {
			type: CREATE_NEW_ADMIN_VENDOR_FULFILLED,
			payload: data
		}
	}

	function createError(data) {
		return {
			type: CREATE_NEW_ADMIN_VENDOR_REJECTED,
			payload: data
		}
	}
}
