import {
	GET_ALL_CARD_TYPE_REQUESTED,
	GET_ALL_CARD_TYPE_FULFILLED,
	GET_ALL_CARD_TYPE_REJECTED,
} from '../actions/card.action';

const initialState = {
	list: {},
	isFetching: false,
	isLoaded: false,
	isError: false,
	error: {}
}

const card = (state = initialState, action) => {
	switch(action.type) {
		case GET_ALL_CARD_TYPE_REQUESTED: {
			return {
				...state,
				isFetching: true,
				isLoaded: false
			}
		}

		case GET_ALL_CARD_TYPE_FULFILLED: {
			return {
				...state,
				list: action.payload,
				isFetching: false,
				isLoaded: true,
				error: {}
			}
		}

		case GET_ALL_CARD_TYPE_REJECTED: {
			return {
				...state,
				list: {},
				isFetching: false,
				isLoaded: false,
				isError: true,
				error: action.payload
			}
		}

		default: {
			return state;
		}
	}
}

export default card;
