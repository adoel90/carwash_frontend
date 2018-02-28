import axios from 'axios';
import { constant } from '../config';

export const GET_VENDOR_USER_LIST_REQUESTED = 'GET_VENDOR_USER_LIST_REQUESTED';
export const GET_VENDOR_USER_LIST_FULFILLED = 'GET_VENDOR_USER_LIST_FULFILLED';
export const GET_VENDOR_USER_LIST_REJECTED = 'GET_VENDOR_USER_LIST_REJECTED';

export const CREATE_NEW_VENDOR_FULFILLED = 'CREATE_NEW_VENDOR_FULFILLED';
export const CREATE_NEW_VENDOR_REJECTED = 'CREATE_NEW_VENDOR_REJECTED';

//GET Vendor Detail
export const GET_VENDOR_DETAIL_REQUESTED = 'GET_VENDOR_DETAIL_REQUESTED';
export const GET_VENDOR_DETAIL_FULFILLED = 'GET_VENDOR_DETAIL_FULFILLED';
export const GET_VENDOR_DETAIL_REJECTED = 'GET_VENDOR_DETAIL_REJECTED';

//#GET LIST MENU VENDOR
export const GET_MENU_VENDOR_LIST_REQUESTED = 'GET_MENU_VENDOR_LIST_REQUESTED';
export const GET_MENU_VENDOR_LIST_FULFILLED = 'GET_MENU_VENDOR_LIST_FULFILLED';
export const GET_MENU_VENDOR_LIST_REJECTED = 'GET_MENU_VENDOR_LIST_REJECTED';

//#Get List Vendor Employee 
export const GET_EMPLOYEE_VENDOR_LIST_REQUESTED = 'GET_EMPLOYEE_VENDOR_LIST_REQUESTED';
export const GET_EMPLOYEE_VENDOR_LIST_FULFILLED = 'GET_EMPLOYEE_VENDOR_LIST_FULFILLED';
export const GET_EMPLOYEE_VENDOR_LIST_REJECTED = 'GET_EMPLOYEE_VENDOR_LIST_REJECTED';

const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;
const userLoginNow = localStorage.getItem('userData') ? localStorage.getItem('userData') : null;
const dataVendorLoginNow = JSON.parse(userLoginNow);

export const getVendorUserList = (data) => {
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

	function fetchRequest() { return { type: GET_VENDOR_USER_LIST_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_VENDOR_USER_LIST_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_VENDOR_USER_LIST_REJECTED, payload: data } }
}

export const createNewVendor = (data) => {

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
				
			})
			.catch((error) => {
				dispatch(createError(error))
			})
	}

	function createSuccess(data) {
		return {
			type: CREATE_NEW_VENDOR_FULFILLED,
			payload: data
		}
	}

	function createError(data) {
		return {
			type: CREATE_NEW_VENDOR_REJECTED,
			payload: data
		}
	}
}

//GET Vendor Detail
export const getVendorDetail = (data) => {
	return async dispatch => {
		dispatch(fetchRequest());
		return axios
            // .get(`${constant.API_PATH}vendor/employee/detail?accessToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywibmFtZSI6IkFuZHJlIFJpemtpYW5hIFdhbmRpcmEiLCJ1c2VybmFtZSI6ImFuZHJlcnciLCJlbWFpbCI6ImFuZHJlci5yaXpraWFuYS53QGdtYWlsLmNvbSIsInZlbmRvciI6MjksImFjY2VzcyI6eyJjb2RlIjowLCJuYW1lIjoiQWRtaW4ifSwic3RhdHVzIjp0cnVlfQ.9tgN_WWjZ-uUJOLvH-Enu5muz_kUDFgV58WhcRjUv58&id=3`)
            .get(`${constant.API_PATH}vendor/employee/detail?accessToken=${accessToken}&id=${dataVendorLoginNow.id}`)
			.then((response) => {
				dispatch(fetchSuccess(response));			
			})
			.catch((error) => {
				dispatch(fetchError(error));
			})
	}

	function fetchRequest() { return { type: GET_VENDOR_DETAIL_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_VENDOR_DETAIL_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_VENDOR_DETAIL_REJECTED, payload: data } }
}


//GET LIST MENU VENDOR
export const getMenuVendorList = (data) => {

	return async dispatch => {

		dispatch(fetchRequest());
		return axios
    
			// .get(`${constant.API_PATH}vendor/menu?accessToken=${accessToken}&cafe=29`)
			.get(`${constant.API_PATH}vendor/menu?accessToken=${accessToken}&cafe=${dataVendorLoginNow.vendor}`)
			.then((response) => {
				dispatch(fetchSuccess(response));
			})
			.catch((error) => {
				dispatch(fetchError(error));
			})
	}

	function fetchRequest() { return { type: GET_MENU_VENDOR_LIST_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_MENU_VENDOR_LIST_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_MENU_VENDOR_LIST_REJECTED, payload: data } }
}


//Get List Vendor Employee 
export const getVendorEmployeeList = (data) => {

	return async dispatch => {

		dispatch(fetchRequest());
		return axios
    
			// .get(`${constant.API_PATH}vendor/menu?accessToken=${accessToken}&cafe=29`)
			// .get(`${constant.API_PATH}vendor/menu?accessToken=${accessToken}&cafe=${dataVendorLoginNow.vendor}`)
			.get(`${constant.API_PATH}vendor/employee/list?accessToken=${accessToken}&cafe=${dataVendorLoginNow.vendor}`)
			.then((response) => {
				dispatch(fetchSuccess(response));
			})
			.catch((error) => {
				dispatch(fetchError(error));
			})
	}

	function fetchRequest() { return { type: GET_EMPLOYEE_VENDOR_LIST_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_EMPLOYEE_VENDOR_LIST_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_EMPLOYEE_VENDOR_LIST_REJECTED, payload: data } }
}