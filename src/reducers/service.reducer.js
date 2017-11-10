import {
	GET_SERVICE_LIST_REQUESTED,
	GET_SERVICE_LIST_FULFILLED,
	GET_SERVICE_LIST_REJECTED,
	GET_SERVICE_TYPES_REQUESTED,
	GET_SERVICE_TYPES_FULFILLED,
	GET_SERVICE_TYPES_REJECTED,
	CREATE_SERVICE_FULFILLED,
	CREATE_SERVICE_REJECTED,
	CREATE_SERVICE_TRANSACTION_FULFILLED,
	CREATE_SERVICE_TRANSACTION_REJECTED,
	UPDATE_SERVICE_FULFILLED,
	UPDATE_SERVICE_REJECTED,
} from '../actions/service.action';

const initialState = {
	list: {},
	types: {},
	service: {},
	isFetching: false,
	isLoaded: false,
	error: {}
}

const service = (state = initialState, action) => {
	switch(action.type) {
		case GET_SERVICE_LIST_REQUESTED: {
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
		case GET_SERVICE_TYPES_REQUESTED: {
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

		case CREATE_SERVICE_FULFILLED: {
			return {
				...state,
				service: action.payload,
				error: null
			}
		}

		case CREATE_SERVICE_REJECTED: {
			return {
				...state,
				service: null,
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
				service: {},
				error: action.payload
			}
		}

		case UPDATE_SERVICE_FULFILLED: {
			return {
				...state,
				service: action.payload,
				error: {}
			}
		}

		case UPDATE_SERVICE_REJECTED: {
			return {
				...state,
				service: {},
				error: action.payload
			}
		}

		default: {
			return state;
		}
	}
}

export default service;
