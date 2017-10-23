import {
    REQUEST_CAFE_MENU,
    GET_CAFE_MENU_FULFILLED,
    GET_CAFE_MENU_REJECTED,
    REQUEST_CAFE_TYPES,
    GET_CAFE_TYPES_FULFILLED,
    GET_CAFE_TYPES_REJECTED
} from '../actions/cafe.action';

const initialState = {
	menu: {},
	types: {},
	isFetching: false,
	isLoaded: false,
	error: {}
}

const cafe = (state = initialState, action) => {
	switch(action.type) {
		case REQUEST_CAFE_MENU: {
			return {
				...state,
				isFetching: true,
				isLoaded: false
			}
		}
		case GET_CAFE_MENU_FULFILLED: {
			return {
				...state,
				menu: action.payload.data,
				isFetching: false,
				isLoaded: true
			}
		}
		case GET_CAFE_MENU_REJECTED: {
			return {
				...state,
				menu: {},
				isFetching: false,
				isLoaded: false,
				error: action.payload
			}
		}

		//
		case REQUEST_CAFE_TYPES: {
			return {
				...state,
				isFetching: true,
				isLoaded: false
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

		default: {
			return state;
		}
	}
}

export default cafe;
