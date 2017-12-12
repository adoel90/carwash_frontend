import {
	GET_CAFE_MENU_LIST_REQUESTED,
	GET_CAFE_MENU_LIST_FULFILLED,
	GET_CAFE_MENU_LIST_REJECTED,

	CREATE_CAFE_MENU_REQUESTED,
	CREATE_CAFE_MENU_FULFILLED,
	CREATE_CAFE_MENU_REJECTED,
	CHANGE_CAFE_MENU_STATUS_REQUESTED,
	CHANGE_CAFE_MENU_STATUS_FULFILLED,
	CHANGE_CAFE_MENU_STATUS_REJECTED,
	UPDATE_CAFE_MENU_REQUESTED,
	UPDATE_CAFE_MENU_FULFILLED,
	UPDATE_CAFE_MENU_REJECTED,
	DELETE_CAFE_MENU_FULFILLED,
	DELETE_CAFE_MENU_REJECTED,

	GET_CAFE_TYPES_REQUESTED,
	GET_CAFE_TYPES_FULFILLED,
	GET_CAFE_TYPES_REJECTED,
	CREATE_CAFE_TYPE_REQUESTED,
	CREATE_CAFE_TYPE_FULFILLED,
	CREATE_CAFE_TYPE_REJECTED,
	UPDATE_CAFE_TYPE_REQUESTED,
	UPDATE_CAFE_TYPE_FULFILLED,
	UPDATE_CAFE_TYPE_REJECTED,
	CHANGE_CAFE_TYPE_STATUS_REQUESTED,
	CHANGE_CAFE_TYPE_STATUS_FULFILLED,
	CHANGE_CAFE_TYPE_STATUS_REJECTED,

	CREATE_CAFE_TRANSACTION_FULFILLED,
	CREATE_CAFE_TRANSACTION_REJECTED,
	PRINT_CAFE_TRANSACTION_REQUESTED,
	PRINT_CAFE_TRANSACTION_FULFILLED,
	PRINT_CAFE_TRANSACTION_REJECTED,


} from '../actions/cafe.action';

const initialState = {
	menu: {
		data: {},
		isUpdating: false,
		isUpdated: false,
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
		isUpdating: false,
		isUpdated: false,
		isCreating: false,
		isCreated: false,
		isStatusChanging: false,
		isStatusChanged: false,
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
		isPrinted: false,
		isError: false,
		error: {}
	}
}

