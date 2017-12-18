import {
	GET_ALL_MODULE_REQUESTED,
	GET_ALL_MODULE_FULFILLED,
	GET_ALL_MODULE_REJECTED
} from '../actions/module.action';

const initialState = {
	list: {
		data: [],
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	}
}

const module = (state = initialState, action) => {
	switch(action.type) {
		case GET_ALL_MODULE_REQUESTED: {
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

		case GET_ALL_MODULE_FULFILLED: {
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

		case GET_ALL_MODULE_REJECTED: {
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

		default: {
			return state;
		}
	}
}

export default module;