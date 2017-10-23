const initialState = {
	items: [],
	isFetching: false,
	isLoaded: false,
	error: {}
}

const member = (state = initialState, action) => {
	switch(action.type) {
		case 'GET_MEMBER_REQUEST': {
			return {
				...state,
				isFetching: true,
				isLoaded: false
			}
		}
		case 'GET_MEMBER_FULFILLED': {
			return {
				...state,
				items: action.payload,
				isFething: false,
				isLoaded: true
			}
		}
		case 'GET_MEMBER_REJECTED': {
			return {
				...state,
				items: {},
				isFetching: false,
				isLoaded: false,
				error: action.payload
			}
		}


		case "ADD_MEMBER_REQUESTING": {
			return {
				...state,
				isFetching: true,
				isLoaded: false
			}
		}
		case "ADD_MEMBER_FULFILLED": {
			return {
				...state,
				items: action.payload,
				isFething: false,
				isLoaded: true
			}
		}
		case "ADD_MEMBER_REJECTED": {
			return {
				...state,
				items: [],
				isFetching: false,
				isLoaded: false,
				error: action.payload
			}
		}


		case "UPDATE_MEMBER_REQUESTING": {
			return {
				...state,
				isFetching: true,
				isLoaded: false
			}
		}
		case "UPDATE_MEMBER_FULFILLED": {
			return {
				...state,
				items: action.payload,
				isFething: false,
				isLoaded: true
			}
		}
		case "UPDATE_MEMBER_REJECTED": {
			return {
				...state,
				items: [],
				isFetching: false,
				isLoaded: false,
				error: action.payload
			}
		}


		case "DELETE_MEMBER_REQUESTING": {
			return {
				...state,
				isFetching: true,
				isLoaded: false
			}
		}
		case "DELETE_MEMBER_FULFILLED": {
			return {
				...state,
				items: action.payload,
				isFething: false,
				isLoaded: true
			}
		}
		case "DELETE_MEMBER_REJECTED": {
			return {
				...state,
				items: [],
				isFetching: false,
				isLoaded: false,
				error: action.payload
			}
		}


		case "ADD_TOPUP_MEMBER_REQUESTING": {
			return {
				...state,
				isFetching: true,
				isLoaded: false
			}
		}
		case "ADD_TOPUP_MEMBER_FULFILLED": {
			return {
				...state,
				items: action.payload,
				isFething: false,
				isLoaded: true
			}
		}
		case "ADD_TOPUP_MEMBER_REJECTED": {
			return {
				...state,
				items: [],
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

export default member;
