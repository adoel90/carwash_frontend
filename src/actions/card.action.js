import axios from 'axios';
import { constant } from '../config';

export const GET_CARD_TYPE_LIST_REQUESTED = 'GET_CARD_TYPE_LIST_REQUESTED';
export const GET_CARD_TYPE_LIST_FULFILLED = 'GET_CARD_TYPE_LIST_FULFILLED';
export const GET_CARD_TYPE_LIST_REJECTED = 'GET_CARD_TYPE_LIST_REJECTED';
export const GET_ALL_CARD_TYPE_REQUESTED = 'GET_ALL_CARD_TYPE_REQUESTED';
export const GET_ALL_CARD_TYPE_FULFILLED = 'GET_ALL_CARD_TYPE_FULFILLED';
export const GET_ALL_CARD_TYPE_REJECTED = 'GET_ALL_CARD_TYPE_REJECTED';
export const CREATE_CARD_TYPE_FULFILLED = 'CREATE_CARD_TYPE_FULFILLED';
export const CREATE_CARD_TYPE_REJECTED = 'CREATE_CARD_TYPE_REJECTED';
export const UPDATE_CARD_TYPE_FULFILLED = 'UPDATE_CARD_TYPE_FULFILLED';
export const UPDATE_CARD_TYPE_REJECTED = 'UPDATE_CARD_TYPE_REJECTED';
export const CHANGE_CARD_TYPE_STATUS_REQUESTED = 'CHANGE_CARD_TYPE_STATUS_REQUESTED';
export const CHANGE_CARD_TYPE_STATUS_FULFILLED = 'CHANGE_CARD_TYPE_STATUS_FULFILLED';
export const CHANGE_CARD_TYPE_STATUS_REJECTED = 'CHANGE_CARD_TYPE_STATUS_REJECTED';
export const DELETE_CARD_TYPE_FULFILLED = 'DELETE_CARD_TYPE_FULFILLED';
export const DELETE_CARD_TYPE_REJECTED = 'DELETE_CARD_TYPE_REJECTED';

export const REMOVE_MEMBER_REQUESTED = 'REMOVE_MEMBER_REQUESTED'; //#REMOVE MEMBER 
export const REMOVE_MEMBER_FULFILLED = 'REMOVE_MEMBER_FULFILLED'; 
export const REMOVE_MEMBER_REJECTED = 'REMOVE_MEMBER_REJECTED';

//GET NOMINAL SALDO NEW CUSTOMER
export const GET_NOMINAL_SALDO_NEW_CUSTOMER_REQUESTED = 'GET_NOMINAL_SALDO_NEW_CUSTOMER_REQUESTED'; 
export const GET_NOMINAL_SALDO_NEW_CUSTOMER_FULFILLED = 'GET_NOMINAL_SALDO_NEW_CUSTOMER_FULFILLED';
export const GET_NOMINAL_SALDO_NEW_CUSTOMER_REJECTED = 'GET_NOMINAL_SALDO_NEW_CUSTOMER_REJECTED';

//#Create Stock List New Card
export const CREATE_STOCK_LIST_NEW_CARD_FULFILLED = 'CREATE_STOCK_LIST_NEW_CARD_FULFILLED';
export const CREATE_STOCK_LIST_NEW_CARD_REJECTED = 'CREATE_STOCK_LIST_NEW_CARD_REJECTED';

const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;

export const getCardTypeList = (data) => {
	return async dispatch => {

		dispatch(handleRequest());

		return axios
			.get(`${constant.API_PATH}card/type/list?accessToken=${accessToken}`)
			.then((response) => {
				dispatch(handleSuccess(response.data));
			})
			.catch((error) => {
				dispatch(handleError(error));
			})
	}

	function handleRequest() { return { type: GET_ALL_CARD_TYPE_REQUESTED } }
	function handleSuccess(data) { return { type: GET_ALL_CARD_TYPE_FULFILLED, payload: data} }
	function handleError(data) { return { type: GET_ALL_CARD_TYPE_REJECTED, payload: data} }
}

