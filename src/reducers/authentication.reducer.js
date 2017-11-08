import {
	USER_LOGIN_REQUESTED,
	USER_LOGIN_FULFILLED,
	USER_LOGIN_REJECTED,
	USER_LOGOUT_FULFILLED,
	USER_LOGOUT_REJECTED,
} from '../actions/user.action'

const initialState = {
	accessToken: '',
	user: null,
	isLoggingIn: false,
	isAuthenticated: false,
	error: {}
}

const authentication = (state = initialState, action) => {
	switch(action.type) {
		case USER_LOGIN_REQUESTED: {
			return {
				...state,
				isLoggingIn: true,
				isAuthenticated: false
			}
		}

		case USER_LOGIN_FULFILLED: {
			return {
				...state,
				isLoggingIn: false,
				isAuthenticated: true,
				user: action.payload.user,
				accessToken: action.payload.accessToken,
			}
		}

		case USER_LOGIN_REJECTED: {
			return {
				...state,
				isLoggingIn: false,
				isAuthenticated: false,
				user: {},
				accessToken: '',
				error: action.payload
			}
		}

		case USER_LOGOUT_FULFILLED: {
			return {
				...state,
				isLoggingIn: false,
				isAuthenticated: false,
				user: {},
				accessToken: '',
				error: {}
			}
		}

		default: {
			return state;
		}
	}
}

export default authentication;
