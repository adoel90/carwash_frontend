import axios from 'axios';
import { constant } from '../config';

//Get List Report Vendor
export const GET_REPORT_VENDOR_LIST_REQUESTED = 'GET_REPORT_VENDOR_LIST_REQUESTED';
export const GET_REPORT_VENDOR_LIST_FULFILLED = 'GET_REPORT_VENDOR_LIST_FULFILLED';
export const GET_REPORT_VENDOR_LIST_REJECTED = 'GET_REPORT_VENDOR_LIST_REJECTED';

const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;
const userLoginNow = localStorage.getItem('userData') ? localStorage.getItem('userData') : null;
const dataVendorLoginNow = JSON.parse(userLoginNow);

//Get List Report Vendor
export const getStoreReportList = (data) => {
	return async dispatch => {

		dispatch(fetchRequest());
		return axios
		
			.get(`${constant.API_PATH}store/report?accessToken=${accessToken}&type=${data.type}&start_date=${data.start_date}&end_date=${data.end_date}&store=${data.storeid.id}`)
			.then((response) => {
				dispatch(fetchSuccess(response));
				// console.log(response);
			})
			.catch((error) => {
				dispatch(fetchError(error));
			})
	}

	function fetchRequest() { return { type: GET_REPORT_VENDOR_LIST_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_REPORT_VENDOR_LIST_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_REPORT_VENDOR_LIST_REJECTED, payload: data } }
}