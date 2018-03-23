import axios from 'axios';
import { constant } from '../config';
import Cookies from 'universal-cookie';

export const RESET_MEMBER_DATA = 'RESET_MEMBER_DATA';

export const AUTHENTICATE_MEMBER_REQUESTED = 'AUTHENTICATE_MEMBER_REQUESTED';
export const AUTHENTICATE_MEMBER_FULFILLED = 'AUTHENTICATE_MEMBER_FULFILLED';
export const AUTHENTICATE_MEMBER_REJECTED = 'AUTHENTICATE_MEMBER_REJECTED';

export const LOGOUT_MEMBER_FULFILLED = 'LOGOUT_MEMBER_FULFILLED';

export const MEMBER_TOPUP_FULFILLED = 'MEMBER_TOPUP_FULFILLED';
export const MEMBER_TOPUP_REJECTED = 'MEMBER_TOPUP_REJECTED';
export const MEMBER_REFUND_REQUESTED = 'MEMBER_REFUND_REQUESTED';
export const MEMBER_REFUND_FULFILLED = 'MEMBER_REFUND_FULFILLED';
export const MEMBER_REFUND_REJECTED = 'MEMBER_REFUND_REJECTED';

export const GET_MEMBER_LIST_REQUESTED = 'GET_MEMBER_LIST_REQUESTED';
export const GET_MEMBER_LIST_FULFILLED = 'GET_MEMBER_LIST_FULFILLED';
export const GET_MEMBER_LIST_REJECTED = 'GET_MEMBER_LIST_REJECTED';
export const GET_MEMBER_DETAIL_REQUESTED = 'GET_MEMBER_DETAIL_REQUESTED';
export const GET_MEMBER_DETAIL_FULFILLED = 'GET_MEMBER_DETAIL_FULFILLED';
export const GET_MEMBER_DETAIL_REJECTED = 'GET_MEMBER_DETAIL_REJECTED';

export const CREATE_MEMBER_REQUESTED = 'CREATE_MEMBER_LIST_REQUESTED';
export const CREATE_MEMBER_FULFILLED = 'CREATE_MEMBER_FULFILLED';
export const CREATE_MEMBER_REJECTED = 'CREATE_MEMBER_REJECTED';
export const UPDATE_MEMBER_REQUESTED = 'UPDATE_MEMBER_REQUESTED';
export const UPDATE_MEMBER_FULFILLED = 'UPDATE_MEMBER_FULFILLED';
export const UPDATE_MEMBER_REJECTED = 'UPDATE_MEMBER_REJECTED';
export const CHANGE_MEMBER_STATUS_REQUESTED = 'CHANGE_MEMBER_STATUS_REQUESTED';
export const CHANGE_MEMBER_STATUS_FULFILLED = 'CHANGE_MEMBER_STATUS_FULFILLED';
export const CHANGE_MEMBER_STATUS_REJECTED = 'CHANGE_MEMBER_STATUS_REJECTED';
export const DELETE_MEMBER_FULFILLED = 'DELETE_MEMBER_FULFILLED';
export const DELETE_MEMBER_REJECTED = 'DELETE_MEMBER_REJECTED';

const cookies = new Cookies();
const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;

