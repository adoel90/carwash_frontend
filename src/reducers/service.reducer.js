import {
	GET_SERVICE_LIST_REQUESTED,
	GET_SERVICE_LIST_FULFILLED,
	GET_SERVICE_LIST_REJECTED,

	GET_SERVICE_TYPES_REQUESTED,
	GET_SERVICE_TYPES_FULFILLED,
	GET_SERVICE_TYPES_REJECTED,

	CREATE_SERVICE_FULFILLED,
	CREATE_SERVICE_REJECTED,
	UPDATE_SERVICE_FULFILLED,
	UPDATE_SERVICE_REJECTED,
	CHANGE_SERVICE_STATUS_REQUESTED,
	CHANGE_SERVICE_STATUS_FULFILLED,
	CHANGE_SERVICE_STATUS_REJECTED,
	DELETE_SERVICE_FULFILLED,
	DELETE_SERVICE_REJECTED,

	CREATE_SERVICE_TYPE_FULFILLED,
	CREATE_SERVICE_TYPE_REJECTED,
	UPDATE_SERVICE_TYPE_FULFILLED,
	UPDATE_SERVICE_TYPE_REJECTED,
	CHANGE_SERVICE_TYPE_STATUS_FULFILLED,
	CHANGE_SERVICE_TYPE_STATUS_REJECTED,

	CREATE_SERVICE_TRANSACTION_FULFILLED,
	CREATE_SERVICE_TRANSACTION_REJECTED,

} from '../actions/service.action';

const initialState = {
	list: {
		data: [],
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	},
	type: {
		id: null,
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
	updated: {
		data: {},
		isUpdated: false,
		isStatusChanged: false,
		isStatusChanging: false,
		isError: false,
		error: {}
	},
	created: {
		data: {},
		isCreated: false,
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
				list: {
					...state.list,
					isFetching: true,
					isLoaded: false
				}
			}
		}
		case GET_SERVICE_LIST_FULFILLED: {
			return {
				...state,
				list: {
					...state.list,
					data: action.payload.data,
					isLoaded: true,
					isFetching: false,
					isError: false,
					error: {}
				}
			}
		}
		case GET_SERVICE_LIST_REJECTED: {
			return {
				...state,
				list: {
					...state.list,
					data: {},
					isLoaded: false,
					isFetching: false,
					isError: true,
					error: action.payload
				}
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

		//
		case CREATE_SERVICE_FULFILLED: {
			return {
				...state,
				created: {
					...state.created,
					data: action.payload.data,
					isCreated: true,
					isError: false,
					error: {}
				}
			}
		}
		case CREATE_SERVICE_REJECTED: {
			return {
				...state,
				created: {
					...state.created,
					data: {},
					isCreated: false,
					isError: true,
					error: action.payload
				}
			}
		}
		case UPDATE_SERVICE_FULFILLED: {
			return {
				...state,
				updated: {
					...state.updated,
					data: action.payload,
					isUpdated: true,
					isError: false,
					error: {}
				}
			}
		}
		case UPDATE_SERVICE_REJECTED: {
			return {
				...state,
				updated: {
					...state.updated,
					data: {},
					isUpdated: false,
					isError: true,
					error: action.payload
				}
			}
		}
		case CHANGE_SERVICE_STATUS_REQUESTED: {
			return {
				...state,
				updated: {
					...state.updated,
					data: {},
					isStatusChanging: true,
					isStatusChanged: false,
					isError: false,
					error: {}
				}
			}
		}
		case CHANGE_SERVICE_STATUS_FULFILLED: {
			return {
				...state,
				updated: {
					...state.updated,
					data: action.payload,
					isStatusChanging: false,
					isStatusChanged: true
				}
			}
		}
		case CHANGE_SERVICE_STATUS_REJECTED: {
			return {
				...state,
				updated: {
					...state.updated,
					data: {},
					isStatusChanging: false,
					isStatusChanged: false,
					isError: true,
					error: action.payload
				}
			}
		}

		//
		case CREATE_SERVICE_TYPE_FULFILLED: {
			return {
				...state,
				created: {
					...state.created,
					data: action.payload,
					isCreated: true,
					isError: false,
					error: {}
				}
			}
		}
		case CREATE_SERVICE_TYPE_REJECTED: {
			return {
				...state,
				created: {
					...state.created,
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
				updated: {
					...state.updated,
					id: action.id,
					data: action.payload,
					isUpdated: true,
					isError: false,
					error: {}
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
		case CHANGE_SERVICE_TYPE_STATUS_FULFILLED: {
			return {
				...state,
				type: {
					...state.type,
					id: action.id,
					data: action.payload,
					isUpdated: true,
					isError: false,
					error: {}
				}
			}
		}
		case CHANGE_SERVICE_TYPE_STATUS_REJECTED: {
			return {
				...state,
				type: {
					...state.type,
					id: null,
					data: {},
					isUpdated: false,
					isError: true,
					error: action.payload
				}
			}
		}

		//
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

		default: {
			return state;
		}
	}
}

export default service;
