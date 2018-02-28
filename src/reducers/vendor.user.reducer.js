//vendor.user.reducer.js
import {
	GET_VENDOR_USER_LIST_REQUESTED,
	GET_VENDOR_USER_LIST_FULFILLED,
	GET_VENDOR_USER_LIST_REJECTED,
	CREATE_NEW_VENDOR_FULFILLED,
	CREATE_NEW_VENDOR_REJECTED,

	GET_VENDOR_DETAIL_REQUESTED,// Get Vendor Detail
	GET_VENDOR_DETAIL_FULFILLED,
	GET_VENDOR_DETAIL_REJECTED,

	GET_MENU_VENDOR_LIST_REQUESTED,//Get Menu Vendor List
	GET_MENU_VENDOR_LIST_FULFILLED,
	GET_MENU_VENDOR_LIST_REJECTED,

	GET_EMPLOYEE_VENDOR_LIST_REQUESTED,//Get List Vendor Employee 
	GET_EMPLOYEE_VENDOR_LIST_FULFILLED,
	GET_EMPLOYEE_VENDOR_LIST_REJECTED

} from '../actions/vendor.action'

const initialState = {

	item: {
		data: {},
		isCreated: false,
		isError: false,
		error: {}
	},
	list: {
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	},
}

const vendorState = (state = initialState, action) => {
	
	switch(action.type) {

		case GET_VENDOR_USER_LIST_REQUESTED: {
			return {
				...state,
				list: {
					...state.list,
					data: {},
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_VENDOR_USER_LIST_FULFILLED: {
			return {
				...state,
				list: {
					...state.list,
					data: action.payload,
					isLoaded: true,
					isFetching: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_VENDOR_USER_LIST_REJECTED: {
			return {
				...state,
				list: {
					...state.list,
					data: {},
					isLoaded: false,
					isFetching: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case CREATE_NEW_VENDOR_FULFILLED: {
			
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

		case CREATE_NEW_VENDOR_REJECTED: {
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

		//Get Vendor Detail
		case GET_VENDOR_DETAIL_REQUESTED: {
			return {
				...state,
				list: {
					...state.list,
					data: {},
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_VENDOR_DETAIL_FULFILLED: {
			return {
				...state,
				list: {
					...state.list,
					data: action.payload,
					isLoaded: true,
					isFetching: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_VENDOR_DETAIL_REJECTED: {
			return {
				...state,
				list: {
					...state.list,
					data: {},
					isLoaded: false,
					isFetching: false,
					isError: true,
					error: action.payload
				}
			}
		}

		//Get Vendor Menu List
		case GET_MENU_VENDOR_LIST_REQUESTED: {
			return {
				...state,
				list: {
					...state.list,
					data: {},
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_MENU_VENDOR_LIST_FULFILLED: {
			return {
				...state,
				list: {
					...state.list,
					data: action.payload,
					isLoaded: true,
					isFetching: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_MENU_VENDOR_LIST_REJECTED: {
			return {
				...state,
				list: {
					...state.list,
					data: {},
					isLoaded: false,
					isFetching: false,
					isError: true,
					error: action.payload
				}
			}
		}

		//Get List Vendor Employee 
		case GET_EMPLOYEE_VENDOR_LIST_REQUESTED: {
			return {
				...state,
				list: {
					...state.list,
					data: {},
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_EMPLOYEE_VENDOR_LIST_FULFILLED: {
			return {
				...state,
				list: {
					...state.list,
					data: action.payload,
					isLoaded: true,
					isFetching: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_EMPLOYEE_VENDOR_LIST_REJECTED: {
			return {
				...state,
				list: {
					...state.list,
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

export default vendorState;
