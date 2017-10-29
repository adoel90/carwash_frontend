import axios from 'axios';
import { constant } from '../config';

export const REQUEST_CAFE_MENU = 'REQUEST_CAFE_MENU';
export const GET_CAFE_MENU_FULFILLED = 'GET_CAFE_MENU_FULFILLED';
export const GET_CAFE_MENU_REJECTED = 'GET_CAFE_MENU_REJECTED';
export const REQUEST_CAFE_TYPES = 'REQUEST_CAFE_TYPES';
export const GET_CAFE_TYPES_FULFILLED = 'GET_CAFE_TYPES_FULFILLED';
export const GET_CAFE_TYPES_REJECTED = "GET_CAFE_TYPES_REJECTED";

export const getCafeMenu = (data, accessToken) => {
	return async dispatch => {
		return axios
			.get(`${constant.API_PATH}cafe/menu/list?accessToken=${accessToken}&cafe=${data.cafe}&limit=${data.limit}&offset=${data.offset}`)
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

export const getCafeTypes = (accessToken) => {
	return async dispatch => {
		dispatch({ type: REQUEST_CAFE_TYPES });

		return axios
			.get(`${constant.API_PATH}cafe/type?accessToken=${accessToken}`)
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
