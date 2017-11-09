import {
	REQUEST_SERVICE_TYPES,
	GET_SERVICE_TYPES_FULFILLED,
	GET_SERVICE_TYPES_REJECTED,
	REQUEST_SERVICE_LIST,
	GET_SERVICE_LIST_FULFILLED,
	GET_SERVICE_LIST_REJECTED,
	CREATE_SERVICE_TRANSACTION_FULFILLED,
	CREATE_SERVICE_TRANSACTION_REJECTED
} from '../actions/service.action';

const initialState = {
	list: {},
	types: {},
	service: null,
	isFetching: false,
	isLoaded: false,
	error: {}
}

const service = (state = initialState, action) => {
	switch(action.type) {
		case REQUEST_SERVICE_LIST: {
			return {
				...state,
				isFetching: true,
				isLoaded: false
			}
		}
		case GET_SERVICE_LIST_FULFILLED: {
			return {
				...state,
				list: action.payload.data,
				isFetching: false,
				isLoaded: true
			}
		}
		case GET_SERVICE_LIST_REJECTED: {
			return {
				...state,
				list: {},
				isFetching: false,
				isLoaded: false,
				error: action.payload
			}
		}

		//
		case REQUEST_SERVICE_TYPES: {
			return {
				...state,
				isFetching: true,
				isLoaded: false
			}
		}

		case GET_SERVICE_TYPES_FULFILLED: {
			return {
				...state,
				types: action.payload.data,
				isFetching: false,
				isLoaded: true
			}
		}

		case GET_SERVICE_TYPES_REJECTED: {
			return {
				...state,
				types: {},
				isFetching: false,
				isLoaded: false,
				error: action.payload
			}
		}

		case CREATE_SERVICE_TRANSACTION_FULFILLED: {
			return {
				...state,
				service: action.payload,
				error: {}
			}
		}

		case CREATE_SERVICE_TRANSACTION_FULFILLED: {
			return {
				...state,
				service: null,
				error: action.payload
			}
		}

		default: {
			return state;
		}
	}
}

export default service;
