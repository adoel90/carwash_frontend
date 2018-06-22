import axios from 'axios';
import { constant } from '../config';

//GET VENDOR USER LIST
export const GET_VENDOR_USER_LIST_REQUESTED = 'GET_VENDOR_USER_LIST_REQUESTED';
export const GET_VENDOR_USER_LIST_FULFILLED = 'GET_VENDOR_USER_LIST_FULFILLED';
export const GET_VENDOR_USER_LIST_REJECTED = 'GET_VENDOR_USER_LIST_REJECTED';

export const CREATE_NEW_VENDOR_FULFILLED = 'CREATE_NEW_VENDOR_FULFILLED';
export const CREATE_NEW_VENDOR_REJECTED = 'CREATE_NEW_VENDOR_REJECTED';


//#GET STORE LIST
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

export const CHANGE_MENU_STATUS_REQUESTED = 'CHANGE_MENU_STATUS_REQUESTED';
export const CHANGE_MENU_STATUS_FULFILLED = 'CHANGE_MENU_STATUS_FULFILLED';
export const CHANGE_MENU_STATUS_REJECTED = 'CHANGE_MENU_STATUS_REJECTED';

export const CHANGE_EMPLOYEE_STATUS_REQUESTED = 'CHANGE_EMPLOYEE_STATUS_REQUESTED';
export const CHANGE_EMPLOYEE_STATUS_FULFILLED = 'CHANGE_EMPLOYEE_STATUS_FULFILLED';
export const CHANGE_EMPLOYEE_STATUS_REJECTED = 'CHANGE_EMPLOYEE_STATUS_REJECTED';

//#GET REPORT STORE STAFF
export const GET_REPORT_STORE_STAFF_REQUESTED = "GET_REPORT_STORE_STAFF_REQUESTED";
export const GET_REPORT_STORE_STAFF_FULFILLED = "GET_REPORT_STORE_STAFF_FULFILLED";
export const GET_REPORT_STORE_STAFF_REJECTED = "GET_REPORT_STORE_STAFF_REJECTED";

//#GET REPORT STORE STAFF WITH PRINT
export const GET_REPORT_STORE_STAFF_PRINT_REQUESTED = "GET_REPORT_STORE_STAFF_PRINT_REQUESTED";
export const GET_REPORT_STORE_STAFF_PRINT_FULFILLED = "GET_REPORT_STORE_STAFF_PRINT_FULFILLED";
export const GET_REPORT_STORE_STAFF_PRINT_REJECTED = "GET_REPORT_STORE_STAFF_PRINT_REJECTED";

//#GET STORE STAFF REPORT DETAIL 
export const GET_STORE_STAFF_REPORT_DETAIL_REQUESTED = 'GET_STORE_STAFF_REPORT_DETAIL_REQUESTED';
export const GET_STORE_STAFF_REPORT_DETAIL_FULFILLED = 'GET_STORE_STAFF_REPORT_DETAIL_FULFILLED';
export const GET_STORE_STAFF_REPORT_DETAIL_REJECTED = 'GET_STORE_STAFF_REPORT_DETAIL_REJECTED';

//GET STORE MENU REPORT OWNER TRANSACTION DETAIL 
export const GET_STORE_MENU_REPORT_OWNER_DETAIL_REQUESTED = 'GET_STORE_MENU_REPORT_OWNER_DETAIL_REQUESTED';
export const GET_STORE_MENU_REPORT_OWNER_DETAIL_FULFILLED = 'GET_STORE_MENU_REPORT_OWNER_DETAIL_FULFILLED';
export const GET_STORE_MENU_REPORT_OWNER_DETAIL_REJECTED = 'GET_STORE_MENU_REPORT_OWNER_DETAIL_REJECTED';

