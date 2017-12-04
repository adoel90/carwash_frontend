import {
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
	list: {
		data: [],
		isLoaded: false,
		isFetching: false,
		isError: false,
		error: {}
	},
	updated: {
		id: null,
		data: {},
		isUpdated: false,
		isStatusChanging: false,
		isStatusChanged: false,
		isBalanceChanging: false,
		isBalanceChanged: false,
		isError: false,
		error: {}
	},
	created: {
		data: {},
		isCreated: false,
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
		case AUTHENTICATE_MEMBER_FULFILLED: {
			return {
				...state,
				data: action.payload.member,
				accessToken: action.payload.accessToken,
				isLoaded: true,
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
				created: {
					...state.created,
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
				created: {
					...state.created,
					data: {},
					isCreated: false,
					isError: false,
					error: action.payload
				}
			}
		}

		case UPDATE_MEMBER_FULFILLED: {
			return {
				...state,
				updated: {
					...state.updated,
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
				updated: {
					...state.updated,
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
				updated: {
					...state.updated,
					data: action.payload,
					isBalanceChanged: true,
					isError: false,
					error: {}
				}
			}
		}

		case MEMBER_TOPUP_REJECTED: {
			return {
				...state,
				updated: {
					...state.updated,
					data: {},
					isBalanceChanged: false,
					isError: false,
					error: {}
				}
			}
		}

		case CHANGE_MEMBER_STATUS_REQUESTED: {
			return {
				...state,
				updated: {
					...state.updated,
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
				updated: {
					...state.updated,
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
				updated: {
					...state.updated,
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
