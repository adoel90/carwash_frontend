import axios from 'axios';
import { constant } from '../config';
import Cookies from 'universal-cookie';

export const GET_SERVICE_TYPES_REQUESTED = 'GET_SERVICE_TYPES_REQUESTED';
export const GET_SERVICE_TYPES_FULFILLED = 'GET_SERVICE_TYPES_FULFILLED';
export const GET_SERVICE_TYPES_REJECTED = 'GET_SERVICE_TYPES_REJECTED';

export const GET_SERVICE_LIST_REQUESTED = 'GET_SERVICE_LIST_REQUESTED';
export const GET_SERVICE_LIST_FULFILLED = 'GET_SERVICE_LIST_FULFILLED';
export const GET_SERVICE_LIST_REJECTED = 'GET_SERVICE_LIST_REJECTED';

export const CREATE_SERVICE_FULFILLED = 'CREATE_SERVICE_FULFILLED';
export const CREATE_SERVICE_REJECTED = 'CREATE_SERVICE_REJECTED';
export const UPDATE_SERVICE_FULFILLED = 'UPDATE_SERVICE_FULFILLED';
export const UPDATE_SERVICE_REJECTED = 'UPDATE_SERVICE_REJECTED';
export const CHANGE_SERVICE_STATUS_FULFILLED = 'CHANGE_SERVICE_STATUS_FULFILLED';
export const CHANGE_SERVICE_STATUS_REJECTED = 'CHANGE_SERVICE_STATUS_REJECTED';
export const DELETE_SERVICE_FULFILLED = 'DELETE_SERVICE_FULFILLED';
export const DELETE_SERVICE_REJECTED = 'DELETE_SERVICE_REJECTED';

export const CREATE_SERVICE_TYPE_FULFILLED = 'CREATE_SERVICE_TYPE_FULFILLED';
export const CREATE_SERVICE_TYPE_REJECTED = 'CREATE_SERVICE_TYPE_REJECTED';
export const UPDATE_SERVICE_TYPE_FULFILLED = 'UPDATE_SERVICE_TYPE_FULFILLED';
export const UPDATE_SERVICE_TYPE_REJECTED = 'UPDATE_SERVICE_TYPE_REJECTED';
export const CHANGE_SERVICE_TYPE_STATUS_FULFILLED = 'CHANGE_SERVICE_TYPE_STATUS_FULFILLED';
export const CHANGE_SERVICE_TYPE_STATUS_REJECTED = 'CHANGE_SERVICE_TYPE_STATUS_FULFILLED';

export const CREATE_SERVICE_TRANSACTION_FULFILLED = 'CREATE_SERVICE_TRANSACTION_FULFILLED';
export const CREATE_SERVICE_TRANSACTION_REJECTED = 'CREATE_SERVICE_TRANSACTION_REJECTED';

const cookies = new Cookies();

