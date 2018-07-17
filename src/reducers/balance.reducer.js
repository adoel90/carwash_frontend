import {
	GET_ALL_BALANCE_CARD_REQUESTED,
	GET_ALL_BALANCE_CARD_FULFILLED,
	GET_ALL_BALANCE_CARD_REJECTED,
	CREATE_BALANCE_CARD_FULFILLED,
	CREATE_BALANCE_CARD_REJECTED,
	UPDATE_BALANCE_CARD_REQUESTED,
	UPDATE_BALANCE_CARD_FULFILLED,
	UPDATE_BALANCE_CARD_REJECTED,
	CHANGE_BALANCE_CARD_STATUS_REQUESTED,
	CHANGE_BALANCE_CARD_STATUS_FULFILLED,
	CHANGE_BALANCE_CARD_STATUS_REJECTED,
	DELETE_BALANCE_CARD_FULFILLED,
	DELETE_BALANCE_CARD_REJECTED

} from '../actions/balance.action';

const initialState = {
	list: {
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	},
	balance: {
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
	creating : {
		data: {},
		isCreating: false,
		isCreated: false,
		isError: false,
		error: {}
	},
	delete : {
		data: {},
		isDeleting: false,
		isDeleted: false,
		isError: false,
		error: {}
	}
}

const balance = (state = initialState, action) => {
	switch(action.type) {
		case GET_ALL_BALANCE_CARD_REQUESTED: {
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

		case GET_ALL_BALANCE_CARD_FULFILLED: {
			return {
				...state,
				list: {
					...state.list,
					data: action.payload,
					isFetching: false,
					isLoaded: true,
					isError: false,
					error: {}
				}
			}
		}

		case GET_ALL_BALANCE_CARD_REJECTED: {
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

		case CREATE_BALANCE_CARD_FULFILLED: {
			return {
				...state,
				balance: {
					...state.balance,
					data: action.payload,
					isCreated: true,
					isError: false,
					error: {}
				}
			}
		}

		case CREATE_BALANCE_CARD_REJECTED: {
			return {
				...state,
				balance: {
					...state.balance,
					isCreated: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case UPDATE_BALANCE_CARD_REQUESTED: {
			return {
				...state,
				balance: {
					...state.balance,
					isUpdated: false,
					isError: false,
					error: {}
				}
			}
		}

		case UPDATE_BALANCE_CARD_FULFILLED: {
			return {
				...state,
				balance: {
					...state.balance,
					isUpdated: true,
					isError: false,
					error: {}
				}
			}
		}

		case UPDATE_BALANCE_CARD_REJECTED: {
			return {
				...state,
				balance: {
					...state.balance,
					isUpdated: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case CHANGE_BALANCE_CARD_STATUS_REQUESTED: {
			return {
				...state,
				balance: {
					...state.balance,
					id: action.id,
					data: {},
					isStatusChanging: true,
					isStatusChanged: false,
					isError: false,
					error: {}
				}
			}
		}

		case CHANGE_BALANCE_CARD_STATUS_FULFILLED: {
			return {
				...state,
				balance: {
					...state.balance,
					id: action.id,
					data: action.payload,
					isStatusChanging: false,
					isStatusChanged: true,
				}
			}
		}

		case CHANGE_BALANCE_CARD_STATUS_REJECTED: {
			return {
				...state,
				balance: {
					...state.balance,
					id: action.id,
					data: {},
					isStatusChanging: false,
					isStatusChanged: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case DELETE_BALANCE_CARD_FULFILLED: {
			return {
				...state,
				delete: {
					...state.delete,
					data: action.payload,
					isDeleted: true,
					isError: false,
					error: {}
				}
			}
		}

		case DELETE_BALANCE_CARD_REJECTED: {
			return {
				...state,
				delete: {
					...state.delete,
					isDeleted: false,
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

export default balance;
