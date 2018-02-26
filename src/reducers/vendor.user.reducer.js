//vendor.user.reducer.js
import {
	GET_VENDOR_USER_LIST_REQUESTED,
	GET_VENDOR_USER_LIST_FULFILLED,
	GET_VENDOR_USER_LIST_REJECTED,
	CREATE_NEW_VENDOR_FULFILLED,
	CREATE_NEW_VENDOR_REJECTED
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

const vendorUser = (state = initialState, action) => {
	
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

		default: {
			return state;
		}
	}
}

export default vendorUser;
