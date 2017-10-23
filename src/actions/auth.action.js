import axios from 'axios';

const API_URL = 'http://128.199.227.10:3307/';

export const login = (data) => {
    return async(dispatch) => {
        axios.post(`${API_URL}user/authenticate`)
            .then((response) => {
                localStorage.set(response);
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: response.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: 'LOGIN_ERROR',
                    payload: error
                })
            })
    }
}
