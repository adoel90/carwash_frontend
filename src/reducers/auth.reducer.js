import {
    GET_USER_DATA_FULFILLED,
    GET_USER_DATA_REJECTED,
} from '../actions/cafe.action';

const initialState = {
	isAuth: false,
	userData: {},
	error: {}
}

const auth = (state = initialState, action) => {
	switch(action.type) {
		case GET_USER_DATA_FULFILLED: {
			return {
				...state,
			}
		}
	}
}