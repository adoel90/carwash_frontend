import axios from 'axios';
import * as config from '../config';

export const REQUEST_CAFE_MENU = 'REQUEST_CAFE_MENU';
export const GET_CAFE_MENU_FULFILLED = 'GET_CAFE_MENU_FULFILLED';
export const GET_CAFE_MENU_REJECTED = 'GET_CAFE_MENU_REJECTED';
export const REQUEST_CAFE_TYPES = 'REQUEST_CAFE_TYPES';
export const GET_CAFE_TYPES_FULFILLED = 'GET_CAFE_TYPES_FULFILLED';
export const GET_CAFE_TYPES_REJECTED = "GET_CAFE_TYPES_REJECTED";

export const getCafeMenu = (data) => {
	return async dispatch => {
		return axios
			.get(`${config.constant.API_PATH}cafe/menu/list?accessToken=${config.accessToken}&cafe=${data.cafeType}&limit=${data.limit}&offset=${data.offset}`)
			.then((response) => {
				dispatch({
					type: GET_CAFE_MENU_FULFILLED,
					payload: response.data
				})
			})
			.catch((error) => {
				dispatch({
					type: GET_CAFE_MENU_REJECTED,
					payload: error
				})
			})
	}
}

export const getCafeTypes = () => {
	return async dispatch => {
		dispatch({ type: REQUEST_CAFE_TYPES });

		return axios
			.get(`${config.constant.API_PATH}cafe/type?accessToken=${config.accessToken}`)
			.then((response) => {
				dispatch({
					type: GET_CAFE_TYPES_FULFILLED,
					payload: response.data
				})
			})
			.catch((error) => {
				dispatch({
					type: GET_CAFE_TYPES_REJECTED,
					payload: error
				})
			})
	}
}
