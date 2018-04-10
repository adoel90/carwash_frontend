//vendor.user.reducer.js
import {
	GET_VENDOR_USER_LIST_REQUESTED,
	GET_VENDOR_USER_LIST_FULFILLED,
	GET_VENDOR_USER_LIST_REJECTED,
	
	CREATE_NEW_VENDOR_FULFILLED,
	CREATE_NEW_VENDOR_REJECTED,


	GET_STORE_LIST_REQUESTED,//Get Menu Vendor List || GET STORE LIST
	GET_STORE_LIST_FULFILLED,
	GET_STORE_LIST_REJECTED,

	UPDATE_MENU_VENDOR_REQUESTED, //UPDATE LIST MENU VENDOR
	UPDATE_MENU_VENDOR_FULFILLED,
	UPDATE_MENU_VENDOR_REJECTED,

	GET_EMPLOYEE_VENDOR_LIST_REQUESTED,//Get List Vendor Employee 
	GET_EMPLOYEE_VENDOR_LIST_FULFILLED,
	GET_EMPLOYEE_VENDOR_LIST_REJECTED,

	GET_MENU_STORE_LIST_REQUESTED, //GET MENU STORE LIST
	GET_MENU_STORE_LIST_FULFILLED,
	GET_MENU_STORE_LIST_REJECTED,

	UPDATE_VENDOR_EMPLOYEE_REQUESTED, //UPDATE VENDOR EMPLOYEE
	UPDATE_VENDOR_EMPLOYEE_FULFILLED,
	UPDATE_VENDOR_EMPLOYEE_REJECTED,

	CHANGE_STATUS_STORE_STAFF_REQUESTED, //#CHANGE STATUS STORE STAFF
	CHANGE_STATUS_STORE_STAFF_FULFILLED,
	CHANGE_STATUS_STORE_STAFF_REJECTED

} from '../actions/vendor.action'

const initialState = {

	statusEmployee: {
		data: {},
		isUpdated: false,
		isUpdating: false,
		isStatusChanging: false,
		isStatusChanged: false,
		isError: false,
		error: {}
	},
	item: {
		data: {},
		isCreated: false,
		isError: false,
		error: {}
	},
	list: {
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	},
	menu: {
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	},
	existing: {
		data: {},
		isUpdated: false,
		isUpdating: false,
		isStatusChanging: false,
		isStatusChanged: false,
		isError: false,
		error: {}
	},
	employee:{
		data:{},
		isFetching:false,
		isLoaded:false,
		isError:false,
		error:{}
	},
	updateEmployee:{
		data: {},
		isUpdated: false,
		isError: false,
		error: {}
	},

	menuUpdate: {
		data: {},
		isUpdated: false,
		isError: false,
		error: {}
	},

	store : {

		data:{},
		isFetching:false,
		isLoaded:false,
		isError:false,
		error:{}
	},


}

