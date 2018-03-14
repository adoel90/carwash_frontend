import {
	GET_STORE_LIST_REQUESTED, //GET STORE LIST
	GET_STORE_LIST_FULFILLED,
	GET_STORE_LIST_REJECTED,


} from '../actions/store.action';



const initialState = {

    store: {
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	}
}

const storeState = (state = initialState, action) => {

    switch(action.type) {

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
        
        default: {
			return state;
		}
    }
}

export default storeState;