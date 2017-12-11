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
	UPDATE_SERVICE_TYPE_REQUESTED,
	UPDATE_SERVICE_TYPE_FULFILLED,
	UPDATE_SERVICE_TYPE_REJECTED,
	CHANGE_SERVICE_TYPE_STATUS_REQUESTED,
	CHANGE_SERVICE_TYPE_STATUS_FULFILLED,
	CHANGE_SERVICE_TYPE_STATUS_REJECTED,

	CREATE_SERVICE_TRANSACTION_REQUESTED,	
	CREATE_SERVICE_TRANSACTION_FULFILLED,
	CREATE_SERVICE_TRANSACTION_REJECTED,
	PRINT_SERVICE_TRANSACTION_REQUESTED,
	PRINT_SERVICE_TRANSACTION_FULFILLED,
	PRINT_SERVICE_TRANSACTION_REJECTED,

} from '../actions/service.action';

const initialState = {
	item: {
		id: null,
		data: {},
		isCreating: false,
		isCreated: false,
		isStatusChanging: false,
		isStatusChanged: false,
		isError: false,
		error: {}
	},
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
		isCreating: false,
		isUpdated: false,
		isUpdating: false,
		isStatusChanged: false,
		isStatusChanging: false,
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
	transaction: {
		data: {},
		isPaying: false,
		isPaid: false,
		isError: false,
		error: {}
	},
	print: {
		data: {},
		isPrinting: false,
		isPrinted: false,
		isError: false,
		error: {}
	}
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
				item: {
					...state.item,
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
				item: {
					...state.item,
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
				item: {
					...state.item,
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
				item: {
					...state.item,
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
				item: {
					...state.item,
					id: action.id,
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
				item: {
					...state.item,
					data: action.payload,
					isStatusChanging: false,
					isStatusChanged: true
				}
			}
		}
		case CHANGE_SERVICE_STATUS_REJECTED: {
			return {
				...state,
				item: {
					...state.item,
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
				type: {
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
				type: {
					...state.created,
					data: {},
					isCreated: false,
					isError: true,
					error: action.payload
				}
			}
		}
		case UPDATE_SERVICE_TYPE_REQUESTED: {
			return {
				...state,
				type: {
					...state.updated,
					id: action.id,
					data: {},
					isUpdating: true,
					isUpdated: false,
					isError: false,
					error: {}
				}
			}
		}
		case UPDATE_SERVICE_TYPE_FULFILLED: {
			return {
				...state,
				type: {
					...state.updated,
					id: action.id,
					data: action.payload,
					isUpdating: false,
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
					isUpdating: false,
					isUpdated: false,
					isError: true,
					error: action.payload
				}
			}
		}
		case CHANGE_SERVICE_TYPE_STATUS_REQUESTED: {
			return {
				...state,
				type: {
					...state.type,
					id: action.id,
					isStatusChanging: true,
					isStatusChanged: false,
					isError: false,
					error: {}
				}
			}
		}
		case CHANGE_SERVICE_TYPE_STATUS_FULFILLED: {
			return {
				...state,
				type: {
					...state.type,
					id: action.id,
					data: action.payload.data,
					isStatusChanging: false,
					isStatusChanged: true,
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
					id: action.id,
					data: {},
					isStatusChanging: false,
					isStatusChanged: false,
					isError: true,
					error: action.payload
				}
			}
		}

		//
		case CREATE_SERVICE_TRANSACTION_REQUESTED: {
			return {
				...state,
				transaction: {
					...state.transaction,
					data: {},
					isPaying: true,
					isPaid: false,
					isError: false,
					error: {}
				}
			}
		}
		
		case CREATE_SERVICE_TRANSACTION_FULFILLED: {
			return {
				...state,
				transaction: {
					...state.transaction,
					data: action.payload.data,
					isPaid: true,
					isPaying: false,
					isError: false,
					error: {}
				}
			}
		}

		case CREATE_SERVICE_TRANSACTION_REJECTED: {
			return {
				...state,
				transaction: {
					...state.transaction,
					data: {},
					isPaid: false,
					isPaying: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case PRINT_SERVICE_TRANSACTION_REQUESTED: {
			return {
				...state,
				print: {
					...state.print,
					data: {},
					isPrinting: true,
					isPrinted: false,
					isError: false,
					error: {}
				}
			}
		}

		case PRINT_SERVICE_TRANSACTION_FULFILLED: {
			return {
				...state,
				print: {
					...state.print,
					data: action.payload.data,
					isPrinting: false,
					isPrinted: true,
					isError: false,
					error: {}
				}
			}
		}

		case PRINT_SERVICE_TRANSACTION_REJECTED: {
			return {
				...state,
				print: {
					...state.print,
					data: {},
					isPrinting: false,
					isPrinted: false,
					isError: true,
					error: action.payload
				}
			}
		}

		default: {
			return state;
		}
	}
}

export default service;
