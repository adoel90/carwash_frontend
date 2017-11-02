import {
	CREATE_MEMBER_FULFILLED,
	CREATE_MEMBER_REJECTED
} from '../actions/member.action';

const initialState = {
	user: {},
	error: {}
}

const member = (state = initialState, action) => {
	switch(action.type) {
		case CREATE_MEMBER_FULFILLED: {
			return {
				...state,
				user: action.payload,
				error: {}
			}
		}

		case CREATE_MEMBER_REJECTED: {
			return {
				...state,
				user: {},
				error: action.payload
			}
		}

		default: {
			return state;
		}
	}
}

export default member;
