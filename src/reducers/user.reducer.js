import {
	USER_LOGIN_REQUESTED,
	USER_LOGIN_FULFILLED,
	USER_LOGIN_REJECTED,

	GET_USER_LIST_REQUESTED,
	GET_USER_LIST_FULFILLED,
	GET_USER_LIST_REJECTED,
	GET_ALL_USER_LIST_REQUESTED,
	GET_ALL_USER_LIST_FULFILLED,
	GET_ALL_USER_LIST_REJECTED,
	CREATE_USER_REQUESTED,
	CREATE_USER_FULFILLED,
	CREATE_USER_REJECTED,
	UPDATE_USER_REQUESTED,
	UPDATE_USER_FULFILLED,
	UPDATE_USER_REJECTED,
	DELETE_USER_REQESTED,
	DELETE_USER_FULFILLED,
	DELETE_USER_REJECTED,
	
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
	},
	list: {
		data: [],
		rows: 0,
		isFetching: false,
		isLoaded: false,
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

		case GET_USER_LIST_REQUESTED: {
			return {
				...state,
				list: {
					...state.list,
					data: [],
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_USER_LIST_FULFILLED: {
			return {
				...state,
				list: {
					...state.list,
					data: action.payload.user,
					rows: action.payload.row,
					isFetching: false,
					isLoaded: true,
					isError: false,
					error: {}
				}
			}
		}

		case GET_USER_LIST_REJECTED: {
			return {
				...state,
				list: {
					...state.list,
					data: {},
					isFetching: false,
					isLoaded: false,
					isError: true,
					error: action.payload
				}
			}
		}

		default: {
			return state;
		}
	}
}

export default user;