//GET STORE MENU REPORT OWNER TRANSACTION DETAIL WITH PRINT
export const GET_STORE_MENU_REPORT_OWNER_DETAIL_WITH_PRINT_REQUESTED = 'GET_STORE_MENU_REPORT_OWNER_DETAIL_WITH_PRINT_REQUESTED';
export const GET_STORE_MENU_REPORT_OWNER_DETAIL_WITH_PRINT_FULFILLED = 'GET_STORE_MENU_REPORT_OWNER_DETAIL_WITH_PRINT_FULFILLED';
export const GET_STORE_MENU_REPORT_OWNER_DETAIL_WITH_PRINT_REJECTED = 'GET_STORE_MENU_REPORT_OWNER_DETAIL_WITH_PRINT_REJECTED';

//getStoreMenuReportOwnerWithPrint 

const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;
const userLoginNow = localStorage.getItem('userData') ? localStorage.getItem('userData') : null;
const whoIsLoginNow = JSON.parse(userLoginNow);


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

//GET LIST MENU VENDOR || GET STORE LIST
export const getStoreList = (data) => {

	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}store/list?accessToken=${accessToken}&id=${whoIsLoginNow.id}`)
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

		const formData = new FormData();
		formData.append("id", data.id);
		formData.append('name', data.name);
		formData.append("description", data.description);
		formData.append("price", data.price);
		formData.append("image", data.image);
		formData.append("category", data.category);

		return axios
			.put(`${constant.API_PATH}store/menu/update?accessToken=${accessToken}`, formData)
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


//GET LIST VENDOR EMPLOYEE  || employee --state
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

	console.log(data);

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

export const changeMenuStatus = (data) => {
	return async dispatch => {
		dispatch(handleRequest(data.id));

		axios
			.put(`${constant.API_PATH}store/menu/status?accessToken=${accessToken}`, {
				id: data.id
			})
			.then((response) => {
				dispatch(handleSuccess(response.data, data.id))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleRequest(id) { return { type: CHANGE_MENU_STATUS_REQUESTED, id: id}}
	function handleSuccess(data, id) { return { type: CHANGE_MENU_STATUS_FULFILLED, payload: data, id: id } }
	function handleError(data) { return { type: CHANGE_MENU_STATUS_REJECTED, payload: data } }
}

export const changeEmployeeStatus = (data) => {
	return async dispatch => {
		dispatch(handleRequest(data.id));

		axios
			.put(`${constant.API_PATH}store/staff/status?accessToken=${accessToken}`, {
				id: data.id
			})
			.then((response) => {
				dispatch(handleSuccess(response.data, data.id))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleRequest(id) { return { type: CHANGE_EMPLOYEE_STATUS_REQUESTED, id: id}}
	function handleSuccess(data, id) { return { type: CHANGE_EMPLOYEE_STATUS_FULFILLED, payload: data, id: id } }
	function handleError(data) { return { type: CHANGE_EMPLOYEE_STATUS_REJECTED, payload: data } }
}

//#GET REPORT STORE STAFF
export const getStoreStaffReport = (data) => {
	console.log(data);

	// return {
	// 	type: null
	// }

	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			// .get(`${constant.API_PATH}store/staff/report?accessToken=${accessToken}&staff=${data.staff}&store=${data.store}&start_date=${data.start_date}&end_date=${data.end_date}&print=${data.print}`)
			.get(`${constant.API_PATH}store/staff/report?accessToken=${accessToken}&staff=${data.staff}&store=${data.store}&start_date=${data.start_date}&end_date=${data.end_date}`)
			.then((response) => {
				dispatch(fetchSuccess(response));
			})
			.catch((error) => {
				dispatch(fetchError(error));
			})
	}

	function fetchRequest() { return { type: GET_REPORT_STORE_STAFF_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_REPORT_STORE_STAFF_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_REPORT_STORE_STAFF_REJECTED, payload: data } }
}

//#GET REPORT STORE STAFF WITH PRINT
export const getStoreStaffReportWithPrint = (data) => {
	console.log(data);

	// return {
	// 	type: null
	// }

	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}store/staff/report?accessToken=${accessToken}&staff=${data.staff}&store=${data.store}&start_date=${data.start_date}&end_date=${data.end_date}&print=${data.print}`)
			// .get(`${constant.API_PATH}store/staff/report?accessToken=${accessToken}&staff=${data.staff}&store=${data.store}&start_date=${data.start_date}&end_date=${data.end_date}`)
			.then((response) => {
				// dispatch(fetchSuccess(response));
				window.open(`${constant.API_PATH}store/staff/report?accessToken=${accessToken}&staff=${data.staff}&store=${data.store}&start_date=${data.start_date}&end_date=${data.end_date}&print=${data.print}`, '_blank');

			})
			.catch((error) => {
				dispatch(fetchError(error));
			})
	}

	function fetchRequest() { return { type: GET_REPORT_STORE_STAFF_PRINT_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_REPORT_STORE_STAFF_PRINT_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_REPORT_STORE_STAFF_PRINT_REJECTED, payload: data } }
}
 
