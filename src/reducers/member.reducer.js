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
	MEMBER_LOGOUT_FULFILLED
} from '../actions/member.action'

const initialState = {
	data: {},
	list: {},
	accessToken: '',
	isLoading: false,
	isLoaded: false,
	error: {},
}

const member = (state = initialState, action) => {
	switch(action.type) {
		case RESET_MEMBER_DATA: {
			return initialState
		}

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
				error: action.payload
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
				error: action.payload
			}
		}

		case GET_MEMBER_LIST_REQUESTED: {
			return {
				...state,
				isLoading: true,
				isLoaded: false
			}
		}

		case GET_MEMBER_LIST_FULFILLED: {
			return {
				...state,
				list: action.payload,
				isLoading: false,
				isLoaded: true,
				error: {}
			}
		}

		case GET_MEMBER_LIST_REJECTED: {
			return {
				...state,
				list: {},
				isLoading: false,
				isLoaded: false,
				error: action.payload
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
				isLoaded: true,
				isLoading: false,
				error: {}
			}
		}

		case CREATE_MEMBER_REJECTED: {
			return {
				...state,
				data: {},
				isLoaded: false,
				error: action.payload
			}
		}

		case UPDATE_MEMBER_FULFILLED: {
			return {
				...state,
				data: action.payload,
				error: {}
			}
		}

		case UPDATE_MEMBER_REJECTED: {
			return {
				...state,
				data: {},
				error: action.payload
			}
		}

		case MEMBER_LOGOUT_FULFILLED: {
			return state;
		}

		default: {
			return state;
		}
	}
}

export default member;
