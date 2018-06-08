import {
    ADMIN_LOGIN_REQUESTED,//ADMIN LOGIN
    ADMIN_LOGIN_FULFILLED,
    ADMIN_LOGIN_REJECTED,

    VENDOR_LOGIN_REQUESTED,//VENDOR LOGIN
    VENDOR_LOGIN_FULFILLED,
    VENDOR_LOGIN_REJECTED,

    CUSTOMER_LOGIN_REQUESTED,//CUSTOMER LOGIN
    CUSTOMER_LOGIN_FULFILLED,
    CUSTOMER_LOGIN_REJECTED,

    KASIR_LOGIN_REQUESTED,//#KASIR LOGIN
    KASIR_LOGIN_FULFILLED,
    KASIR_LOGIN_REJECTED,

    // CUSTOMER_TOPUP_LOGIN_REQUESTED,//#CUSTOMER TOP-UP LOGIN 
    // CUSTOMER_TOPUP_LOGIN_FULFILLED,
    // CUSTOMER_TOPUP_LOGIN_REJECTED
    
    LOGOUT_FULFILLED
    
} from '../actions/authentication.action';

const initialState = {

    //#
    // userDataTopUp: localStorage.getItem('userDataTopUp') ? true : false,
    // isAuthenticatedTopUp: localStorage.getItem('accessTokenTopUp') ? true : false,

    userData: localStorage.getItem('userData') ? true : false,
    isAuthenticated: localStorage.getItem('accessToken') ? true : false,

    // userData: null,
    // isAuthenticated: null,
    isAuthenticating: false,
    authenticatedAs: null,
    isError: false,
    error: {}
}

const authentication = (state = initialState, action) => {

    switch(action.type) {

        //#ADMIN LOGIN
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

        //#VENDOR LOGIN
        case VENDOR_LOGIN_REQUESTED: {
            return {
                ...state,
                isAuthenticating: true,
                isAuthenticated: false,
                userData: {},
                isError: false,
                error: {}
            }
        }

        case VENDOR_LOGIN_FULFILLED: {
            return {
                ...state,
                isAuthenticating: false,
                isAuthenticated: true,
                userData: action.payload,
                isError: false,
                error: {}
            }
        }

        case VENDOR_LOGIN_REJECTED: {
            return {
                ...state,
                isAuthenticating: false,
                isAuthenticated: false,
                userData: {},
                isError: true,
                error: action.payload
            }
        }

        //#CUSTOMER LOGIN
        case CUSTOMER_LOGIN_REQUESTED: {
            return {
                ...state,
                isAuthenticating: true,
                isAuthenticated: false,
                userData: {},
                isError: false,
                error: {}
            }
        }

        case CUSTOMER_LOGIN_FULFILLED: {
            return {
                ...state,
                isAuthenticating: false,
                isAuthenticated: true,
                userData: action.payload,
                isError: false,
                error: {}
            }
        }

        case CUSTOMER_LOGIN_REJECTED: {
            return {
                ...state,
                isAuthenticating: false,
                isAuthenticated: false,
                userData: {},
                isError: true,
                error: action.payload
            }
        }

        //#KASIR LOGIN
        case KASIR_LOGIN_REQUESTED: {
            return {
                ...state,
                isAuthenticating: true,
                isAuthenticated: false,
                userData: {},
                isError: false,
                error: {}
            }
        }

        case KASIR_LOGIN_FULFILLED: {
            return {
                ...state,
                isAuthenticating: false,
                isAuthenticated: true,
                userData: action.payload,
                isError: false,
                error: {}
            }
        }

        case KASIR_LOGIN_REJECTED: {
            return {
                ...state,
                isAuthenticating: false,
                isAuthenticated: false,
                userData: {},
                isError: true,
                error: action.payload
            }
        }


        //#CUSTOMER TOP-UP LOGIN 
        // case CUSTOMER_TOPUP_LOGIN_REQUESTED: {
        //     return {
        //         ...state,
        //         isAuthenticating: true,
        //         // isAuthenticatedTopUp: false,
        //         isAuthenticated: false,
        //         // userDataTopUp: {},
        //         userData: {},
        //         isError: false,
        //         error: {}
        //     }
        // }

        // case CUSTOMER_TOPUP_LOGIN_FULFILLED: {
        //     return {
        //         ...state,
        //         isAuthenticating: false,
        //         // isAuthenticatedTopUp: true,
        //         isAuthenticated: true,
        //         // userDataTopUp: action.payload,
        //         userData: action.payload,
        //         isError: false,
        //         error: {}
        //     }
        // }

        // case CUSTOMER_TOPUP_LOGIN_REJECTED: {
        //     return {
        //         ...state,
        //         isAuthenticating: false,
        //         // isAuthenticatedTopUp: false,
        //         isAuthenticated: false,
        //         // userDataTopUp: {},
        //         userData: {},
        //         isError: true,
        //         error: action.payload
        //     }
        // }

        case LOGOUT_FULFILLED: {
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