export const getAllServiceList = (data, accessToken) => {
	return async dispatch => {

		dispatch(handleRequest());

		return axios
			.get(`${constant.API_PATH}service?accessToken=${accessToken}&type=${data.type}`)
			.then((response) => {
				dispatch(handleSuccess(response.data));
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleRequest() { return { type: GET_SERVICE_LIST_REQUESTED } }
	function handleSuccess(data) { return { type: GET_SERVICE_LIST_FULFILLED, payload: data } }
	function handleError(data) { return { type: GET_SERVICE_LIST_REJECTED, payload: data } }
}

export const getServiceList = (data, accessToken) => {
	return async dispatch => {
		return axios
			.get(`${constant.API_PATH}service/list?accessToken=${accessToken}&type=${data.type}&limit=${data.limit}&offset=${data.offset}`)
			.then((response) => {
				dispatch(handleSuccess(response.data));
			})
			.catch((error) => {
				dispatch(handleError(error));
			})
	}

	function handleRequest() { return { type: GET_SERVICE_LIST_REQUESTED } }
	function handleSuccess(data) { return { type: GET_SERVICE_LIST_FULFILLED, payload: data } }
	function handleError(data) { return { type: GET_SERVICE_LIST_REJECTED, payload: data } }
}

export const getServiceTypes = (accessToken) => {
	return async dispatch => {
		dispatch(handleRequest());

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

	function handleRequest() { return { type: GET_SERVICE_TYPES_REQUESTED } }
}

export const createNewService = (data, accessToken) => {
	return async dispatch => {

		let formData = new FormData();
		formData.append("type", data.type);
		formData.append("name", data.name);
		formData.append("price", data.price);
		formData.append("description", data.description);
		formData.append("image", data.image);

		return axios
			.post(`${constant.API_PATH}service/create?accessToken=${accessToken}`, formData)
			.then((response) => {
				dispatch(handleSuccess(response.data));
			})
			.catch((error) => {
				dispatch(handleError(error));
			})
	}

	function handleSuccess(data) { return { type: CREATE_SERVICE_FULFILLED, payload: data } }
	function handleError(data) { return { type: CREATE_SERVICE_REJECTED, payload: data } }
}

export const updateService = (data, accessToken) => {
	return async dispatch => {
		return axios
			.put(`${constant.API_PATH}service/update?accessToken=${accessToken}`, {
				id: data.id,
				name: data.name,
				price: data.price,
				description: data.description
			})
			.then((response) => {
				dispatch(handleSuccess(response.data));
			})
			.catch((error) => {
				dispatch(handleError(error));
			})
	}

	function handleSuccess(data) { return { type: UPDATE_SERVICE_FULFILLED, payload: data}}
	function handleError(data) { return { type: UPDATE_SERVICE_REJECTED, payload: data }}
}

export const changeServiceStatus = (data, accessToken) => {
	return async dispatch => {
		return axios
			.put(`${constant.API_PATH}service/status?accessToken=${accessToken}`, {
				id: data.id
			})
			.then((response) => {
				dispatch(handleSuccess(response.data, data.id))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleSuccess(data, id) { return { type: CHANGE_SERVICE_STATUS_FULFILLED, payload: data, id: id }}
	function handleError(data) { return { type: CHANGE_SERVICE_STATUS_FULFILLED, payload: data }}
}

export const deleteService = (data, accessToken) => {
	return async dispatch => {
		return axios
			.put(`${constant.API_PATH}service/delete?accessToken=${accessToken}`, {
				id: data.id
			})
			.then((response) => {
				dispatch(handleSuccess(response.data));
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleSuccess(data) { return { type: DELETE_SERVICE_FULFILLED, payload: data }}
	function handleError(data) { return { type: DELETE_SERVICE_REJECTED, payload: data }}
}

/**
**	ACTION CREATOR: Service Type
*/
export const createNewServiceType = (data, accessToken) => {
	return async dispatch => {
		return axios
			.post(`${constant.API_PATH}service/type/create?accessToken=${accessToken}`, {
				name: data.name // required
			})
			.then((response) => {
				dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleSuccess(data) { return { type: CREATE_SERVICE_TYPE_FULFILLED, payload: data }}
	function handleError(data) { return { type: CREATE_SERVICE_TYPE_REJECTED, payload: data }}
}

export const updateServiceType = (data, accessToken) => {
	return async dispatch => {
		return axios
			.put(`${constant.API_PATH}service/type/update?accessToken=${accessToken}`, {
				id: data.id,
				name: data.name
			})
			.then((response) => {
				dispatch(handleSuccess(response.data, data.id))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleSuccess(data, id) { return { type: UPDATE_SERVICE_TYPE_FULFILLED, payload: data, id: id} }
	function handleError(data) { return { type: UPDATE_SERVICE_TYPE_REJECTED, payload: data} }
}

export const changeServiceTypeStatus = (data, accessToken) => {
	return async dispatch => {
		return axios
			.put(`${constant.API_PATH}service/type/status?accessToken=${accessToken}`, {
				id: data.id
			})
			.then((response) => {
				dispatch(handleSuccess(response.data, data.id))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleSuccess(data, id) { return { type: CHANGE_SERVICE_TYPE_STATUS_FULFILLED, payload: data, id: id } }
	function handleError(data) { return { type: CHANGE_SERVICE_TYPE_STATUS_REJECTED, payload: data } }
}

export const createServiceTransaction = (data, accessToken) => {
	return async dispatch => {
		return axios
			.post(`${constant.API_PATH}service/transaction/create?accessToken=${accessToken}`, {
				service: data.service
			})
			.then((response) => {
				dispatch(handleSuccess(response.data));
				cookies.set('member', response.data.data, { path: '/' });
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleSuccess(data) { return { type: CREATE_SERVICE_TRANSACTION_FULFILLED, payload: data } };
	function handleError(error) { return { type: CREATE_SERVICE_TRANSACTION_REJECTED, payload: error } };
}
