import {
	
	GET_ACCESS_LIST_REQUESTED,
	GET_ACCESS_LIST_FULFILLED,
	GET_ACCESS_LIST_REJECTED,
	GET_ACCESS_DETAIL_REQUESTED,
	GET_ACCESS_DETAIL_FULFILLED,
	GET_ACCESS_DETAIL_REJECTED,
	CREATE_NEW_ACCESS_REQUESTED,
	CREATE_NEW_ACCESS_FULFILLED,
	CREATE_NEW_ACCESS_REJECTED,
	UPDATE_ACCESS_REQUESTED,
	UPDATE_ACCESS_FULFILLED,
	UPDATE_ACCESS_REJECTED,
	CHANGE_ACCESS_STATUS_REQUESTED,
	CHANGE_ACCESS_STATUS_FULFILLED,
	CHANGE_ACCESS_STATUS_REJECTED
} from '../actions/access.action';

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
		isUpdated: false,
		isUpdating: false,
		isDetailFetching: false,
		isDetailLoaded: false,
		isStatusChanging: false,
		isStatusChanged: false,
		isError: false,
		error: {}
	},
	new: {
		data: {},
		isCreating: false,
		isCreated: false,
		isError: false,
		error: {}
	}
}

const access = (state = initialState, action) => {
	switch(action.type) {
		case GET_ACCESS_LIST_REQUESTED: {
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

		case GET_ACCESS_LIST_FULFILLED: {
			return {
				...state,
				list: {
					...state.list,
					data: action.payload.data,
					isFetching: false,
					isLoaded: true,
					isError: false,
					error: {}
				}
			}
		}

		case GET_ACCESS_LIST_REJECTED: {
			return {
				...state,
				list: {
					...state.list,
					data: {},
					isFetching: false,
					isLoaded: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case GET_ACCESS_DETAIL_REQUESTED: {
			return {
				...state,
				detail: {
					...state.detail,
					data: {},
					isLoaded: false,
					isFetching: true,
					isError: false,
					error: action.payload
				}
			}
		}

		case GET_ACCESS_DETAIL_FULFILLED: {
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

		case GET_ACCESS_DETAIL_REJECTED: {
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

		case CREATE_NEW_ACCESS_REQUESTED: {
			return {
				...state,
				new: {
					...state.new,
					data: {},
					isCreating: true,
					isCreated: false,
					isError: false,
					error: {}
				}
			}
		}

		case CREATE_NEW_ACCESS_FULFILLED: {
			return {
				...state,
				new: {
					...state.new,
					data: action.payload,
					isCreating: false,
					isCreated: true,
					isError: false,
					error: {}
				}
			}
		}

		case CREATE_NEW_ACCESS_REJECTED: {
			return {
				...state,
				new: {
					...state.new,
					data: {},
					isCreating: false,
					isCreated: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case UPDATE_ACCESS_REQUESTED: {
			return {
				...state,
				item: {
					...state.item,
					data: {},
					isUpdating: true,
					isUpdated: false,
					isError: false,
					error: {}
				}
			}
		}

		case UPDATE_ACCESS_FULFILLED: {
			return {
				...state,
				item: {
					...state.item,
					data: action.payload,
					isUpdating: false,
					isUpdated: true,
					isError: false,
					error: {}
				}
			}
		}

		case UPDATE_ACCESS_REJECTED: {
			return {
				...state,
				item: {
					...state.item,
					data: {},
					isUpdating: false,
					isUpdated: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case CHANGE_ACCESS_STATUS_REQUESTED: {
			return {
				...state,
				item: {
					...state.item,
					data: {},
					id: action.id,
					isStatusChanging: true,
					isStatusChanged: false,
					isError: false,
					error: {}
				}
			}
		}

		case CHANGE_ACCESS_STATUS_FULFILLED: {
			return {
				...state,
				item: {
					...state.item,
					data: action.payload,
					id: action.id,
					isStatusChanging: false,
					isStatusChanged: true,
					isError: false,
					error: {}
				}
			}
		}

		case CHANGE_ACCESS_STATUS_REJECTED: {
			return {
				...state,
				item: {
					...state.item,
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

export default access;

