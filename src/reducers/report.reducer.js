import {
    GET_TRANSACTION_REPORT_REQUESTED,
    GET_TRANSACTION_REPORT_FULFILLED,
    GET_TRANSACTION_REPORT_REJECTED
} from '../actions/report.action';

const initialState = {
    transactionList: {},
    isFetching: false,
    isLoaded: false,
    isError: false,
    error: {}
}

const report = (state = initialState, action) => {
    switch(action.type) {
        case GET_TRANSACTION_REPORT_REQUESTED: {
            return {
                ...state,
                isFetching: true
            }
        }
        
		case GET_TRANSACTION_REPORT_FULFILLED: {
			return {
                ...state,
                transactionList: action.payload,
                isFetching: false,
                isLoaded: true,
				error: {}
			}
        }
        
        case GET_TRANSACTION_REPORT_REJECTED: {
            return {
                ...state,
                transactionList: {},
                isError: true,
                error: action.payload
            }
        }

        default: {
			return state;
		}
    }
}

export default report;