export const getAllCardType = (data) => {
	return async dispatch => {
		return axios
			.get(`${constant.API_PATH}card/type?accessToken=${accessToken}`)
			.then((response) => {
				// dispatch(handleSuccess(response.data))
				dispatch(handleSuccess(response.data))
			
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleRequest() { return { type: GET_ALL_CARD_TYPE_REQUESTED } }
	function handleSuccess(data, id) { return { type: GET_ALL_CARD_TYPE_FULFILLED, payload: data} }
	function handleError(data) { return { type: GET_ALL_CARD_TYPE_REJECTED, payload: data} }
};

export const createNewCardType = (data) => {
	return async dispatch => {
		return axios
			.post(`${constant.API_PATH}card/type/create?accessToken=${accessToken}`, {
				name: data.name,
				minimum: data.minimum,
				bonus: data.bonus,
				refund: data.refund
			})
			.then((response) => {
				dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleSuccess(data) { return { type: CREATE_CARD_TYPE_FULFILLED, payload: data}}
	function handleError(data) { return { type: CREATE_CARD_TYPE_REJECTED, payload: data}}
}

export const updateCardType = (data) => {
	return async dispatch => {
		return axios
			.put(`${constant.API_PATH}card/type/update?accessToken=${accessToken}`, {
				id: data.id,
				name: data.name,
				minimum: data.min,
				bonus: data.bonus,
				refund: data.refund,
				charge: data.charge
			})
			.then((response) => {
				return Promise.resolve(dispatch(handleSuccess(response.data)))
			})
			.catch((error) => {
				return Promise.resolve(dispatch(handleError(error)))
			})
	}

	function handleSuccess(data) { return { type: UPDATE_CARD_TYPE_FULFILLED, payload: data}}
	function handleError(data) { return { type: UPDATE_CARD_TYPE_REJECTED, payload: data}}
}

export const changeCardTypeStatus = (data) => {
	return async dispatch => {
		dispatch(handleRequest(data.id));

		return axios
			.put(`${constant.API_PATH}card/type/status?accessToken=${accessToken}`, {
				id: data.id
			})
			.then((response) => {
				return dispatch(handleSuccess(response.data, data.id))
			})
			.catch((error) => {
				return dispatch(handleError(error, data.id))
			})
	}

	function handleRequest(id) { return { type: CHANGE_CARD_TYPE_STATUS_REQUESTED, id: id } }
	function handleSuccess(data, id) { return { type: CHANGE_CARD_TYPE_STATUS_FULFILLED, id: id, payload: data} }
	function handleError(data, id) { return { type: CHANGE_CARD_TYPE_STATUS_REJECTED, id: id, payload: data} }
}

export const deleteCardType = (data) => {
	return async dispatch => {
		return axios
			.put(`${constant.API_PATH}card/type/delete?accessToken=${accessToken}`, {
				id: data.id
			})
			.then((response) => {
				return Promise.resolve(dispatch(handleSuccess(response.data)))
			})
			.catch((error) => {
				return Promise.resolve(dispatch(handleError(error)))
			})
	}

	function handleSuccess(data) { return { type: DELETE_CARD_TYPE_FULFILLED, payload: data}}
	function handleError(data) { return { type: DELETE_CARD_TYPE_REJECTED, payload: data}}
}


//#Create Stock List New Card
export const getStockListNewCard = (data) => {

	return async dispatch => {
		return axios 
			.get(`${constant.API_PATH}card/list/generate/id?type=${data.id}&accessToken=${accessToken}`)
			.then((response) => {
				dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleSuccess(data) { return { type: CREATE_STOCK_LIST_NEW_CARD_FULFILLED, payload: data}}
	function handleError(data) { return { type: CREATE_STOCK_LIST_NEW_CARD_REJECTED, payload: data}}

};


/*
//  REMOVE MEMBER DELETE
//  Calls the API to get `accessToken` required to access the app.
*/

export const featureRemoveMember = (data) => {

	return async dispatch => {
		return axios
			.put(`${constant.API_PATH}member/remove?accessToken=${accessToken}`)
			.then((response) => {
				return dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				return dispatch(handleError(error))
			})
	}

	function handleRequest() { return { type: REMOVE_MEMBER_REQUESTED } }
	function handleSuccess(data) { return { type: REMOVE_MEMBER_FULFILLED, payload: data} }
	function handleError(data) { return { type: REMOVE_MEMBER_REJECTED, payload: data} }
};

//GET NOMINAL SALDO NEW CUSTOMER
export const getNominalSaldoNewCustomer = (data) => {

	return async dispatch => {

		dispatch(getRequest());

		return axios
		
			.get(`${constant.API_PATH}saldo/list?accessToken=${accessToken}`)
			.then((response) => {
				dispatch(getSuccess(response.data));
			})
			.catch((error) => {
				dispatch(getError(error));
			})
	}

	function getRequest() { return { type: GET_NOMINAL_SALDO_NEW_CUSTOMER_REQUESTED } }
	function getSuccess(data) { return { type: GET_NOMINAL_SALDO_NEW_CUSTOMER_FULFILLED, payload: data } }
	function getError(data) { return { type: GET_NOMINAL_SALDO_NEW_CUSTOMER_REJECTED, payload: data } }
}