import axios from 'axios';
import { constant } from '../config';
import Cookies from 'universal-cookie';

export const REQUEST_SERVICE_LIST = 'REQUEST_SERVICE_LIST';
export const GET_SERVICE_LIST_FULFILLED = 'GET_SERVICE_LIST_FULFILLED';
export const GET_SERVICE_LIST_REJECTED = 'GET_SERVICE_LIST_REJECTED';
export const REQUEST_SERVICE_TYPES = 'REQUEST_SERVICE_TYPES';
export const GET_SERVICE_TYPES_FULFILLED = 'GET_SERVICE_TYPES_FULFILLED';
export const GET_SERVICE_TYPES_REJECTED = 'GET_SERVICE_TYPES_REJECTED';

export const getServiceList = (data, accessToken) => {
	return async dispatch => {
		return axios
			.get(`${constant.API_PATH}service/list?accessToken=${accessToken}&type=${data.type}&limit=${data.limit}&offset=${data.offset}`)
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

export const getServiceTypes = (accessToken) => {
	console.log(accessToken);

	return async dispatch => {
		return axios
			.get(`${constant.API_PATH}service/type?accessToken=${accessToken}`)
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
