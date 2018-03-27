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

//CREATE MENU TRANSACTION
export const CREATE_MENU_TRANSACTION_FULFILLED = "CREATE_MENU_TRANSACTION_FULFILLED";
export const CREATE_MENU_TRANSACTION_REJECTED = "CREATE_MENU_TRANSACTION_REJECTED";

//GET PRINT STORE TRANSACTION
export const GET_PRINT_STORE_TRANSACTION_REQUESTED = "GET_PRINT_STORE_TRANSACTION_REQUESTED";
export const GET_PRINT_STORE_TRANSACTION_FULFILLED = "GET_PRINT_STORE_TRANSACTION_FULFILLED";
export const GET_PRINT_STORE_TRANSACTION_REJECTED = "GET_PRINT_STORE_TRANSACTION_REJECTED";

//#CUSTOMER TOP-UP LOGIN 
export const CUSTOMER_TOPUP_LOGIN_REQUESTED = 'CUSTOMER_TOPUP_LOGIN_REQUESTED';
export const CUSTOMER_TOPUP_LOGIN_FULFILLED = 'CUSTOMER_TOPUP_LOGIN_FULFILLED';
export const CUSTOMER_TOPUP_LOGIN_REJECTED = 'CUSTOMER_TOPUP_LOGIN_REJECTED';


const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;

//GET STORE LIST
export const getStoreList = (data) => {
	return async dispatch => {
		dispatch(fetchRequest());
		return axios
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
			.then((response) => {
				dispatch(fetchSuccess(response));
			})
			.catch((error) => {
				dispatch(fetchError(error));
			})
	}

	function fetchRequest() { return { type: GET_MENU_LIST_STORE_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_MENU_LIST_STORE_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_MENU_LIST_STORE_REJECTED, payload: data } }

}

//#CREATE MENU TRANSACTION
export const createMenuTransaction = (data) => {
	
	return async dispatch => {
		return axios
			.post(`${constant.API_PATH}store/transaction/create?accessToken=${accessToken}`, {
				menu: data.menu,
				store: data.store.id
			},{'Content-Type': 'application/json'})
			.then((response) => {
				dispatch(handleSuccess(response.data));
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleSuccess(data) { return { type: CREATE_MENU_TRANSACTION_FULFILLED, payload: data }}
	function handleError(data) { return { type: CREATE_MENU_TRANSACTION_REJECTED, payload: data }}
}

//# GET PRINT STORE TRANSACTION
export const getPrintStoreTransaction = (data) => {

	return async dispatch => {
		dispatch(handleRequest());
		return axios
			.get(`${constant.API_PATH}store/transaction/print?accessToken=${accessToken}&id=${data.id}`)
			.then((response) => {
				dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleRequest() { return { type: GET_PRINT_STORE_TRANSACTION_REQUESTED } }
	function handleSuccess(data) { return { type: GET_PRINT_STORE_TRANSACTION_FULFILLED, payload: data } }
	function handleError(data) { return { type: GET_PRINT_STORE_TRANSACTION_REJECTED, payload: data } }

}

/*
//  CUSTOMER TOP-UP LOGIN 
//  Calls the API to get `accessToken` required to access the app.
*/
export const kasirTopUpLogin = (data) => { 
    return async dispatch => {
        dispatch(loginRequest());

        return axios
            .post(`${constant.API_PATH}member/authenticate`, {
                card: data.cardID
            })
            .then((response) => {
                let result = response.data.result;            
                localStorage.setItem('accessTokenTopUp', result.accessToken);
                localStorage.setItem('userDataTopUp', JSON.stringify(result));
                
                dispatch(loginSuccess(result));
            })
            .catch((error) => {
                dispatch(loginError(error));
            })
    }

    function loginRequest() { return { type: CUSTOMER_TOPUP_LOGIN_REQUESTED } }
    function loginSuccess(data) { return { type: CUSTOMER_TOPUP_LOGIN_FULFILLED, payload: data } }
    function loginError(data) { return { type: CUSTOMER_TOPUP_LOGIN_REJECTED, payload: data } }
}