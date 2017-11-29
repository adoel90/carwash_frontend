import {
	GET_ALL_CARD_TYPE_REQUESTED,
	GET_ALL_CARD_TYPE_FULFILLED,
	GET_ALL_CARD_TYPE_REJECTED,
	CREATE_CARD_TYPE_FULFILLED,
	CREATE_CARD_TYPE_REJECTED,
	UPDATE_CARD_TYPE_FULFILLED,
	UPDATE_CARD_TYPE_REJECTED,
	TOGGLE_CARD_TYPE_STATUS_FULFILLED,
	TOGGLE_CARD_TYPE_STATUS_REJECTED,
	DELETE_CARD_TYPE_FULFILLED,
	DELETE_CARD_TYPE_REJECTED
} from '../actions/card.action';

const initialState = {
	list: {},
	newCard: {},
	updatedCard: {},
	deletedCard: {},
	isFetching: false,
	isCreated: false,
	isUpdated: false,
	isDeleted: false,
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

		case CREATE_CARD_TYPE_FULFILLED: {
			return {
				...state,
				newCard: action.payload,
				isCreated: true,
				error: {}
			}
		}

		case CREATE_CARD_TYPE_REJECTED: {
			return {
				...state,
				newCard: {},
				isCreated: false,
				isError: true,
				error: action.payload
			}
		}

		case UPDATE_CARD_TYPE_FULFILLED: {
			return {
				...state,
				updatedCard: action.payload,
				isUpdated: true,
				isError: false,
				error: {}
			}
		}

		case UPDATE_CARD_TYPE_REJECTED: {
			return {
				...state,
				updatedCard: {},
				isUpdated: false,
				isError: true,
				error: action.payload
			}
		}

		case TOGGLE_CARD_TYPE_STATUS_FULFILLED {
			return {
				...state,
				updatedCard: action.payload,
				isStatusUpdated: true,
				isError: false,
				error: {}
			}
		}


		case DELETE_CARD_TYPE_FULFILLED: {
			return {
				...state,
				deletedCard: action.payload,
				isDeleted: true,
				isError: false,
				error: {}
			}
		}

		case DELETE_CARD_TYPE_REJECTED: {
			return {
				...state,
				deletedCard: {},
				isDeleted: false,
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
