import {
	AUTHENTICATE_MEMBER_FULFILLED,
	AUTHENTICATE_MEMBER_REJECTED,
	GET_MEMBER_LIST_FULFILLED,
	GET_MEMBER_LIST_REJECTED
} from '../actions/member.action'

const initialState = {
	data: null,
	memberList: null,
	accessToken: '',
	error: null
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

		case GET_MEMBER_LIST_FULFILLED: {
			return {
				...state,
				memberList: action.payload,
				error: null
			}
		}

		case GET_MEMBER_LIST_REJECTED: {
			return {
				...state,
				memberList: null,
				error: action.payload
			}
		}

		default: {
			return state;
		}
	}
}

export default member;
