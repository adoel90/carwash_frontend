import axios from 'axios';
import { constant } from '../config';

export const GET_SALES_REPORT_REQUESTED = 'GET_SALES_REPORT_REQUESTED';
export const GET_SALES_REPORT_FULFILLED = 'GET_SALES_REPORT_FULFILLED';
export const GET_SALES_REPORT_REJECTED = 'GET_SALES_REPORT_REJECTED';
export const GET_TRANSACTION_REPORT_REQUESTED = 'GET_TRANSACTION_REPORT_REQUESTED';
export const GET_TRANSACTION_REPORT_FULFILLED = 'GET_TRANSACTION_REPORT_FULFILLED';
export const GET_TRANSACTION_REPORT_REJECTED = 'GET_TRANSACTION_REPORT_REJECTED';

//#GET REPORT MEMBER WITH EXPORT TO EXCELL
export const GET_REPORT_MEMBER_LIST_REQUESTED = 'GET_REPORT_MEMBER_LIST_REQUESTED';
export const GET_REPORT_MEMBER_LIST_FULFILLED = 'GET_REPORT_MEMBER_LIST_FULFILLED';
export const GET_REPORT_MEMBER_LIST_REJECTED = 'GET_REPORT_MEMBER_LIST_REJECTED';

export const GET_REPORT_MEMBER_GRAPH_REQUESTED = 'GET_REPORT_MEMBER_GRAPH_REQUESTED';
export const GET_REPORT_MEMBER_GRAPH_FULFILLED = 'GET_REPORT_MEMBER_GRAPH_FULFILLED';
export const GET_REPORT_MEMBER_GRAPH_REJECTED = 'GET_REPORT_MEMBER_GRAPH_REJECTED';

//#GET REPORT OWNER SUPERADMIN LIST REQUESTED
export const GET_REPORT_OWNER_SUPERADMIN_LIST_REQUESTED = 'GET_REPORT_OWNER_SUPERADMIN_LIST_REQUESTED';
export const GET_REPORT_OWNER_SUPERADMIN_LIST_FULFILLED = 'GET_REPORT_OWNER_SUPERADMIN_LIST_FULFILLED';
export const GET_REPORT_OWNER_SUPERADMIN_LIST_REJECTED = 'GET_REPORT_OWNER_SUPERADMIN_LIST_REJECTED';

//#GET REPORT MEMBER SUPERADMIN
export const GET_REPORT_MEMBER_SUPERADMIN_REQUESTED = 'GET_REPORT_MEMBER_SUPERADMIN_REQUESTED';
export const GET_REPORT_MEMBER_SUPERADMIN_FULFILLED = 'GET_REPORT_MEMBER_SUPERADMIN_FULFILLED';
export const GET_REPORT_MEMBER_SUPERADMIN_REJECTED = 'GET_REPORT_MEMBER_SUPERADMIN_REJECTED';

//#GET REPORT MEMBER SUPERADMIN WITH PRINT
export const GET_REPORT_MEMBER_SUPERADMIN_WITH_PRINT_REQUESTED = 'GET_REPORT_MEMBER_SUPERADMIN_WITH_PRINT_REQUESTED';
export const GET_REPORT_MEMBER_SUPERADMIN_WITH_PRINT_FULFILLED = 'GET_REPORT_MEMBER_SUPERADMIN_WITH_PRINT_FULFILLED';
export const GET_REPORT_MEMBER_SUPERADMIN_WITH_PRINT_REJECTED = 'GET_REPORT_MEMBER_SUPERADMIN_WITH_PRINT_REJECTED';




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

