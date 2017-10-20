const initialState = {
	services: {},
	types: [],
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
				services: action.payload,
				isFething: false,
				isLoaded: true
			}
		}
		case "GET_SERVICES_REJECTED": {
			return {
				...state,
				services: [],
				isFetching: false,
				isLoaded: false,
				error: action.payload
			}
		}

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
				types: [],
				isFetching: false,
				isLoaded: false,
				error: action.payload
			}
		}
	}

	return state;
}

export default service;
