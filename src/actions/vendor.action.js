import axios from 'axios';
import { constant } from '../config';

//GET VENDOR USER LIST
export const GET_VENDOR_USER_LIST_REQUESTED = 'GET_VENDOR_USER_LIST_REQUESTED';
export const GET_VENDOR_USER_LIST_FULFILLED = 'GET_VENDOR_USER_LIST_FULFILLED';
export const GET_VENDOR_USER_LIST_REJECTED = 'GET_VENDOR_USER_LIST_REJECTED';

export const CREATE_NEW_VENDOR_FULFILLED = 'CREATE_NEW_VENDOR_FULFILLED';
export const CREATE_NEW_VENDOR_REJECTED = 'CREATE_NEW_VENDOR_REJECTED';

//GET VENDOR DETAIL
export const GET_VENDOR_DETAIL_REQUESTED = 'GET_VENDOR_DETAIL_REQUESTED';
export const GET_VENDOR_DETAIL_FULFILLED = 'GET_VENDOR_DETAIL_FULFILLED';
export const GET_VENDOR_DETAIL_REJECTED = 'GET_VENDOR_DETAIL_REJECTED';

//#GET LIST MENU VENDOR || GET STORE LIST
export const GET_STORE_LIST_REQUESTED = 'GET_STORE_LIST_REQUESTED';
export const GET_STORE_LIST_FULFILLED = 'GET_STORE_LIST_FULFILLED';
export const GET_STORE_LIST_REJECTED = 'GET_STORE_LIST_REJECTED';

//#UPDATE MENU VENDOR
export const UPDATE_MENU_VENDOR_REQUESTED = 'UPDATE_MENU_VENDOR_REQUESTED';
export const UPDATE_MENU_VENDOR_FULFILLED = 'UPDATE_MENU_VENDOR_FULFILLED';
export const UPDATE_MENU_VENDOR_REJECTED = 'UPDATE_MENU_VENDOR_REJECTED';


//#GET LIST VENDOR EMPLOYEE  
export const GET_EMPLOYEE_VENDOR_LIST_REQUESTED = 'GET_EMPLOYEE_VENDOR_LIST_REQUESTED';
export const GET_EMPLOYEE_VENDOR_LIST_FULFILLED = 'GET_EMPLOYEE_VENDOR_LIST_FULFILLED';
export const GET_EMPLOYEE_VENDOR_LIST_REJECTED = 'GET_EMPLOYEE_VENDOR_LIST_REJECTED';

//#UPDATE VENDOR EMPLOYEE
export const UPDATE_VENDOR_EMPLOYEE_REQUESTED = 'UPDATE_VENDOR_EMPLOYEE_REQUESTED';
export const UPDATE_VENDOR_EMPLOYEE_FULFILLED = 'UPDATE_VENDOR_EMPLOYEE_FULFILLED';
export const UPDATE_VENDOR_EMPLOYEE_REJECTED = 'UPDATE_VENDOR_EMPLOYEE_REJECTED';

//#GET MENU STORE LIST
export const GET_MENU_STORE_LIST_REQUESTED = "GET_MENU_STORE_LIST_REQUESTED";
export const GET_MENU_STORE_LIST_FULFILLED = "GET_MENU_STORE_LIST_FULFILLED";
export const GET_MENU_STORE_LIST_REJECTED = "GET_MENU_STORE_LIST_REJECTED";

const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;
const userLoginNow = localStorage.getItem('userData') ? localStorage.getItem('userData') : null;
const dataVendorLoginNow = JSON.parse(userLoginNow);


//GET VENDOR USER LIST
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

//GET VENDOR DETAIL
export const getVendorDetail = (data) => {

	return {
		type: null
	}

}

//GET LIST MENU VENDOR || GET STORE LIST
// export const getStoreList = (data) => {
export const getStoreList = (data) => {
	
	return async dispatch => {

		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}store/list?accessToken=${accessToken}&id=${dataVendorLoginNow.id}`)
			// .get(`${constant.API_PATH}store/list?accessToken=${accessToken}`)
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

//UPDATE MENU VENDOR
export const updateMenuVendor = (data) =>{

	return async dispatch => {

		dispatch(fetchRequest());

		return axios

			.put(`${constant.API_PATH}store/menu/update?accessToken=${accessToken}`, {
				id: data.id,
				name: data.name,
				description: data.description,
				price: data.price,
				image:data.image			
			})
			.then((response) => {
				dispatch(fetchSuccess(response.data));
			})
			.catch((error) => {
				dispatch(fetchError(error));
			})
			
	}

	function fetchRequest() { return { type: UPDATE_MENU_VENDOR_REQUESTED } }
	function fetchSuccess(data) { return { type: UPDATE_MENU_VENDOR_FULFILLED, payload: data } }
	function fetchError(data) { return { type: UPDATE_MENU_VENDOR_REJECTED, payload: data } }
}


//GET LIST VENDOR EMPLOYEE 
export const getVendorEmployeeList = (data) => {

	return async dispatch => {

		dispatch(fetchRequest());
		return axios

			.get(`${constant.API_PATH}store/staff/list?accessToken=${accessToken}&id=${data.id}`)
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

//UPDATE VENDOR EMPLOYEE
export const updateVendorEmployee = (data) => {

	return async dispatch => {
		dispatch(fetchRequest());

		return axios	

			// .put(`${constant.API_PATH}vendor/employee/update?accessToken=${accessToken}`, {
			.put(`${constant.API_PATH}store/staff/update?accessToken=${accessToken}`, {
				id : data.id,
				name: data.name,
				username: data.username,
				password: data.password,
				email: data.email,
				level: data.level

			})
			.then((response) => {
				dispatch(fetchSuccess(response));
			})
			.catch((error) => {
				dispatch(fetchError(error));
			})			
	}

	function fetchRequest() { return { type: UPDATE_VENDOR_EMPLOYEE_REQUESTED } }
	function fetchSuccess(data) { return { type: UPDATE_VENDOR_EMPLOYEE_FULFILLED, payload: data } }
	function fetchError(data) { return { type: UPDATE_VENDOR_EMPLOYEE_REJECTED, payload: data } }
}

//#GET MENU STORE LIST
export const getMenuStoreList = (data) => {

	return async dispatch => {

		dispatch(fetchRequest());
		return axios
		
			.get(`${constant.API_PATH}store/menu/list?accessToken=${accessToken}&store=${data.id}`)
			.then((response) => {
				dispatch(fetchSuccess(response));
			})
			.catch((error) => {
				dispatch(fetchError(error));
			})
	}

	function fetchRequest() { return { type: GET_MENU_STORE_LIST_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_MENU_STORE_LIST_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_MENU_STORE_LIST_REJECTED, payload: data } }
	
}


