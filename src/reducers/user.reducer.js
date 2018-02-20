import {
	GET_USER_LIST_REQUESTED,
	GET_USER_LIST_FULFILLED,
	GET_USER_LIST_REJECTED
} from '../actions/user.action'

const initialState = {
	list: {
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	},
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

		default: {
			return state;
		}
	}
}

export default user;
