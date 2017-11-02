import {
	LOGIN_REQUESTED,
	LOGIN_FULFILLED,
	LOGIN_REJECTED
} from '../actions/user.action'

const initialState = {
	accessToken: '',
	user: {},
	isLoggingIn: false,
	isAuthenticated: false,
	error: {}
}

const authentication = (state = initialState, action) => {
	switch(action.type) {
		case LOGIN_REQUESTED: {
			return {
				...state,
				isLoggingIn: true,
				isAuthenticated: false
			}
		}

		case LOGIN_FULFILLED: {
			return {
				...state,
				isLoggingIn: false,
				isAuthenticated: true,
				user: action.payload.user,
				accessToken: action.payload.accessToken,
			}
		}

		case LOGIN_REJECTED: {
			return {
				...state,
				isLoggingIn: false,
				isAuthenticated: false,
				user: {},
				accessToken: '',
				error: action.payload
			}
		}

		default: {
			return state;
		}
	}
}

export default authentication;
