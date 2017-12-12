import {
	USER_LOGIN_REQUESTED,
	USER_LOGIN_FULFILLED,
	USER_LOGIN_REJECTED,
	USER_LOGOUT_FULFILLED,
	USER_LOGOUT_REJECTED,
} from '../actions/user.action'

const initialState = {
	item: {
		data: {},
		accessToken: '',
		isAuthenticating: false,
		isAuthenticated: false,
		isLoggedOut: false,
		isError: false,
		error: {}
	}
}

const user = (state = initialState, action) => {
	switch(action.type) {
		case USER_LOGIN_REQUESTED: {
			return {
				...state,
				item: {
					...state.item,
					data: {},
					accessToken: '',
					isAuthenticating: true,
					isAuthenticated: false,
					isError: false,
					error: {}
				}
			}
		}

		case USER_LOGIN_FULFILLED: {
			return {
				...state,
				item: {
					...state.item,
					user: action.payload.user,
					accessToken: action.payload.accessToken,
					isAuthenticating: false,
					isAuthenticated: true,
					isError: false,
					error: {}
				}
			}
		}

		case USER_LOGIN_REJECTED: {
			return {
				...state,
				item: {
					...state.item,
					user: {},
					accessToken: '',
					isAuthenticating: false,
					isAuthenticated: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case USER_LOGOUT_FULFILLED: {
			return {
				...state,
				item: {
					...state.item,
					data: {},
					accessToken: '',
					isAuthenticating: false,
					isAuthenticated: false,
					isLoggedOut: true,
					isError: false,
					error: {}
				}
			}
		}

		default: {
			return state;
		}
	}
}

export default user;
