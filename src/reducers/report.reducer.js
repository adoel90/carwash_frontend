import {
	GET_SALES_REPORT_REQUESTED,
	GET_SALES_REPORT_FULFILLED,
	GET_SALES_REPORT_REJECTED,
	GET_TRANSACTION_REPORT_REQUESTED,
	GET_TRANSACTION_REPORT_FULFILLED,
	GET_TRANSACTION_REPORT_REJECTED
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

		default: {
			return state;
		}
	}
}

export default report;
