import {
	GET_ALL_CARD_TYPE_REQUESTED,
	GET_ALL_CARD_TYPE_FULFILLED,
	GET_ALL_CARD_TYPE_REJECTED,
	CREATE_CARD_TYPE_FULFILLED,
	CREATE_CARD_TYPE_REJECTED,
	UPDATE_CARD_TYPE_FULFILLED,
	UPDATE_CARD_TYPE_REJECTED,
	CHANGE_CARD_TYPE_STATUS_REQUESTED,
	CHANGE_CARD_TYPE_STATUS_FULFILLED,
	CHANGE_CARD_TYPE_STATUS_REJECTED,

	CREATE_STOCK_LIST_NEW_CARD_FULFILLED, //#Create Stock List New Card
	CREATE_STOCK_LIST_NEW_CARD_REJECTED


} from '../actions/card.action';

const initialState = {
	types: {
		data: [],
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	},
	type: {
		data: {},
		isUpdating: false,
		isUpdated: false,
		isCreating: false,
		isCreated: false,
		isStatusChanging: false,
		isStatusChanged: false,
		isError: false,
		error: {}
	},
	list : {
		data: {},
		isCreating: false,
		isCreated: false,
		isError: false,
		error: {}
	}
}

const card = (state = initialState, action) => {
	switch(action.type) {
		case GET_ALL_CARD_TYPE_REQUESTED: {
			return {
				...state,
				types: {
					...state.types,
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
				types: {
					...state.types,
					data: action.payload,
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
				types: {
					...state.types,
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
				type: {
					...state.type,
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
				type: {
					...state.type,
					isCreated: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case UPDATE_CARD_TYPE_FULFILLED: {
			return {
				...state,
				type: {
					...state.type,
					isUpdated: true,
					isError: false,
					error: {}
				}
			}
		}

		case UPDATE_CARD_TYPE_REJECTED: {
			return {
				...state,
				type: {
					...state.type,
					isUpdated: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case CHANGE_CARD_TYPE_STATUS_REQUESTED: {
			return {
				...state,
				type: {
					...state.type,
					id: action.id,
					data: {},
					isStatusChanging: true,
					isStatusChanged: false,
					isError: false,
					error: {}
				}
			}
		}

		case CHANGE_CARD_TYPE_STATUS_FULFILLED: {
			return {
				...state,
				type: {
					...state.type,
					id: action.id,
					data: action.payload,
					isStatusChanging: false,
					isStatusChanged: true,
				}
			}
		}

		case CHANGE_CARD_TYPE_STATUS_REJECTED: {
			return {
				...state,
				type: {
					...state.type,
					id: action.id,
					data: {},
					isStatusChanging: false,
					isStatusChanged: false,
					isError: true,
					error: action.payload
				}
			}
		}

		//#Create Stock List New Card
		case CREATE_STOCK_LIST_NEW_CARD_FULFILLED: {
			return {
				...state,
				list: {
					...state.list,
					data: action.payload,
					isCreated: true,
					isError: false,
					error: {}
				}
			}
		}

		case CREATE_STOCK_LIST_NEW_CARD_REJECTED: {
			return {
				...state,
				list: {
					...state.list,
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

export default card;
