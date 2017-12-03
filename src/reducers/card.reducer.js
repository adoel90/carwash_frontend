import {
	GET_ALL_CARD_TYPE_REQUESTED,
	GET_ALL_CARD_TYPE_FULFILLED,
	GET_ALL_CARD_TYPE_REJECTED,
	CREATE_CARD_TYPE_FULFILLED,
	CREATE_CARD_TYPE_REJECTED,
	UPDATE_CARD_TYPE_FULFILLED,
	UPDATE_CARD_TYPE_REJECTED,
	CHANGE_CARD_TYPE_STATUS_FULFILLED,
	CHANGE_CARD_TYPE_STATUS_REJECTED,
} from '../actions/card.action';

const initialState = {
	list: {
		data: [],
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	},
	created: {
		data: {},
		isCreated: false,
		isError: false,
		error: {}
	},
	updated: {
		data: {},
		id: null,
		isUpdated: false,
		isStatusChanged: false,
		isError: false,
		error: {}
	},
}

const card = (state = initialState, action) => {
	switch(action.type) {
		case GET_ALL_CARD_TYPE_REQUESTED: {
			return {
				...state,
				list: {
					...state.list,
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_ALL_CARD_TYPE_FULFILLED: {
			return {
				...state,
				list: {
					...state.list,
					data: action.payload.data,
					isFetching: false,
					isLoaded: true,
					isError: false,
					error: {}
				}
			}
		}

		case GET_ALL_CARD_TYPE_REJECTED: {
			return {
				...state,
				list: {
					...state.list,
					isFetching: false,
					isLoaded: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case CREATE_CARD_TYPE_FULFILLED: {
			return {
				...state,
				created: {
					...state.created,
					data: action.payload,
					isCreated: true,
					isError: false,
					error: {}
				}
			}
		}

		case CREATE_CARD_TYPE_REJECTED: {
			return {
				...state,
				created: {
					...state.created,
					isCreated: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case UPDATE_CARD_TYPE_FULFILLED: {
			return {
				...state,
				updated: {
					...state.updated,
					isUpdated: true,
					isError: false,
					error: {}
				}
			}
		}

		case UPDATE_CARD_TYPE_REJECTED: {
			return {
				...state,
				updated: {
					...state.updated,
					isUpdated: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case CHANGE_CARD_TYPE_STATUS_FULFILLED: {
			return {
				...state,
				updated: {
					...state.updated,
					id: action.id,
					data: action.payload,
					isStatusChanged: true,
					isError: false,
					error: {}
				}
			}
		}

		case CHANGE_CARD_TYPE_STATUS_REJECTED: {
			return {
				...state,
				updated: {
					...state.updated,
					isStatusChanged: false,
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

export default card;
