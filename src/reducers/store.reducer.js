import {
	GET_STORE_LIST_REQUESTED,
	GET_STORE_LIST_FULFILLED,
	GET_STORE_LIST_REJECTED,
	GET_STORE_DETAIL_REQUESTED,
	GET_STORE_DETAIL_FULFILLED,
	GET_STORE_DETAIL_REJECTED,
	CREATE_STORE_REQUESTED,
	CREATE_STORE_FULFILLED,
	CREATE_STORE_REJECTED,
	UPDATE_STORE_REQUESTED,
	UPDATE_STORE_FULFILLED,
	UPDATE_STORE_REJECTED,
	CHANGE_STATUS_STORE_REQUESTED,
	CHANGE_STATUS_STORE_FULFILLED,
	CHANGE_STATUS_STORE_REJECTED,
	GET_CATEGORY_LIST_REQUESTED,
	GET_CATEGORY_LIST_FULFILLED,
	GET_CATEGORY_LIST_REJECTED,
} from '../actions/store.action'

const initialState = {
	list: {
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	},
	detail: {
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	},
	item: {
		data: {},
		isCreated: false,
		isError: false,
		error: {}
	},
	updateStore: {
		data: {},
		isUpdated: false,
		isError: false,
		error: {}
	},
	status: {
		data: {},
		isUpdated: false,
		isUpdating: false,
		isStatusChanging: false,
		isStatusChanged: false,
		isError: false,
		error: {}
	},
	category: {
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	}
}

const store = (state = initialState, action) => {
	switch(action.type) {
		case GET_STORE_LIST_REQUESTED: {
			return {
				...state,
				list: {
					...state.list,
					data: {},
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_STORE_LIST_FULFILLED: {
			return {
				...state,
				list: {
					...state.list,
					data: action.payload,
					isLoaded: true,
					isFetching: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_STORE_LIST_REJECTED: {
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

		case GET_STORE_DETAIL_REQUESTED: {
			return {
				...state,
				detail: {
					...state.detail,
					data: {},
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_STORE_DETAIL_FULFILLED: {
			return {
				...state,
				detail: {
					...state.detail,
					data: action.payload,
					isLoaded: true,
					isFetching: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_STORE_DETAIL_REJECTED: {
			return {
				...state,
				detail: {
					...state.detail,
					data: {},
					isLoaded: false,
					isFetching: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case CREATE_STORE_REQUESTED: {
			return {
				...state,
				item: {
					...state.item,
					data: {},
					isCreated: false,
					isError: false,
					error: {}
				}
			}
		}

		case CREATE_STORE_FULFILLED: {
			return {
				...state,
				item: {
					...state.item,
					data: action.payload,
					isCreated: true,
					isError: false,
					error: {}
				}
			}
		}

		case CREATE_STORE_REJECTED: {
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

		case UPDATE_STORE_REQUESTED: {
			return {
				...state,
				updateStore: {
					...state.updateStore,
					data: {},
					isUpdated: false,
					isError: false,
					error: {}
				}
			}
		}

		case UPDATE_STORE_FULFILLED: {
			return {
				...state,
				updateStore: {
					...state.updateStore,
					data: action.payload,
					isUpdated: true,
					isError: false,
					error: {}
				}
			}
		}

		case UPDATE_STORE_REJECTED: {
			return {
				...state,
				updateStore: {
					...state.updateStore,
					data: {},
					isUpdated: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case CHANGE_STATUS_STORE_REQUESTED: {
			return {
				...state,
				status: {
					...state.status,
					data: {},
					id: action.id,
					isStatusChanging: true,
					isStatusChanged: false,
					isError: false,
					error: {}
				}
			}
		}

		case CHANGE_STATUS_STORE_FULFILLED: {
			return {
				...state,
				status: {
					...state.status,
					data: action.payload,
					id: action.id,
					isStatusChanging: false,
					isStatusChanged: true,
					isError: false,
					error: {}
				}
			}
		}

		case CHANGE_STATUS_STORE_REJECTED: {
			return {
				...state,
				status: {
					...state.status,
					data: {},
					id: action.id,
					isStatusChanging: false,
					isStatusChanged: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case GET_CATEGORY_LIST_REQUESTED: {
			return {
				...state,
				category: {
					...state.category,
					data: {},
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_CATEGORY_LIST_FULFILLED: {
			return {
				...state,
				category: {
					...state.category,
					data: action.payload,
					isLoaded: true,
					isFetching: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_CATEGORY_LIST_REJECTED: {
			return {
				...state,
				category: {
					...state.category,
					data: {},
					isLoaded: false,
					isFetching: false,
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

export default store;
