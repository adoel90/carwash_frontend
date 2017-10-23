import axios from 'axios';
import * as config from '../config';

export const REQUEST_SERVICE_LIST = 'REQUEST_SERVICE_LIST';
export const GET_SERVICE_LIST_FULFILLED = 'GET_SERVICE_LIST_FULFILLED';
export const GET_SERVICE_LIST_REJECTED = 'GET_SERVICE_LIST_REJECTED';
export const REQUEST_SERVICE_TYPES = 'REQUEST_SERVICE_TYPES';
export const GET_SERVICE_TYPES_FULFILLED = 'GET_SERVICE_TYPES_FULFILLED';
export const GET_SERVICE_TYPES_REJECTED = 'GET_SERVICE_TYPES_REJECTED';

export const getServiceList = (data) => {
	return async dispatch => {
		return axios
			.get(`${config.constant.API_PATH}service/list?accessToken=${config.accessToken}&type=${data.type}&limit=${data.limit}&offset=${data.offset}`)
			.then((response) => {
				dispatch({
					type: GET_SERVICE_LIST_FULFILLED,
					payload: response.data
				})
			})
			.catch((error) => {
				dispatch({
					type: GET_SERVICE_LIST_REJECTED,
					payload: error
				})
			})
	}
}

export const getServiceTypes = () => {
	return async dispatch => {
		return axios
			.get(`${config.constant.API_PATH}service/type?accessToken=${config.accessToken}`)
			.then((response) => {
				dispatch({
					type: GET_SERVICE_TYPES_FULFILLED,
					payload: response.data
				})
			})
			.catch((error) => {
				dispatch({
					type: GET_SERVICE_TYPES_REJECTED,
					payload: error
				})
			})
	}
}