/*
	#Reducer Formula
		type Reducer<S, A> = (state: S, action: A) => return S

*/
const vendorState = (state = initialState, action) => {
	
	switch(action.type) {

		case GET_VENDOR_USER_LIST_REQUESTED: {
			return {
				...state,
				list: {
					...state.list,
					data: {},
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_VENDOR_USER_LIST_FULFILLED: {
			return {
				...state,
				list: {
					...state.list,
					data: action.payload,
					isLoaded: true,
					isFetching: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_VENDOR_USER_LIST_REJECTED: {
			return {
				...state,
				list: {
					...state.list,
					data: {},
					isLoaded: false,
					isFetching: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case CREATE_NEW_VENDOR_FULFILLED: {
			
			return {
				...state,
				item: {
					...state.item,
					data: action.payload,
					isCreated: true,
					isError: false,
					error: {}
				}
			}
		}

		case CREATE_NEW_VENDOR_REJECTED: {
			return {
				...state,
				item: {
					...state.item,
					data: {},
					isCreated: false,
					isError: true,
					error: action.payload
				}
			}
		}

		//Get Vendor Menu List
		case GET_STORE_LIST_REQUESTED: {
			return {
				...state,
				store: {
					...state.store,
					data: {},
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_STORE_LIST_FULFILLED: {
			return {
				...state,
				store: {
					...state.store,
					data: action.payload,
					isLoaded: true,
					isFetching: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_STORE_LIST_REJECTED: {
			return {
				...state,
				store: {
					...state.store,
					data: {},
					isLoaded: false,
					isFetching: false,
					isError: true,
					error: action.payload
				}
			}
		}

		//UPDATE LIST MENU VENDOR
		case UPDATE_MENU_VENDOR_REQUESTED: {
			return {
				...state,
				menuUpdate: {
					...state.menuUpdate,
					data: {},
					isUpdated: false,
					isError: false,
					error: {}
				}
			}
		}

		case UPDATE_MENU_VENDOR_FULFILLED: {
			return {
				...state,
				menuUpdate: {
					...state.menuUpdate,
					data: {},
					isUpdated: true,
					isError: false,
					error: {}
				}
			}
		}

		case UPDATE_MENU_VENDOR_REJECTED: {
			return {
				...state,
				menuUpdate: {
					...state.menuUpdate,
					data: {},
					isUpdated: false,
					isError: true,
					error: action.payload
				}
			}
		}
		
		//Get List Vendor Employee 
		case GET_EMPLOYEE_VENDOR_LIST_REQUESTED: {
			return {
				...state,
				employee: {
					...state.employee,
					data: {},
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_EMPLOYEE_VENDOR_LIST_FULFILLED: {
			return {
				...state,
				employee: {
					...state.employee,
					data: action.payload,
					isLoaded: true,
					isFetching: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_EMPLOYEE_VENDOR_LIST_REJECTED: {
			return {
				...state,
				employee: {
					...state.employee,
					data: {},
					isLoaded: false,
					isFetching: false,
					isError: true,
					error: action.payload
				}
			}
		}

		//GET MENU STORE LIST
		case GET_MENU_STORE_LIST_REQUESTED: {
			return {
				...state,
				storemenu: {
					...state.storemenu,
					data: {},
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_MENU_STORE_LIST_FULFILLED: {
			return {
				...state,
				storemenu: {
					...state.storemenu,
					data: action.payload,
					isLoaded: true,
					isFetching: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_MENU_STORE_LIST_REJECTED: {
			return {
				...state,
				storemenu: {
					...state.storemenu,
					data: {},
					isLoaded: false,
					isFetching: false,
					isError: true,
					error: action.payload
				}
			}
		}

		//UPDATE VENDOR EMPLOYEE
		case UPDATE_VENDOR_EMPLOYEE_REQUESTED: {
			return {
				...state,
				updateEmployee: {
					...state.updateEmployee,
					data: {},
					isUpdated: false,
					isError: false,
					error: {}
				}
			}
		}

		case UPDATE_VENDOR_EMPLOYEE_FULFILLED: {
			return {
				...state,
				updateEmployee: {
					...state.updateEmployee,
					data: action.payload,
					isUpdated: true,
					isError: false,
					error: {}
				}
			}
		}

		case UPDATE_VENDOR_EMPLOYEE_REJECTED: {
			return {
				...state,
				updateEmployee: {
					...state.updateEmployee,
					data: {},
					isUpdated: false,
					isError: true,
					error: action.payload
				}
			}
		}

		//#CHANGE STATUS STORE STAFF
		case CHANGE_STATUS_STORE_STAFF_REQUESTED: {
			return {
				...state,
				statusEmployee: {
					...state.statusEmployee,
					data: {},
					id: action.id,
					isStatusChanging: true,
					isStatusChanged: false,
					isError: false,
					error: {}
				}
			}
		}

		case CHANGE_STATUS_STORE_STAFF_FULFILLED: {
			return {
				...state,
				statusEmployee: {
					...state.statusEmployee,
					data: action.payload,
					id: action.id,
					isStatusChanging: false,
					isStatusChanged: true,
					isError: false,
					error: {}
				}
			}
		}

		case CHANGE_STATUS_STORE_STAFF_REJECTED: {
			return {
				...state,
				statusEmployee: {
					...state.statusEmployee,
					data: {},
					id: action.id,
					isStatusChanging: false,
					isStatusChanged: false,
					isError: true,
					error: action.payload
				}
			}
		}

		default: {
			return state;
		}
	}
}

export default vendorState;
