import {
	RESET_MEMBER_DATA,
	AUTHENTICATE_MEMBER_FULFILLED,
	AUTHENTICATE_MEMBER_REJECTED,
	MEMBER_TOPUP_FULFILLED,
	MEMBER_TOPUP_REJECTED,
	GET_MEMBER_LIST_REQUESTED,
	GET_MEMBER_LIST_FULFILLED,
	GET_MEMBER_LIST_REJECTED,
	UPDATE_MEMBER_REQUESTED,
	UPDATE_MEMBER_FULFILLED,
	UPDATE_MEMBER_REJECTED,
	CREATE_MEMBER_REQUESTED,
	CREATE_MEMBER_FULFILLED,
	CREATE_MEMBER_REJECTED,
	DELETE_MEMBER_FULFILLED,
	DELETE_MEMBER_REJECTED,
	LOGOUT_MEMBER_FULFILLED,
	LOGOUT_MEMBER_REJECTED
} from '../actions/member.action'

const initialState = {
	data: {},
	list: {},
	accessToken: '',
	isFetching: false,
	isLoaded: false,
	isError: false,
	isUpdated: false,
	error: {},
}

const member = (state = initialState, action) => {
	switch(action.type) {
		case AUTHENTICATE_MEMBER_FULFILLED: {
			return {
				...state,
				data: action.payload.member,
				accessToken: action.payload.accessToken,
				error: {}
			}
		}

		case AUTHENTICATE_MEMBER_REJECTED: {
			return {
				...state,
				data: {},
				accessToken: '',
				error: action.payload,
				isError: true
			}
		}

		case MEMBER_TOPUP_FULFILLED: {
			return {
				...state
			}
		}

		case MEMBER_TOPUP_REJECTED: {
			return {
				...state,
				error: action.payload,
				isError: true
			}
		}

		case GET_MEMBER_LIST_REQUESTED: {
			return {
				...state,
				isFetching: true,
				isLoaded: false
			}
		}

		case GET_MEMBER_LIST_FULFILLED: {
			return {
				...state,
				list: action.payload,
				isFetching: false,
				isLoaded: true,
				error: {}
			}
		}

		case GET_MEMBER_LIST_REJECTED: {
			return {
				...state,
				list: {},
				isFetching: false,
				isLoaded: false,
				error: action.payload,
				isError: true
			}
		}

		case CREATE_MEMBER_REQUESTED: {
			return {
				...state,
				isLoaded: false,
				isLoading: false
			}
		}

		case CREATE_MEMBER_FULFILLED: {
			return {
				...state,
				data: action.payload,
				error: {}
			}
		}

		case CREATE_MEMBER_REJECTED: {
			return {
				...state,
				data: {},
				error: action.payload,
				isError: true
			}
		}

		case UPDATE_MEMBER_FULFILLED: {
			return {
				...state,
				data: action.payload,
				isError: false,
			}
		}

		case UPDATE_MEMBER_REJECTED: {
			return {
				...state,
				data: {},
				error: action.payload,
			}
		}

		case DELETE_MEMBER_FULFILLED: {
			return {
				...state,
				data: action.payload,
				error: {},
			}
		}

		case DELETE_MEMBER_REJECTED: {
			return {
				...state,
				data: {},
				error: action.payload,
			}
		}

		case RESET_MEMBER_DATA: {
			return state;
		}

		case LOGOUT_MEMBER_FULFILLED: {
			return state;
		}

		default: {
			return state;
		}
	}
}

export default member;
