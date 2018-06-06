import {
	AUTHENTICATE_MEMBER_REQUESTED,
	AUTHENTICATE_MEMBER_FULFILLED,
	AUTHENTICATE_MEMBER_REJECTED,

	MEMBER_TOPUP_FULFILLED,
	MEMBER_TOPUP_REJECTED,

	MEMBER_REFUND_REQUESTED,
	MEMBER_REFUND_FULFILLED,
	MEMBER_REFUND_REJECTED,

	GET_MEMBER_LIST_REQUESTED,
	GET_MEMBER_LIST_FULFILLED,
	GET_MEMBER_LIST_REJECTED,
	GET_MEMBER_DETAIL_REQUESTED,
	GET_MEMBER_DETAIL_FULFILLED,
	GET_MEMBER_DETAIL_REJECTED,

	CREATE_MEMBER_FULFILLED,
	CREATE_MEMBER_REJECTED,


	UPDATE_MEMBER_REQUESTED,
	UPDATE_MEMBER_FULFILLED,
	UPDATE_MEMBER_REJECTED,

	CHANGE_MEMBER_STATUS_REQUESTED,
	CHANGE_MEMBER_STATUS_FULFILLED,
	CHANGE_MEMBER_STATUS_REJECTED,

	LOGOUT_MEMBER_FULFILLED,
	LOGOUT_MEMBER_REJECTED,

	//GET MEMBER DETAIL HISTORIS
	GET_MEMBER_DETAIL_HISTORIS_REQUESTED,
	GET_MEMBER_DETAIL_HISTORIS_FULFILLED,
	GET_MEMBER_DETAIL_HISTORIS_REJECTED

} from '../actions/member.action'

const initialState = {
	item: {
		id: null,
		data: {},
		accessToken: '',
		isAuthenticating: false,
		isAuthenticated: false,
		isFetching: false,
		isLoaded: false,
		isUpdating: false,
		isUpdated: false,
		isStatusChanging: false,
		isStatusChanged: false,
		isBalanceChanging: false,
		isBalanceChanged: false,
		isCreating: false,
		isCreated: false,
		isError: false,
		isRefunding: false,
		isRefunded: false,
		error: {}

	},
	list: {
		data: [],
		isLoaded: false,
		isFetching: false,
		isError: false,
		error: {}
	},
	memberCreated: {
		data: {},
		isCreated: false,
		isError: false,
		error: {}
	},
	memberHistoris: {
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	},
	memberRefund:{
		data: {},
		isRefunding: false,
		isRefunded: false,
		isError: false,
		error: {}
	}

}

const member = (state = initialState, action) => {
	switch(action.type) {
		case AUTHENTICATE_MEMBER_REQUESTED: {
			return {
				...state,
				item: {
					...state.item,
					data: {},
					accessToken: null,
					isAuthenticating: true,
					isAuthenticated: false,
					isError: false,
					error: {}
				}
			}
		}

		case AUTHENTICATE_MEMBER_FULFILLED: {
			return {
				...state,
				item: {
					...state.item,
					data: action.payload.member,
					accessToken: action.payload.accessToken,
					isAuthenticating: false,
					isAuthenticated: true,
					isError: false,
					error: {}
				}
			}
		}

		case AUTHENTICATE_MEMBER_REJECTED: {
			return {
				...state,
				item: {
					...state.item,
					isAuthenticating: false,
					isAuthenticated: false,
					isError: true,
					error: action.payload
				}
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
					data: action.payload,
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

		case GET_MEMBER_DETAIL_REQUESTED: {
			return {
				...state,
				item: {
					...state.item,
					data: {},
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_MEMBER_DETAIL_FULFILLED: {
			return {
				...state,
				item: {
					...state.item,
					data: action.payload,
					isFetching: false,
					isLoaded: true,
					isError: false,
					error: {}
				}
			}
		}

		case GET_MEMBER_DETAIL_REJECTED: {
			return {
				...state,
				item: {
					...state.item,
					data: {},
					isFetching: false,
					isLodaed: false,
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

		//#Update Member
		case UPDATE_MEMBER_REQUESTED: {
			return {
				...state,
				item: {
					...state.item,
					data: {},
					isUpdated: false,
					isError: false,
					error: {}
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

		case MEMBER_REFUND_REQUESTED: {
			return {
				...state,
				memberRefund: {
					...state.memberRefund,
					data: {},
					isRefunding: true,
					isRefunded: false,
					isError: false,
					error: {}
				}
			}
		}

		case MEMBER_REFUND_FULFILLED: {
			return {
				...state,
				memberRefund: {
					...state.memberRefund,
					data: action.payload.data,
					isRefunding: false,
					isRefunded: true,
					isError: false,
					error: {}
				}
			}
		}

		case MEMBER_REFUND_REJECTED: {
			return {
				...state,
				memberRefund: {
					...state.memberRefund,
					data: {},
					isRefunding: false,
					isRefunded: false,
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
					data: {},
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

		//GET MEMBER DETAIL HISTORIS
		case GET_MEMBER_DETAIL_HISTORIS_REQUESTED: {
			return {
				...state,
				memberHistoris: {
					...state.memberHistoris,
					data: {},
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_MEMBER_DETAIL_HISTORIS_FULFILLED: {
			return {
				...state,
				memberHistoris: {
					...state.memberHistoris,
					data: action.payload,
					isLoaded: true,
					isFetching: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_MEMBER_DETAIL_HISTORIS_REJECTED: {
			return {
				...state,
				memberHistoris: {
					...state.memberHistoris,
					data: {},
					isLoaded: false,
					isFetching: false,
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
