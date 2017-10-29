const initialState = {
	users: [],
	isFetching: false,
	isLoaded: false,
	error: {}
}

const User = (state = initialState, action) => {
	switch(action.type) {
		case "GET_USERS_REQUESTING": {
			return {
				...state,
				isFetching: true,
				isLoaded: false
			}
		}
		case "GET_USERS_FULFILLED": {
			return {
				...state,
				users: action.payload,
				isFething: false,
				isLoaded: true
			}
		}
		case "GET_USERS_REJECTED": {
			return {
				...state,
				users: [],
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

export default User;
