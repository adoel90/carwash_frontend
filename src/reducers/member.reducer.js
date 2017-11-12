import {
	AUTHENTICATE_MEMBER_FULFILLED,
	AUTHENTICATE_MEMBER_REJECTED,
	MEMBER_TOPUP_FULFILLED,
	MEMBER_TOPUP_REJECTED,
	GET_MEMBER_LIST_FULFILLED,
	GET_MEMBER_LIST_REJECTED,
	CREATE_MEMBER_FULFILLED,
	CREATE_MEMBER_REJECTED
} from '../actions/member.action'

const initialState = {
	data: {},
	list: {},
	error: {}
}

const member = (state = initialState, action) => {
	switch(action.type) {
		case AUTHENTICATE_MEMBER_FULFILLED: {
			return {
				...state,
				data: action.payload.member,
				error: null
			}
		}

		case AUTHENTICATE_MEMBER_REJECTED: {
			return {
				...state,
				data: null,
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

		case GET_MEMBER_LIST_FULFILLED: {
			return {
				...state,
				list: action.payload,
				error: null
			}
		}

		case GET_MEMBER_LIST_REJECTED: {
			return {
				...state,
				list: null,
				error: action.payload
			}
		}

		case CREATE_MEMBER_FULFILLED: {
			return {
				...state,
				new: action.payload,
				error: null
			}
		}

		case CREATE_MEMBER_REJECTED: {
			return {
				...state,
				new: null,
				error: action.payload
			}
		}

		default: {
			return state;
		}
	}
}

export default member;
