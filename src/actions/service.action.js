import axios from 'axios';
import * as config from '../config';

export const fetchServices = (data) => {
	return async (dispatch) => {
		return axios
			.get(`${config.constant.API_PATH}service/list?accessToken=${config.accessToken}&type=${data.type}&limit=${data.limit}&offset=${data.offset}`)
			.then((response) => {
				dispatch({
					type: 'GET_SERVICES_FULFILLED',
					payload: response.data
				})
			})
			.catch((error) => {
				dispatch({
					type: 'GET_SERVICES_ERROR',
					payload: error
				})
			})
	}
}

export const fetchServiceTypes = () => {
	return async (dispatch) => {
		dispatch({ type: 'GET_SERVICE_TYPE_REQUESTED' });

		return axios
			.get(`${config.constant.API_PATH}service/type?accessToken=${config.accessToken}`)
			.then((response) => {
				dispatch({
					type: 'GET_SERVICE_TYPE_FULFILLED',
					payload: response.data
				})
			})
			.catch((error) => {
				dispatch({
					type: 'GET_SERVICE_TYPE_ERROR',
					payload: error
				})
			})
	}
}
