import {
	GET_SERVICE_LIST_REQUESTED,
	GET_SERVICE_LIST_FULFILLED,
	GET_SERVICE_LIST_REJECTED,
	GET_SERVICE_TYPES_REQUESTED,
	GET_SERVICE_TYPES_FULFILLED,
	GET_SERVICE_TYPES_REJECTED,
	CREATE_SERVICE_FULFILLED,
	CREATE_SERVICE_REJECTED,
	CREATE_SERVICE_TYPE_FULFILLED,
	CREATE_SERVICE_TYPE_REJECTED,
	UPDATE_SERVICE_TYPE_FULFILLED,
	UPDATE_SERVICE_TYPE_REJECTED,
	CREATE_SERVICE_TRANSACTION_FULFILLED,
	CREATE_SERVICE_TRANSACTION_REJECTED,
	UPDATE_SERVICE_FULFILLED,
	UPDATE_SERVICE_REJECTED,
	DELETE_SERVICE_FULFILLED,
	DELETE_SERVICE_REJECTED,
	DELETE_SERVICE_TYPE_FULFILLED,
	DELETE_SERVICE_TYPE_REJECTED,
} from '../actions/service.action';

const initialState = {
	list: {},
	type: {
		data: {},
		isCreated: false,
		isUpdated: false,
		isDeleted: false,
		isError: false,
		error: {}
	},
	types: {
		data: [],
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	},
	service: {},
	isFetching: false,
	isLoaded: false,
	isDeleted: false,
	isCreated: false,
	isUpdated: false,
	isError: false,
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
				types: {
					...state.types,
					isFetching: true,
					isLoaded: false
				}
			}
		}

		case GET_SERVICE_TYPES_FULFILLED: {
			return {
				...state,
				types: {
					...state.types,
					data: action.payload.data,
					isLoaded: true,
					isFetching: false
				}
			}
		}

		case GET_SERVICE_TYPES_REJECTED: {
			return {
				...state,
				types: {
					...state.types,
					data: {},
					isLoaded: false,
					isFetching: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case CREATE_SERVICE_FULFILLED: {
			return {
				...state,
				service: action.payload,
				isCreated: true,
				error: null
			}
		}

		case CREATE_SERVICE_REJECTED: {
			return {
				...state,
				service: null,
				isCreated: false,
				isError: true,
				error: action.payload
			}
		}

		case CREATE_SERVICE_TYPE_FULFILLED: {
			return {
				...state,
				type: {
					...state.type,
					data: action.payload,
					isCreated: true,
				},
			}
		}

		case CREATE_SERVICE_TYPE_REJECTED: {
			return {
				...state,
				type: {
					...state.type,
					data: {},
					isCreated: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case UPDATE_SERVICE_TYPE_FULFILLED: {
			return {
				...state,
				type: {
					...state.type,
					data: action.payload,
					isUpdated: true
				}
			}
		}

		case UPDATE_SERVICE_TYPE_REJECTED: {
			return {
				...state,
				type: {
					...state.type,
					data: {},
					isUpdated: false,
					isError: true,
					error: action.payload
				}
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
				isUpdated: true,
				error: {}
			}
		}

		case UPDATE_SERVICE_REJECTED: {
			return {
				...state,
				service: {},
				isUpdated: false,
				isError: true,
				error: action.payload
			}
		}

		case DELETE_SERVICE_FULFILLED: {
			return {
				...state,
				isDeleted: true,
			}
		}

		case DELETE_SERVICE_REJECTED: {
			return {
				...state,
				isDeleted: false,
				isError: true,
				error: action.payload
			}
		}

		case DELETE_SERVICE_TYPE_FULFILLED: {
			return {
				...state,
				type: {
					isDeleted: true,
					data: action.payload
				},
				isError: false,
				error: {}
			}
		}

		case DELETE_SERVICE_TYPE_REJECTED: {
			return {
				...state,
				type: {},
				isError: true,
				error: action.payload
			}
		}

		default: {
			return state;
		}
	}
}

export default service;
