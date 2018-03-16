import {
	GET_USER_LIST_REQUESTED,
	GET_USER_LIST_FULFILLED,
	GET_USER_LIST_REJECTED,
	GET_USER_DETAIL_REQUESTED,
	GET_USER_DETAIL_FULFILLED,
	GET_USER_DETAIL_REJECTED,
	CREATE_USER_REQUESTED,
	CREATE_USER_FULFILLED,
	CREATE_USER_REJECTED,
	UPDATE_USER_REQUESTED,
	UPDATE_USER_FULFILLED,
	UPDATE_USER_REJECTED,
	CHANGE_STATUS_USER_REQUESTED,
	CHANGE_STATUS_USER_FULFILLED,
	CHANGE_STATUS_USER_REJECTED,
} from '../actions/user.action'

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
	updateUser: {
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
	}
}

const user = (state = initialState, action) => {
	switch(action.type) {
		case GET_USER_LIST_REQUESTED: {
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

		case GET_USER_LIST_FULFILLED: {
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

		case GET_USER_LIST_REJECTED: {
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

		case GET_USER_DETAIL_REQUESTED: {
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

		case GET_USER_DETAIL_FULFILLED: {
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

		case GET_USER_DETAIL_REJECTED: {
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

		case CREATE_USER_REQUESTED: {
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

		case CREATE_USER_FULFILLED: {
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

		case CREATE_USER_REJECTED: {
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

		case UPDATE_USER_REQUESTED: {
			return {
				...state,
				updateUser: {
					...state.updateUser,
					data: {},
					isUpdated: false,
					isError: false,
					error: {}
				}
			}
		}

		case UPDATE_USER_FULFILLED: {
			return {
				...state,
				updateUser: {
					...state.updateUser,
					data: action.payload,
					isUpdated: true,
					isError: false,
					error: {}
				}
			}
		}

		case UPDATE_USER_REJECTED: {
			return {
				...state,
				updateUser: {
					...state.updateUser,
					data: {},
					isUpdated: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case CHANGE_STATUS_USER_REQUESTED: {
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

		case CHANGE_STATUS_USER_FULFILLED: {
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

		case CHANGE_STATUS_USER_REJECTED: {
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

		default: {
			return state;
		}
	}
}

export default user;
