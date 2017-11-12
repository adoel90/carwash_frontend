import {
	GET_CAFE_MENU_LIST_REQUESTED,
	GET_CAFE_MENU_LIST_FULFILLED,
	GET_CAFE_MENU_LIST_REJECTED,
	CREATE_CAFE_MENU_FULFILLED,
	CREATE_CAFE_MENU_REJECTED,
	UPDATE_CAFE_MENU_FULFILLED,
	UPDATE_CAFE_MENU_REJECTED,
	GET_CAFE_TYPES_REQUESTED,
	GET_CAFE_TYPES_FULFILLED,
	GET_CAFE_TYPES_REJECTED
} from '../actions/cafe.action';

const initialState = {
	list: {},
	menu: {},
	types: {},
	isFetching: false,
	isLoaded: false,
	error: {}
}

const cafe = (state = initialState, action) => {
	switch(action.type) {
		case GET_CAFE_MENU_LIST_REQUESTED: {
			return {
				...state,
				isFetching: true,
				isLoaded: false
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
		case CREATE_CAFE_MENU_FULFILLED: {
			return {
				...state,
				menu: action.payload,
				error: {}
			}
		}

		case CREATE_CAFE_MENU_REJECTED: {
			return {
				...state,
				menu: {},
				error: action.payload
			}
		}

		//
		case UPDATE_CAFE_MENU_FULFILLED: {
			return {
				...state,
				menu: action.payload,
				error: {}
			}
		}

		case UPDATE_CAFE_MENU_REJECTED: {
			return {
				...state,
				menu: {},
				error: action.payload
			}
		}

		//
		case GET_CAFE_TYPES_REQUESTED: {
			return {
				...state,
				isFetching: true,
				isLoaded: false
			}
		}

		case GET_CAFE_TYPES_FULFILLED: {
			return {
				...state,
				types: action.payload,
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

		default: {
			return state;
		}
	}
}

export default cafe;
