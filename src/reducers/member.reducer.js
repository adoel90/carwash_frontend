import {
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
	createdMember: {},
	updatedMember: {},
	deletedMember: {},
	accessToken: '',
	isFetching: false,
	isLoaded: false,
	isAuthenticated: false,
	isUpdated: false,
	isCreated: false,
	isDeleted: false,
	isError: false,
	error: {},
}

const member = (state = initialState, action) => {
	switch(action.type) {
		case AUTHENTICATE_MEMBER_FULFILLED: {
			return {
				...state,
				data: action.payload.member,
				accessToken: action.payload.accessToken,
				isLoaded: true,
				isAuthenticated: true,
				isError: false,
				error: {}
			}
		}

		case AUTHENTICATE_MEMBER_REJECTED: {
			return {
				...state,
				data: {},
				accessToken: '',
				error: action.payload,
				isAuthenticated: false,
				isLoaded: false,
				isError: true
			}
		}

		case MEMBER_TOPUP_FULFILLED: {
			return {
				...state,
				topupData: action.payload,
				isTopup: true,
				isError: false,
				error: {}
			}
		}

		case MEMBER_TOPUP_REJECTED: {
			return {
				...state,
				topupData: {},
				isTopup: false,
				isError: true,
				error: action.payload,
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

		case CREATE_MEMBER_FULFILLED: {
			return {
				...state,
				createdMember: action.payload,
				isCreated: true,
				isError: false,
				error: {}
			}
		}

		case CREATE_MEMBER_REJECTED: {
			return {
				...state,
				createdMember: {},
				isCreated: false,
				isError: true,
				error: action.payload,
			}
		}

		case UPDATE_MEMBER_FULFILLED: {
			return {
				...state,
				data: action.payload,
				isUpdated: true,
				isError: false,
			}
		}

		case UPDATE_MEMBER_REJECTED: {
			return {
				...state,
				data: {},
				isUpdated: false,
				isError: true,
				error: action.payload,
			}
		}

		case DELETE_MEMBER_FULFILLED: {
			return {
				...state,
				data: action.payload,
				isDeleted: true,
				error: {},
			}
		}

		case DELETE_MEMBER_REJECTED: {
			return {
				...state,
				data: {},
				isDeleted: false,
				isError: true,
				error: action.payload,
			}
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