export const authenticateMember = (data) => {
	return async dispatch => {
		dispatch(handleRequest());
		axios
			.post(`${constant.API_PATH}member/authenticate`, {
				card: data.card
			})
			.then((response) => {
				dispatch(handleSuccess(response.data.data));
				cookies.set('accessToken', response.data.data.accessToken, { path: '/' });
				cookies.set('member', response.data.data.member, { path: '/' });
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleRequest() { return { type: AUTHENTICATE_MEMBER_REQUESTED } }
	function handleSuccess(data) { return { type: AUTHENTICATE_MEMBER_FULFILLED, payload: data }}
	function handleError(data) { return { type: AUTHENTICATE_MEMBER_REJECTED, payload: data }}
}

export const memberTopup = (data, accessToken) => {
	return async dispatch => {
		axios
			.post(`${constant.API_PATH}member/topup?accessToken=${accessToken}`, {
				balance: data.balance,
				payment: data.payment
			})
			.then((response) => {
				dispatch(handleSuccess(response.data));
			})
			.catch((error) => {
				dispatch(handleError(error));
			})
	}

	function handleSuccess(data) { return { type: MEMBER_TOPUP_FULFILLED, payload: data } }
	function handleError(data) { return { type: MEMBER_TOPUP_REJECTED, payload: data } }
}

export const memberRefund = (data, accessToken) => {
	return async dispatch => {
		// dispatch(handleRequest())
		axios
			.post(`${constant.API_PATH}member/refund?accessToken=${accessToken}`, {
				card: data.card
			})
			.then((response) => {
				dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleRequest() { return { type: MEMBER_REFUND_REQUESTED } }
	function handleSuccess(data) { return { type: MEMBER_REFUND_FULFILLED, payload: data } }
	function handleError(data) { return { type: MEMBER_REFUND_REJECTED, payload: data } }
}

export const getMemberList = (data, accessToken) => {
	return async dispatch => {

		dispatch(handleRequest());

		axios
			// .get(`${constant.API_PATH}member/list?accessToken=${accessToken}`)
			.get(`${constant.API_PATH}member/list?accessToken=${accessToken}&limit=${data.limit}&offset=${data.offset}`)
			.then((response) => {
				dispatch(handleSuccess(response.data.data));
			})
			.catch((error) => {
				dispatch(handleError(error));
			})
	}

	function handleRequest() { return { type: GET_MEMBER_LIST_REQUESTED } }
	function handleSuccess(data) { return { type: GET_MEMBER_LIST_FULFILLED, payload: data }}
	function handleError(data) { return { type: GET_MEMBER_LIST_REJECTED, payload: data }}
}

export const getAllMemberList = (accessToken) => {
	return async dispatch => {

		dispatch(handleRequest());

		axios
			.get(`${constant.API_PATH}member?accessToken=${accessToken}`)
			.then((response) => {
				dispatch(handleSuccess(response.data));
			})
			.catch((error) => {
				dispatch(handleError(error));
			})
	}

	function handleRequest() { return { type: GET_MEMBER_LIST_REQUESTED } }
	function handleSuccess(data) { return { type: GET_MEMBER_LIST_FULFILLED, payload: data }}
	function handleError(data) { return { type: GET_MEMBER_LIST_REJECTED, payload: data }}
}

export const getMemberDetail = (data, accessToken) => {
// export const getMemberDetail = (data) => {
	return async dispatch => {
		dispatch(handleRequest())
		
		// console.log(data);
		return axios
			// .get(`${constant.API_PATH}member/detail?accessToken=${accessToken}&id=${data.id}&transaction=${data.transaction}`)
			.get(`${constant.API_PATH}member/detail?accessToken=${accessToken}&id=${data.id}`)
			// .get(`${constant.API_PATH}member/detail?accessToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NiwiY2FyZCI6IjAwMTE1MDk2OTU3NDA3MzgiLCJ0eXBlIjoxLCJleHBpcmVkIjoiMjAxOC0wMy0wOVQxMjo1Nzo1OC44MzhaIn0.YgNrjFZqlRx2vhXKOcuPwlQrl-P3_Uemodrj_qi5384&id=6`)
			.then((response) => {
				dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleRequest() { return { type: GET_MEMBER_DETAIL_REQUESTED } }
	function handleSuccess(data) { return { type: GET_MEMBER_DETAIL_FULFILLED, payload: data } }
	function handleError(data) { return { type: GET_MEMBER_DETAIL_REJECTED, payload: data } }
}

export const createNewMember = (data, accessToken) => {
	return async dispatch => {
		axios
			.post(`${constant.API_PATH}member/create?accessToken=${accessToken}`, {
				name: data.name,
				phone: data.phone,
				email: data.email,
				address: data.address,
				card: data.card,
				payment: data.payment
			})
			.then((response) => {
				dispatch(handleSuccess(response.data.data))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleSuccess(data) { return { type: CREATE_MEMBER_FULFILLED, payload: data } }
	function handleError(data) { return { type: CREATE_MEMBER_REJECTED, payload: data } }
}


export const updateMember = (data, accessToken) => {
	return async dispatch => {
		return axios
			.put(`${constant.API_PATH}member/update?accessToken=${accessToken}`, {
				id: data.id,
				name: data.name,
				phone: data.phone,
				email: data.email,
				address: data.address
			})
			.then((response) => {
				dispatch(handleSuccess(response.data));
			})
			.catch((error) => {
				dispatch(handleError(error));
			})
	}

	function handleSuccess(data) { return { type: UPDATE_MEMBER_FULFILLED, payload: data } }
	function handleError(data) { return { type: UPDATE_MEMBER_REJECTED, payload: data } }
}

export const changeMemberStatus = (data, accessToken) => {
	return async dispatch => {
		dispatch(handleRequest(data.id));

		axios
			.put(`${constant.API_PATH}member/status?accessToken=${accessToken}`, {
				id: data.id
			})
			.then((response) => {
				dispatch(handleSuccess(response.data, data.id))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleRequest(id) { return { type: CHANGE_MEMBER_STATUS_REQUESTED, id: id}}
	function handleSuccess(data, id) { return { type: CHANGE_MEMBER_STATUS_FULFILLED, payload: data, id: id } }
	function handleError(data) { return { type: CHANGE_MEMBER_STATUS_REJECTED, payload: data } }
}

export const deleteMember = (data, accessToken) => {
	return async dispatch => {
		axios
			.put(`${constant.API_PATH}member/delete?accessToken=${accessToken}`, {
				id: data.id,
			})
			.then((response) => {
				dispatch(handleSuccess(response.data));
			})
			.catch((error) => {
				dispatch(handleError(error));
			})
	}

	function handleSuccess(data) { return { type: DELETE_MEMBER_FULFILLED, payload: data } }
	function handleError(data) { return { type: DELETE_MEMBER_REJECTED, payload: data } }
}

export const memberLogout = () => {
	return async (dispatch) => {
		return Promise.resolve(dispatch(handleLogout()))
			.then(() => {

				localStorage.removeItem('accessToken');
				localStorage.removeItem('userData');
				// cookies.remove('accessToken');
				// cookies.remove('member');
			})
			.then(() => {
				window.location.reload();
			})
	}

	function handleLogout() {
		return {
			type: LOGOUT_MEMBER_FULFILLED
		}
	}
}
