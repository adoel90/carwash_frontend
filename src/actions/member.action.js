import axios from 'axios';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1X2lkIjoxLCJ1X25hbWUiOiJBZG1pbiIsInVfdXNlcm5hbWUiOiJhZG1pbiIsInVfZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJ1X3Bhc3N3b3JkIjoiN2MyMjJmYjI5MjdkODI4YWYyMmY1OTIxMzRlODkzMjQ4MDYzN2MwZCIsInVsX2lkIjoxLCJjcmVhdGVkX2F0IjoiMjAxNy0xMC0xOFQwNTo0MzozNy43NTBaIiwidXBkYXRlZF9hdCI6bnVsbCwiZGVsZXRlZF9hdCI6bnVsbCwidWxfbmFtZSI6IkFkbWluIn0.uNkUWoh5a6Ic5bQL3gyBVbU9P8leQntVmlfxu-yIOZI';

const API_URL = 'http://128.199.227.10:3307/';

export const fetchMember = (data) => {
    return async (dispatch) => {
        axios
            .get(`${API_URL}member/list?accessToken=${token}`)
            .then((response) => {
                dispatch({
                    type: 'GET_MEMBER_FULFILLED',
                    payload: response.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: 'GET_MEMBER_REJECTED',
                    payload: error
                })
            })
    }
}

export const addMember = (data) => {
    return async(dispatch) => {
        axios.post(`${API_URL}member/create?accessToken=${token}`, data)
            .then((response) => {
                dispatch({
                    type: 'ADD_MEMBER_FULFILLED',
                    payload: response.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: 'ADD_MEMBER_ERROR',
                    payload: error
                })
            })
    }
}

export const updateMember = (data) => {
    return async(dispatch) => {
        axios.put(`${API_URL}member/update?accessToken=${token}`)
            .then((response) => {
                dispatch({
                    type: 'UPDATE_MEMBER_FULFILLED',
                    payload: response.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: 'UPDATE_MEMBER_ERROR',
                    payload: error
                })
            })
    }
}

export const deleteMember = (data) => {
    return async(dispatch) => {
        axios.put(`${API_URL}member/delete?accessToken=${token}`)
            .then((response) => {
                dispatch({
                    type: 'DELETE_MEMBER_FULFILLED',
                    payload: response.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: 'DELETE_MEMBER_ERROR',
                    payload: error
                })
            })
    }
}

export const toptupMember = (data) => {
    return async(dispatch) => {
        axios.post(`${API_URL}member/topup?accessToken=${token}`)
            .then((response) => {
                dispatch({
                    type: 'ADD_TOPUP_MEMBER_FULFILLED',
                    payload: response.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: 'ADD_TOPUP_MEMBER_ERROR',
                    payload: error
                })
            })
    }
}
