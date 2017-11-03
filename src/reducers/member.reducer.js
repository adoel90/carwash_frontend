import {
	AUTHENTICATE_MEMBER_FULFILLED,
	AUTHENTICATE_MEMBER_REJECTED
} from '../actions/member.action'

const initialState = {
	data: null,
	accessToken: '',
	error: null
}

const member = (state = initialState, action) => {
	switch(action.type) {
		case AUTHENTICATE_MEMBER_FULFILLED: {
			return {
				...state,
				data: action.payload.member,
				accessToken: action.payload.accessToken,
				error: null
			}
		}

		case AUTHENTICATE_MEMBER_REJECTED: {
			return {
				...state,
				data: null,
				accessToken: '',
				error: action.payload
			}
		}

		default: {
			return state;
		}
	}
}

export default member;
