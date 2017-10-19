import axios from 'axios';
import { constant, accessToken } from './config';

const fetchAllServicesSuccess = (response) => {
	type: 'GET_SERVICES_FULFILLED';
	payload: response.data;
}

const fetchAllServicesError = (error) => {
	type: 'GET_SERVICES_ERROR';
	payload: error;
}

export const fetchAllServices = (dispatch) => {
	axios
		.get(constant.API_URL + '/service/list?accessToken=' + accessToken)
		.then((response) => {
			dispatch(fetchAllUsersSuccess(response));
		})
		.catch((error) => {
			dispatch(fetchAllUsersError(error));
		})
}
