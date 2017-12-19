import {
	GET_ALL_ACCESS_REQUESTED,
	GET_ALL_ACCESS_FULFILLED,
	GET_ALL_ACCESS_REJECTED,
	UPDATE_ACCESS_REQUESTED,
	UPDATE_ACCESS_FULFILLED,
	UPDATE_ACCESS_REJECTED	
} from '../actions/access.action';

const initialState = {
	list: {
		data: [],
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	},
	item: {
		data: {},
		isUpdated: false,
		isUpdating: false,
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
		case GET_ALL_ACCESS_REQUESTED: {
			return {
				...state,
				list: {
					...state.list,
					data: [],
					isLoaded: false,
					isFetching: true,
					isError: false,
					error: {}
				}
			}
		}

		case GET_ALL_ACCESS_FULFILLED: {
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

		case GET_ALL_ACCESS_REJECTED: {
			return {
				...state,
				list: {
					...state.list,
					data: [],
					isLoaded: false,
					isFetching: false,
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

		default: {
			return state;
		}
	}
}

export default access;

