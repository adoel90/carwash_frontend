import {
    ADMIN_LOGIN_REQUESTED,
    ADMIN_LOGIN_FULFILLED,
    ADMIN_LOGIN_REJECTED
} from '../actions/authentication.action';

const initialState = {
    userData: localStorage.getItem('userData') ? true : false,
    isAuthenticated: localStorage.getItem('accessToken') ? true : false,
    isAuthenticating: false,
    authenticatedAs: null,
    isError: false,
    error: {}
}

const authentication = (state = initialState, action) => {
    switch(action.type) {
        case ADMIN_LOGIN_REQUESTED: {
            return {
                ...state,
                isAuthenticating: true,
                isAuthenticated: false,
                userData: {},
                isError: false,
                error: {}
            }
        }

        case ADMIN_LOGIN_FULFILLED: {
            return {
                ...state,
                isAuthenticating: false,
                isAuthenticated: true,
                userData: action.payload,
                isError: false,
                error: {}
            }
        }

        case ADMIN_LOGIN_REJECTED: {
            return {
                ...state,
                isAuthenticating: false,
                isAuthenticated: false,
                userData: {},
                isError: true,
                error: action.payload
            }
        }

        default:
            return state
    }
}

export default authentication;