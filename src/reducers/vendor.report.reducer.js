//vendor.report.reducer.js
import {

	GET_REPORT_VENDOR_LIST_REQUESTED,//Get List Report Vendor
	GET_REPORT_VENDOR_LIST_FULFILLED,
	GET_REPORT_VENDOR_LIST_REJECTED

} from '../actions/vendor.report.action'

const initialState = {

	// item: {
	// 	data: {},
	// 	isCreated: false,
	// 	isError: false,
	// 	error: {}
	// },
	// list: {
	// 	data: {},
	// 	isFetching: false,
	// 	isLoaded: false,
	// 	isError: false,
	// 	error: {}
    // }
    
    graph: {
        data: {},
        dataWeek: {},
        dataMonth: {},
        dataYear: {},
        isFetching: false,
        isLoaded: false,
        isError: false,
        error: {}
    },
    summary: {
        data: {},
        isFetching: false,
        isLoaded: false,
        isError: false,
        error: {}
    }
}


const vendorReportState = (state = initialState, action) => {
	
	switch(action.type) {

		//Get List Report Vendor
		case GET_REPORT_VENDOR_LIST_REQUESTED: {
			return {
				...state,
				// list: {
                // 	...state.list,
                summary: {
                    ...state.summary,
					data: {},
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_REPORT_VENDOR_LIST_FULFILLED: {
			return {
				...state,
				summary: {
					...state.summary,
					data: action.payload,
					isLoaded: true,
					isFetching: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_REPORT_VENDOR_LIST_REJECTED: {
			return {
				...state,
				summary: {
					...state.summary,
					data: {},
					isLoaded: false,
					isFetching: false,
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

export default vendorReportState;