const cafe = (state = initialState, action) => {
	switch(action.type) {
		case GET_CAFE_MENU_LIST_REQUESTED: {
			return {
				...state,
				list: {
					...state.list,
					data: {},
					isLoaded: false,
					isFetching: true,
					isError: false,
					error: {}
				}
			}
		}
		case GET_CAFE_MENU_LIST_FULFILLED: {
			return {
				...state,
				list: {
					...state.list,
					data: action.payload.data,
					isLoaded: true,
					isFetching: false
				}
			}
		}
		case GET_CAFE_MENU_LIST_REJECTED: {
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
		case CREATE_CAFE_MENU_REQUESTED: {
			return {
				...state,
				menu: {
					...state.menu,
					id: action.id,
					data: {},
					isCreating: true,
					isCreated: false,
					isError: false,
					error: {}
				}
			}
		}

		case CREATE_CAFE_MENU_FULFILLED: {
			return {
				...state,
				menu: {
					...state.menu,
					id: action.id,
					data: action.payload.data,
					isCreating: false,
					isCreated: true,
					isError: false,
					error: {}
				}
			}
		}

		case CREATE_CAFE_MENU_REJECTED: {
			return {
				...state,
				menu: {
					...state.menu,
					data: {},
					isCreating: false,
					isCreated: false,
					isError: true,
					error: action.payload
				}
			}
		}

		//
		case CREATE_CAFE_TRANSACTION_FULFILLED: {
			return {
				...state,
				transaction: {
					...state.transaction,
					data: action.payload.data,
					isPaid: true,
					isError: false,
					error: {}
				}
			}
		}

		case CREATE_CAFE_TRANSACTION_REJECTED: {
			return {
				...state,
				transaction: {
					...state.transaction,
					data: {},
					isPaid: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case PRINT_CAFE_TRANSACTION_FULFILLED: {
			return {
				...state,
				print: {
					...state.print,
					data: action.payload.data,
					isPrinted: true,
					isError: false,
					error: {}
				}
			}
		}

		case PRINT_CAFE_TRANSACTION_REJECTED: {
			return {
				...state,
				print: {
					...state.print,
					data: {},
					isPrinted: false,
					isError: true,
					error: action.payload
				}
			}
		}

		//
		case UPDATE_CAFE_MENU_REQUESTED: {
			return {
				...state,
				menu: {
					...state.menu,
					id: action.id,
					data: {},
					isUpdating: true,
					isUpdated: false
				}
			}
		}

		case UPDATE_CAFE_MENU_FULFILLED: {
			return {
				...state,
				menu: {
					...state.menu,
					id: action.id,
					data: action.payload.data,
					isUpdated: true,
					isUpdating: false,
					isError: false,
					error: {}
				}
			}
		}

		case UPDATE_CAFE_MENU_REJECTED: {
			return {
				...state,
				menu: {
					...state.menu,
					id: action.id,
					data: {},
					isUpdated: false,
					isUpdating: false,
					isError: true,
					error: action.payload
				}
			}
		}

		//
		case CHANGE_CAFE_MENU_STATUS_REQUESTED: {
			return {
				...state,
				menu: {
					...state.menu,
					id: action.id,
					data: {},
					isStatusChanged: false,
					isStatusChanging: true,
					isError: false,
					error: {}
				}
			}
		}

		case CHANGE_CAFE_MENU_STATUS_FULFILLED: {
			return {
				...state,
				menu: {
					...state.menu,
					id: action.id,
					data: action.payload.data,
					isStatusChanged: true,
					isStatusChanging: false
				}
			}
		}

		case CHANGE_CAFE_MENU_STATUS_REJECTED: {
			return {
				...state,
				menu: {
					...state.menu,
					id: action.id,
					data: {},
					isStatusChanged: false,
					isStatusChanging: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case DELETE_CAFE_MENU_FULFILLED: {
			return {
				...state,
				deletedMenu: action.payload,
				isDeleted: true,
				isError: false,
				error: {}
			}
		}

		//
		case GET_CAFE_TYPES_REQUESTED: {
			return {
				...state,
				types: {
					...state.types,
					data: {},
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_CAFE_TYPES_FULFILLED: {
			return {
				...state,
				types: {
					...state.types,
					data: action.payload.data,
					isLoaded: true,
					isFetching: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_CAFE_TYPES_REJECTED: {
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

		case CREATE_CAFE_TYPE_REQUESTED: {
			return {
				...state,
				type: {
					...state.type,
					data: {},
					isCreating: true,
					isCreated: false,
					isError: false,
					error: {}
				}
			}
		}

		case CREATE_CAFE_TYPE_FULFILLED: {
			return {
				...state,
				type: {
					...state.type,
					data: action.payload.data,
					isCreating: false,
					isCreated: true
				}
			}
		}

		case CREATE_CAFE_TYPE_REJECTED: {
			return {
				...state,
				type: {
					...state.type,
					data: {},
					isCreating: false,
					isCreated: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case UPDATE_CAFE_TYPE_REQUESTED: {
			return {
				...state,
				type: {
					...state.type,
					id: action.id,
					data: {},
					isUpdating: true,
					isUpdated: false,
					isError: false,
					error: {}
				}
			}
		}

		case UPDATE_CAFE_TYPE_FULFILLED: {
			return {
				...state,
				type: {
					...state.type,
					id: action.id,
					data: action.payload.data,
					isUpdating: false,
					isUpdated: true,
				}
			}
		}

		case UPDATE_CAFE_TYPE_REQUESTED: {
			return {
				...state,
				type: {
					...state.type,
					id: action.id,
					data: {},
					isUpdating: false,
					isUpdated: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case CHANGE_CAFE_TYPE_STATUS_REQUESTED: {
			return {
				...state,
				type: {
					...state.type,
					id: action.id,
					data: {},
					isStatusChanging: true,
					isStatusChanged: false,
					isError: false,
					error: {}
				}
			}
		}

		case CHANGE_CAFE_TYPE_STATUS_FULFILLED: {
			return {
				...state,
				type: {
					...state.type,
					id: action.id,
					data: action.payload,
					isStatusChanging: false,
					isStatusChanged: true,
					isError: false,
					error: {}
				}
			}
		}

		case CHANGE_CAFE_TYPE_STATUS_REJECTED: {
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

		default: {
			return state;
		}
	}
}

export default cafe;
