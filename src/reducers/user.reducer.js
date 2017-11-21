import {
	USER_LOGIN_REQUESTED,
	USER_LOGIN_FULFILLED,
	USER_LOGIN_REJECTED,
	USER_LOGOUT_FULFILLED,
	USER_LOGOUT_REJECTED,
} from '../actions/user.action'

const initialState = {
	user: {},
    accessToken: '',
	isLoggingIn: false,
	isAuthenticated: false,
	isError: false,
	error: {}
}

const user = (state = initialState, action) => {
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
                user: action.payload.user,
				accessToken: action.payload.accessToken,
				isLoggingIn: false,
				isAuthenticated: true,
				isError: false,
				error: {}
			}
		}

		case USER_LOGIN_REJECTED: {
			return {
				...state,
				user: {},
				accessToken: '',
				isError: true,
				isLoggingIn: false,
				isAuthenticated: false,
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

export default user;
