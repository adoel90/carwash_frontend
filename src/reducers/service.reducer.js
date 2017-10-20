const initialState = {
	items: {},
	types: {},
	isFetching: false,
	isLoaded: false,
	error: {}
}

const service = (state = initialState, action) => {
	switch(action.type) {
		case "GET_SERVICES_REQUESTED": {
			return {
				...state,
				isFetching: true,
				isLoaded: false
			}
		}
		case "GET_SERVICES_FULFILLED": {
			return {
				...state,
				items: action.payload,
				isFething: false,
				isLoaded: true
			}
		}
		case "GET_SERVICES_REJECTED": {
			return {
				...state,
				items: {},
				isFetching: false,
				isLoaded: false,
				error: action.payload
			}
		}

		//
		case "GET_SERVICE_TYPE_REQUESTED": {
			return {
				...state,
				isFetching: true,
				isLoaded: false
			}
		}

		case "GET_SERVICE_TYPE_FULFILLED": {
			return {
				...state,
				types: action.payload,
				isFetching: false,
				isLoaded: true
			}
		}

		case "GET_SERVICE_TYPE_ERROR": {
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

export default service;
