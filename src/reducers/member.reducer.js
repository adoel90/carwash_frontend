import {
	AUTHENTICATE_MEMBER_REQUESTED,
	AUTHENTICATE_MEMBER_FULFILLED,
	AUTHENTICATE_MEMBER_REJECTED,
	MEMBER_TOPUP_FULFILLED,
	MEMBER_TOPUP_REJECTED,
	GET_MEMBER_LIST_REQUESTED,
	GET_MEMBER_LIST_FULFILLED,
	GET_MEMBER_LIST_REJECTED,
	CREATE_MEMBER_FULFILLED,
	CREATE_MEMBER_REJECTED,
	UPDATE_MEMBER_REQUESTED,
	UPDATE_MEMBER_FULFILLED,
	UPDATE_MEMBER_REJECTED,
	CHANGE_MEMBER_STATUS_REQUESTED,
	CHANGE_MEMBER_STATUS_FULFILLED,
	CHANGE_MEMBER_STATUS_REJECTED,
	LOGOUT_MEMBER_FULFILLED,
	LOGOUT_MEMBER_REJECTED
} from '../actions/member.action'

const initialState = {
	item: {
		id: null,
		data: {},
		isUpdating: false,
		isUpdated: false,
		isStatusChanging: false,
		isStatusChanged: false,
		isBalanceChanging: false,
		isBalanceChanged: false,
		isCreating: false,
		isCreated: false,
		isError: false,
		error: {}
	},
	list: {
		data: [],
		isLoaded: false,
		isFetching: false,
		isError: false,
		error: {}
	},
	data: {},
	accessToken: '',
	isAuthenticated: false,
	isError: false,
	error: {},
}

const member = (state = initialState, action) => {
	switch(action.type) {
		case AUTHENTICATE_MEMBER_REQUESTED: {
			return {
				...state,
				data: {},
				accessToken: null,
				isAuthenticating: true,
				isAuthenticated: false,
				isError: false,
				error: {}
			}
		}
		
		case AUTHENTICATE_MEMBER_FULFILLED: {
			return {
				...state,
				data: action.payload.member,
				accessToken: action.payload.accessToken,
				isLoaded: true,
				isAuthenticating: false,
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
				isAuthenticating: false,
				isAuthenticated: false,
				isLoaded: false,
				isError: true
			}
		}

		case GET_MEMBER_LIST_REQUESTED: {
			return {
				...state,
				list: {
					...state.list,
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_MEMBER_LIST_FULFILLED: {
			return {
				...state,
				list: {
					...state.list,
					data: action.payload.data,
					isFetching: false,
					isLoaded: true
				}
			}
		}

		case GET_MEMBER_LIST_REJECTED: {
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

		case CREATE_MEMBER_FULFILLED: {
			return {
				...state,
				item: {
					...state.item,
					data: action.payload,
					isCreated: true,
					isError: false,
					error: {}
				}
			}
		}

		case CREATE_MEMBER_REJECTED: {
			return {
				...state,
				item: {
					...state.item,
					data: {},
					isCreated: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case UPDATE_MEMBER_FULFILLED: {
			return {
				...state,
				item: {
					...state.item,
					data: action.payload,
					isUpdated: true,
					isError: false,
					error: {}
				}
			}
		}

		case UPDATE_MEMBER_REJECTED: {
			return {
				...state,
				item: {
					...state.item,
					data: {},
					isUpdated: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case MEMBER_TOPUP_FULFILLED: {
			return {
				...state,
				item: {
					...state.item,
					data: action.payload.data,
					isBalanceChanged: true,
					isError: false,
					error: {}
				}
			}
		}

		case MEMBER_TOPUP_REJECTED: {
			return {
				...state,
				item: {
					...state.item,
					data: {},
					isBalanceChanged: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case CHANGE_MEMBER_STATUS_REQUESTED: {
			return {
				...state,
				item: {
					...state.item,
					id: action.id,
					isStatusChanging: true,
					isStatusChanged: false,
					isError: false,
					error: {}
				}
			}
		}

		case CHANGE_MEMBER_STATUS_FULFILLED: {
			return {
				...state,
				item: {
					...state.item,
					id: action.id,
					data: action.payload,
					isStatusChanging: false,
					isStatusChanged: true,
					isError: false,
					error: {}
				}
			}
		}

		case CHANGE_MEMBER_STATUS_REJECTED: {
			return {
				...state,
				item: {
					...state.item,
					data: {},
					isStatusChanging: false,
					isStatusChanged: false,
					isError: true,
					error: action.payload
				}
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
