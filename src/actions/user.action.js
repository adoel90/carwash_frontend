import axios from 'axios';

//	API Fetch
const API_URL = 'https://swapi.co/api/people/';

const fetchAllUsersSuccess = (response) => {
	type: 'GET_USERS_FULFILLED';
	payload: response.data;
}

const fetchAllUsersError = (error) => {
	type: 'GET_USERS_REJECTED';
	payload: error;
}

export const fetchAllUsers = (dispatch) => {
	axios
		.get(API_URL)
		.then((response) => {
			dispatch(fetchAllUsersSuccess(response));
		})
		.catch((error) => {
			dispatch(fetchAllUsersError(error));
		})
}
