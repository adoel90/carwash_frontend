import {
	GET_SALES_REPORT_REQUESTED,
	GET_SALES_REPORT_FULFILLED,
	GET_SALES_REPORT_REJECTED,
	GET_TRANSACTION_REPORT_REQUESTED,
	GET_TRANSACTION_REPORT_FULFILLED,
	GET_TRANSACTION_REPORT_REJECTED,
	GET_REPORT_MEMBER_LIST_REQUESTED,
	GET_REPORT_MEMBER_LIST_FULFILLED,
	GET_REPORT_MEMBER_LIST_REJECTED,
	GET_REPORT_MEMBER_GRAPH_REQUESTED,
	GET_REPORT_MEMBER_GRAPH_FULFILLED,
	GET_REPORT_MEMBER_GRAPH_REJECTED,

	GET_REPORT_OWNER_SUPERADMIN_LIST_REQUESTED, //#GET REPORT OWNER SUPERADMIN LIST REQUESTED
	GET_REPORT_OWNER_SUPERADMIN_LIST_FULFILLED,
	GET_REPORT_OWNER_SUPERADMIN_LIST_REJECTED

} from '../actions/report.action';

const initialState = {
	
	transaction: {
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false,
	},
	sales: {
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false,
	},
	member: {
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false
	},
	dashboard: {
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false
	},
	reportOwner: {
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false,
	},
	error: {}
}

const report = (state = initialState, action) => {
	switch(action.type) {
		case GET_SALES_REPORT_REQUESTED: {
			return {
				...state,
				sales: {
					...state.sales,
					isFetching: true,
					isLoaded: false,
					isError: false
				}
			}
		}

		case GET_SALES_REPORT_FULFILLED: {
			return {
				...state,
				sales: {
					...state.sales,
					data: action.payload.data,
					isFetching: false,
					isLoaded: true,
					isError: false
				}
			}
		}

		case GET_SALES_REPORT_REJECTED: {
			return {
				...state,
				sales: {
					...state.sales,
					data: {},
					isFetching: false,
					isLoaded: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case GET_TRANSACTION_REPORT_REQUESTED: {
			return {
				...state,
				transaction: {
					...state.transaction,
					isFetching: true,
					isLoaded: false,
					isError: false
				}
			}
		}

		case GET_TRANSACTION_REPORT_FULFILLED: {
			return {
				...state,
				transaction: {
					...state.transaction,
					data: action.payload.data,
					isFetching: false,
					isLoaded: true,
					isError: false
				}
			}
		}

		case GET_TRANSACTION_REPORT_REJECTED: {
			return {
				...state,
				transaction: {
					...state.transaction,
					data: {},
					isFetching: false,
					isLoaded: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case GET_REPORT_MEMBER_LIST_REQUESTED: {
			return {
				...state,
				member: {
					...state.member,
					isFetching: true,
					isLoaded: false,
					isError: false
				}
			}
		}

		case GET_REPORT_MEMBER_LIST_FULFILLED: {
			return {
				...state,
				member: {
					...state.member,
					data: action.payload,
					isFetching: false,
					isLoaded: true,
					isError: false
				}
			}
		}

		case GET_REPORT_MEMBER_LIST_REJECTED: {
			return {
				...state,
				member: {
					...state.member,
					data: {},
					isFetching: false,
					isLoaded: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case GET_REPORT_MEMBER_GRAPH_REQUESTED: {
			return {
				...state,
				dashboard: {
					...state.dashboard,
					isFetching: true,
					isLoaded: false,
					isError: false
				}
			}
		}

		case GET_REPORT_MEMBER_GRAPH_FULFILLED: {
			return {
				...state,
				dashboard: {
					...state.dashboard,
					data: action.payload,
					isFetching: false,
					isLoaded: true,
					isError: false
				}
			}
		}

		case GET_REPORT_MEMBER_GRAPH_REJECTED: {
			return {
				...state,
				dashboard: {
					...state.dashboard,
					data: {},
					isFetching: false,
					isLoaded: false,
					isError: true,
					error: action.payload
				}
			}
		}

		//#GET REPORT OWNER SUPERADMIN LIST REQUESTED
		case GET_REPORT_OWNER_SUPERADMIN_LIST_REQUESTED: {
			return {
				...state,
				reportOwner: {
					...state.reportOwner,
					isFetching: true,
					isLoaded: false,
					isError: false
				}
			}
		}

		case GET_REPORT_OWNER_SUPERADMIN_LIST_FULFILLED: {
			return {
				...state,
				reportOwner: {
					...state.reportOwner,
					data: action.payload.data,
					isFetching: false,
					isLoaded: true,
					isError: false
				}
			}
		}

		case GET_REPORT_OWNER_SUPERADMIN_LIST_REJECTED: {
			return {
				...state,
				reportOwner: {
					...state.reportOwner,
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

export default report;
