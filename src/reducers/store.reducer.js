import {
	GET_STORE_LIST_REQUESTED, //GET STORE LIST
	GET_STORE_LIST_FULFILLED,
	GET_STORE_LIST_REJECTED,

	GET_MENU_LIST_STORE_REQUESTED, //GET MENU LIST STORE
	GET_MENU_LIST_STORE_FULFILLED,
	GET_MENU_LIST_STORE_REJECTED


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

        default: {
			return state;
		}
    }
}

export default storeState;