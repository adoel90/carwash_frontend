import {
	
	GET_ACCESS_LIST_REQUESTED,
	GET_ACCESS_LIST_FULFILLED,
	GET_ACCESS_LIST_REJECTED,
} from '../actions/access.action';

const initialState = {
	list: {
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	}
}

const access = (state = initialState, action) => {
	switch(action.type) {
		case GET_ACCESS_LIST_REQUESTED: {
			return {
				...state,
				data: {},
				isFetching: true,
				isLoaded: false,
				isError: false,
				error: {}
			}
		}

		case GET_ACCESS_LIST_FULFILLED: {
			return {
				...state,
				data: action.payload,
				isFetching: false,
				isLoaded: true,
				isError: false,
				error: {}
			}
		}

		case GET_ACCESS_LIST_REJECTED: {
			return {
				...state,
				data: {},
				isFetching: false,
				isLoaded: false,
				isError: true,
				error: action.payload
			}
		}

		default: {
			return state;
		}
	}
}

export default access;

