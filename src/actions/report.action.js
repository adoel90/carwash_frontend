import axios from 'axios';
import { constant } from '../config';

export const GET_SALES_REPORT_REQUESTED = 'GET_SALES_REPORT_REQUESTED';
export const GET_SALES_REPORT_FULFILLED = 'GET_SALES_REPORT_FULFILLED';
export const GET_SALES_REPORT_REJECTED = 'GET_SALES_REPORT_REJECTED';
export const GET_TRANSACTION_REPORT_REQUESTED = 'GET_TRANSACTION_REPORT_REQUESTED';
export const GET_TRANSACTION_REPORT_FULFILLED = 'GET_TRANSACTION_REPORT_FULFILLED';
export const GET_TRANSACTION_REPORT_REJECTED = 'GET_TRANSACTION_REPORT_REJECTED';

export const GET_REPORT_MEMBER_LIST_REQUESTED = 'GET_REPORT_MEMBER_LIST_REQUESTED';
export const GET_REPORT_MEMBER_LIST_FULFILLED = 'GET_REPORT_MEMBER_LIST_FULFILLED';
export const GET_REPORT_MEMBER_LIST_REJECTED = 'GET_REPORT_MEMBER_LIST_REJECTED';

const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;

export const getSalesReport = (data, accessToken) => {
	return async dispatch => {
		dispatch(handleRequest());

		return axios
			.get(`${constant.API_PATH}report/summary/${data.type}?accessToken=${accessToken}&start_date=${data.start_date}&end_date=${data.end_date}`)
			.then((response) => {
				dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleRequest() { return { type: GET_SALES_REPORT_REQUESTED } }
	function handleSuccess(data) { return { type: GET_SALES_REPORT_FULFILLED, payload: data } }
	function handleError(data) { return { type: GET_SALES_REPORT_REJECTED, payload: data} }
}

export const getTransactionReport = (data, accessToken) => {
	return async dispatch => {

		dispatch(handleRequest());

		return axios
			.get(`${constant.API_PATH}report/transaction/${data.type}?accessToken=${accessToken}&start_date=${data.start_date}&end_date=${data.end_date}`)
			.then((response) => {
				dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleRequest() {
		return { type: GET_TRANSACTION_REPORT_REQUESTED }
	}

	function handleSuccess(data) {
		return {
			type: GET_TRANSACTION_REPORT_FULFILLED,
			payload: data
		}
	}

	function handleError(data) {
		return {
			type: GET_TRANSACTION_REPORT_REJECTED,
			payload: data
		}
	}
}

export const getReportMemberList = (data) => {
	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}report/member/list?accessToken=${accessToken}&start_date=${data.start_date}&end_date=${data.end_date}`)
			.then((response) => {
				dispatch(fetchSuccess(response.data));
			})
			.catch((error) => {
				dispatch(fetchSuccess(error));
			})
	}

	function fetchRequest() { return { type: GET_REPORT_MEMBER_LIST_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_REPORT_MEMBER_LIST_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_REPORT_MEMBER_LIST_REJECTED, payload: data } }
}