//#GET STORE STAFF REPORT DETAIL || reportDetailStoreStaff -- state
export const getStoreStaffReportDetailAyoTail = (data) => {
	// console.log(data);

	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			// .get(`${constant.API_PATH}store/staff/report/detail?accessToken=${accessToken}&id=${data.id}&staff=${data.staff}&store=${data.store}&start_date=${data.start_date}&end_date=${data.end_date}&print=${data.print}`)
			.get(`${constant.API_PATH}store/staff/report/detail?accessToken=${accessToken}&id=${data.id}&start_date=${data.start_date}&end_date=${data.end_date}`)
			.then((response) => {
				dispatch(fetchSuccess(response.data));
			})
			.catch((error) => {
				dispatch(fetchError(error));
			})
	}

	function fetchRequest() { return { type: GET_STORE_STAFF_REPORT_DETAIL_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_STORE_STAFF_REPORT_DETAIL_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_STORE_STAFF_REPORT_DETAIL_REJECTED, payload: data } }
}

//GET STORE MENU REPORT OWNER TRANSACTION DETAIL || reportDetailStoreMenuOwner -- state
export const getStoreMenuReportOwner = (data) => {
	
	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}store/report/transactions/item?accessToken=${accessToken}&store=${data.store}&start_date=${data.start_date}&end_date=${data.end_date}`)
			.then((response) => {
				dispatch(fetchSuccess(response.data));
				
			})
			.catch((error) => {
				dispatch(fetchError(error));
			})
	}

	function fetchRequest() { return { type: GET_STORE_MENU_REPORT_OWNER_DETAIL_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_STORE_MENU_REPORT_OWNER_DETAIL_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_STORE_MENU_REPORT_OWNER_DETAIL_REJECTED, payload: data } }
}

////GET STORE MENU REPORT OWNER TRANSACTION DETAIL WITH PRINT || reportDetailStoreMenuOwnerPrint --state
export const getStoreMenuReportOwnerWithPrint = (data) => {
	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}store/report/transactions/item?accessToken=${accessToken}&store=${data.store}&start_date=${data.start_date}&end_date=${data.end_date}&print=${data.print}`)
			.then((response) => {
				window.open(`${constant.API_PATH}store/report/transactions/item?accessToken=${accessToken}&store=${data.store}&start_date=${data.start_date}&end_date=${data.end_date}&print=${data.print}`, '_blank');
				// dispatch(fetchSuccess(response.data));
			})
			.catch((error) => {
				dispatch(fetchSuccess(error));
			})
	}

	function fetchRequest() { return { type: GET_STORE_MENU_REPORT_OWNER_DETAIL_WITH_PRINT_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_STORE_MENU_REPORT_OWNER_DETAIL_WITH_PRINT_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_STORE_MENU_REPORT_OWNER_DETAIL_WITH_PRINT_REJECTED, payload: data } }	
}