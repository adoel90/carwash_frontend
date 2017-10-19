const initialState = {
	services: [],
	isFetching: false,
	isLoaded: false,
	error: {}
}

const Service = (state = initialState, action) => {
	switch(action.type) {
		case "GET_SERVICES_REQUESTING": {
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
	}

	return state;
}

export default Service;
