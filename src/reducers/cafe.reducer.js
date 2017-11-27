import {
	GET_CAFE_MENU_LIST_REQUESTED,
	GET_CAFE_MENU_LIST_FULFILLED,
	GET_CAFE_MENU_LIST_REJECTED,
	GET_CAFE_TYPES_REQUESTED,
	GET_CAFE_TYPES_FULFILLED,
	GET_CAFE_TYPES_REJECTED,
	CREATE_CAFE_MENU_FULFILLED,
	CREATE_CAFE_MENU_REJECTED,
	CREATE_CAFE_TRANSACTION_FULFILLED,
	CREATE_CAFE_TRANSACTION_REJECTED,
	UPDATE_CAFE_MENU_FULFILLED,
	UPDATE_CAFE_MENU_REJECTED,
	DELETE_CAFE_MENU_FULFILLED,
	DELETE_CAFE_MENU_REJECTED
} from '../actions/cafe.action';

const initialState = {
	list: {},
	menu: {},
	types: {},
	paid: {},
	updatedMenu: {},
	deletedMenu: {},
	isFetching: false,
	isLoaded: false,
	isCreated: false,
	isUpdated: false,
	isError: false,
	isPaid: false,
	error: {}
}

const cafe = (state = initialState, action) => {
	switch(action.type) {
		case GET_CAFE_MENU_LIST_REQUESTED: {
			return {
				...state,
				isFetching: true
			}
		}
		case GET_CAFE_MENU_LIST_FULFILLED: {
			return {
				...state,
				list: action.payload.data,
				isFetching: false,
				isLoaded: true
			}
		}
		case GET_CAFE_MENU_LIST_REJECTED: {
			return {
				...state,
				list: {},
				isFetching: false,
				isLoaded: false,
				error: action.payload
			}
		}

		//
		case GET_CAFE_TYPES_REQUESTED: {
			return {
				...state,
				isFetching: true
			}
		}

		case GET_CAFE_TYPES_FULFILLED: {
			return {
				...state,
				types: action.payload.data,
				isFetching: false,
				isLoaded: true
			}
		}

		case GET_CAFE_TYPES_REJECTED: {
			return {
				...state,
				types: {},
				isFetching: false,
				isLoaded: false,
				error: action.payload
			}
		}

		//
		case CREATE_CAFE_MENU_FULFILLED: {
			return {
				...state,
				menu: action.payload,
				isCreated: true,
				error: {}
			}
		}

		case CREATE_CAFE_MENU_REJECTED: {
			return {
				...state,
				menu: {},
				isCreated: false,
				isError: true,
				error: action.payload
			}
		}

		//
		case CREATE_CAFE_TRANSACTION_FULFILLED: {
			return {
				...state,
				paid: action.payload,
				isPaid: true,
				error: {}
			}
		}

		case CREATE_CAFE_TRANSACTION_REJECTED: {
			return {
				...state,
				paid: {},
				isPaid: false,
				isError: true,
				error: action.payload
			}
		}

		//
		case UPDATE_CAFE_MENU_FULFILLED: {
			return {
				...state,
				menu: action.payload,
				isUpdated: true,
				isError: false,
				error: {}
			}
		}

		case UPDATE_CAFE_MENU_REJECTED: {
			return {
				...state,
				menu: {},
				isUpdated: false,
				isError: true,
				error: action.payload
			}
		}

		case DELETE_CAFE_MENU_FULFILLED: {
			return {
				...state,
				deletedMenu: action.payload,
				isDeleted: true,
				isError: false,
				error: {}
			}
		}

		default: {
			return state;
		}
	}
}

export default cafe;
