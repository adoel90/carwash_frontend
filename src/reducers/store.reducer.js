import {
	GET_STORE_LIST_REQUESTED, //GET STORE LIST
	GET_STORE_LIST_FULFILLED,
	GET_STORE_LIST_REJECTED,

	GET_MENU_LIST_STORE_REQUESTED, //GET MENU LIST STORE
	GET_MENU_LIST_STORE_FULFILLED,
	GET_MENU_LIST_STORE_REJECTED,
 
	CREATE_MENU_TRANSACTION_FULFILLED, //CREATE MENU TRANSACTION
	CREATE_MENU_TRANSACTION_REJECTED,

	GET_PRINT_STORE_TRANSACTION_REQUESTED, //GET PRINT STORE TRANSACTION
	GET_PRINT_STORE_TRANSACTION_FULFILLED,
	GET_PRINT_STORE_TRANSACTION_REJECTED

} from '../actions/store.action';

const initialState = {

    store: {
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	},
	storemenu: {
		id:null,
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false,
		error:{}
	},
	transaction: {
		data: {},
		isPaying: false,
		isPaid: false,
		isError: false,
		error: {}
	},
	print: {
		data: {},
		isPrinting: false,
		isPrinted: false,
		isError: false,
		error: {}
	}
}

const storeState = (state = initialState, action) => {

    switch(action.type) {

		//GET STORE LIST
        case GET_STORE_LIST_REQUESTED: {
			return {
				...state,
				store: {
					...state.store,
					data: {},
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_STORE_LIST_FULFILLED: {
			return {
				...state,
				store: {
					...state.store,
					data: action.payload,
					isLoaded: true,
					isFetching: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_STORE_LIST_REJECTED: {
			return {
				...state,
				store: {
					...state.store,
					data: {},
					isLoaded: false,
					isFetching: false,
					isError: true,
					error: action.payload
				}
			}
		}
		
		//GET MENU LIST STORE
		case GET_MENU_LIST_STORE_REQUESTED: {
			return {
				...state,
				storemenu: {
					...state.storemenu,
					data: {},
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_MENU_LIST_STORE_FULFILLED: {
			
			return {
				...state,
				storemenu: {
					...state.storemenu,
					data: action.payload,
					isLoaded: true,
					isFetching: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_MENU_LIST_STORE_REJECTED: {
			return {
				...state,
				storemenu: {
					...state.storemenu,
					data: {},
					isLoaded: false,
					isFetching: false,
					isError: true,
					error: action.payload
				}
			}
		}

		//CREATE MENU TRANSACTION
		case CREATE_MENU_TRANSACTION_FULFILLED: {
			return {
				...state,
				transaction: {
					...state.transaction,
					data: action.payload,
					isPaid: true,
					isError: false,
					error: {}
				}
			}
		}

		case CREATE_MENU_TRANSACTION_REJECTED: {
			return {
				...state,
				transaction: {
					...state.transaction,
					data: {},
					isPaid: false,
					isError: true,
					error: action.payload
				}
			}
		}

		//GET PRINT STORE TRANSACTION
		case GET_PRINT_STORE_TRANSACTION_REQUESTED: {
			return {
				...state,
				print: {
					...state.print,
					data: {},
					isPrinting: true,
					isPrinted: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_PRINT_STORE_TRANSACTION_FULFILLED: {
			return {
				...state,
				print: {
					...state.print,
					data: action.payload,
					isPrinting: false,
					isPrinted: true,
					isError: false,
					error: {}
				}
			}
		}

		case GET_PRINT_STORE_TRANSACTION_REJECTED: {
			return {
				...state,
				print: {
					...state.print,
					data: {},
					isPrinting: false,
					isPrinted: false,
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

export default storeState;