//#GET REPORT MEMBER WITH EXPORT TO EXCELL
export const getReportMemberExportToExcell = (data) => {
	
	console.log(data);

	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}report/member/list?accessToken=${accessToken}&start_date=${data.start_date}&end_date=${data.end_date}&convert=${data.convert}`)
			.then((response) => {
				dispatch(fetchSuccess(response.data));
				window.open(`${constant.API_PATH}report/member/list?accessToken=${accessToken}&start_date=${data.start_date}&end_date=${data.end_date}&convert=${data.convert}`, '_blank');
			})
			.catch((error) => {
				dispatch(fetchSuccess(error));
			})
	}

	function fetchRequest() { return { type: GET_REPORT_MEMBER_LIST_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_REPORT_MEMBER_LIST_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_REPORT_MEMBER_LIST_REJECTED, payload: data } }
}

export const getReportMemberGraph = (data) => {
	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}report/member/graph?accessToken=${accessToken}&type=${data.type}&start_date=${data.start_date}&end_date=${data.end_date}`)
			.then((response) => {
				dispatch(fetchSuccess(response.data));
			})
			.catch((error) => {
				dispatch(fetchSuccess(error));
			})
	}

	function fetchRequest() { return { type: GET_REPORT_MEMBER_GRAPH_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_REPORT_MEMBER_GRAPH_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_REPORT_MEMBER_GRAPH_REJECTED, payload: data } }
}

//#GET REPORT OWNER SUPERADMIN LIST REQUESTED || /report/owner?accessToken={accessToken} Get report owner list
export const getReportOwnerSuperAdmin = (data) => {

	console.log(data);

	return async dispatch => {

		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}report/owner?accessToken=${accessToken}&start_date=${data.start_date}&end_date=${data.end_date}`)
			.then((response) => {
				// dispatch(fetchSuccess(response.data));
				dispatch(fetchSuccess(response));
			})
			.catch((error) => {
				dispatch(fetchSuccess(error));
			})
	}

	function fetchRequest() { return { type: GET_REPORT_OWNER_SUPERADMIN_LIST_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_REPORT_OWNER_SUPERADMIN_LIST_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_REPORT_OWNER_SUPERADMIN_LIST_REJECTED, payload: data } }
}

//#GET REPORT MEMBER SUPERADMIN || reportMember -- state
export const getReportMemberSuperAdmin = (data) => {
	
	// console.log(data);

	return async dispatch => {

		dispatch(fetchRequest());

		return axios
			.get(`${constant.API_PATH}report/member/list?accessToken=${accessToken}&start_date=${data.start_date}&end_date=${data.end_date}`)
			.then((response) => {
				dispatch(fetchSuccess(response.data));
				// window.open(`${constant.API_PATH}report/member/list?accessToken=${accessToken}&start_date=${data.start_date}&end_date=${data.end_date}&convert=${data.convert}`, '_blank');
			})
			.catch((error) => {
				dispatch(fetchSuccess(error));
			})
	}

	function fetchRequest() { return { type: GET_REPORT_MEMBER_SUPERADMIN_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_REPORT_MEMBER_SUPERADMIN_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_REPORT_MEMBER_SUPERADMIN_REJECTED, payload: data } }
}

//#GET REPORT MEMBER SUPERADMIN WITH PRINT || reportMemberPrint -state
export const getReportMemberSuperAdminPrint = (data) => {

	console.log(data);

	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}report/member/list?accessToken=${accessToken}&start_date=${data.start_date}&end_date=${data.end_date}&print=${data.print}`)
			.then((response) => {
				dispatch(fetchSuccess(response.data));
				window.open(`${constant.API_PATH}report/member/list?accessToken=${accessToken}&start_date=${data.start_date}&end_date=${data.end_date}&print=${data.print}`, '_blank');
			})
			.catch((error) => {
				dispatch(fetchSuccess(error));
			})
	}

	function fetchRequest() { return { type: GET_REPORT_MEMBER_SUPERADMIN_WITH_PRINT_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_REPORT_MEMBER_SUPERADMIN_WITH_PRINT_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_REPORT_MEMBER_SUPERADMIN_WITH_PRINT_REJECTED, payload: data } }
}
