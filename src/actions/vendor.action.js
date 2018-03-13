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

//#GET LIST MENU VENDOR
export const GET_MENU_VENDOR_LIST_REQUESTED = 'GET_MENU_VENDOR_LIST_REQUESTED';
export const GET_MENU_VENDOR_LIST_FULFILLED = 'GET_MENU_VENDOR_LIST_FULFILLED';
export const GET_MENU_VENDOR_LIST_REJECTED = 'GET_MENU_VENDOR_LIST_REJECTED';

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

//GET LIST REPORT VENDOR
// export const GET_REPORT_VENDOR_LIST_REQUESTED = 'GET_REPORT_VENDOR_LIST_REQUESTED';
// export const GET_REPORT_VENDOR_LIST_FULFILLED = 'GET_REPORT_VENDOR_LIST_FULFILLED';
// export const GET_REPORT_VENDOR_LIST_REJECTED = 'GET_REPORT_VENDOR_LIST_REJECTED';

const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;
const userLoginNow = localStorage.getItem('userData') ? localStorage.getItem('userData') : null;
const dataVendorLoginNow = JSON.parse(userLoginNow);
// console.log(dataVendorLoginNow);


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

//UPDATE MENU VENDOR
export const updateMenuVendor = (data) =>{

	// console.log(data);
	return async dispatch => {

		dispatch(fetchRequest());

		return axios
    
			// /vendor/menu/update?accessToken={accessToken} 	
			.put(`${constant.API_PATH}vendor/menu/update?accessToken=${accessToken}`, {
				id: data.id,
				name: data.name,
				description: data.description,
				price: data.price,				
				cafe: data.cafe
			})
			.then((response) => {
				dispatch(fetchSuccess(response));
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

//UPDATE VENDOR EMPLOYEE
export const updateVendorEmployee = (data) => {

	return async dispatch => {

		dispatch(fetchRequest());

		return axios	

			.put(`${constant.API_PATH}vendor/employee/update?accessToken=${accessToken}`, {
				id : data.id,
                name: data.name,
                email: data.email,
                access: data.access ,
                password: data.password
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



//GET LIST REPORT VENDOR
// export const getVendorReportList = (data) => {

// 	return async dispatch => {

// 		dispatch(fetchRequest());
// 		return axios
// 			// .get(`${constant.API_PATH}dashboard/graph?accessToken=${accessToken}&type=${data.type}&start_date=${data.start_date}&end_date=${data.end_date}&company=${data.company}`)
// 			.get(`${constant.API_PATH}vendor/report?accessToken=${accessToken}&type=&start_date=2018-12-01&end_date=2018-01-30&cafe=${dataVendorLoginNow.vendor}`)
// 			.then((response) => {
// 				dispatch(fetchSuccess(response));
// 			})
// 			.catch((error) => {
// 				dispatch(fetchError(error));
// 			})
// 	}

// 	function fetchRequest() { return { type: GET_REPORT_VENDOR_LIST_REQUESTED } }
// 	function fetchSuccess(data) { return { type: GET_REPORT_VENDOR_LIST_FULFILLED, payload: data } }
// 	function fetchError(data) { return { type: GET_REPORT_VENDOR_LIST_REJECTED, payload: data } }
// }
