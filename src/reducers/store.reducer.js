import {
	GET_STORE_LIST_REQUESTED,
	GET_STORE_LIST_FULFILLED,
	GET_STORE_LIST_REJECTED,
	GET_STORE_DETAIL_REQUESTED,
	GET_STORE_DETAIL_FULFILLED,
	GET_STORE_DETAIL_REJECTED,
	CREATE_STORE_REQUESTED,
	CREATE_STORE_FULFILLED,
	CREATE_STORE_REJECTED,
	UPDATE_STORE_REQUESTED,
	UPDATE_STORE_FULFILLED,
	UPDATE_STORE_REJECTED,
	CHANGE_STATUS_STORE_REQUESTED,
	CHANGE_STATUS_STORE_FULFILLED,
	CHANGE_STATUS_STORE_REJECTED,
	GET_CATEGORY_LIST_REQUESTED,
	GET_CATEGORY_LIST_FULFILLED,
	GET_CATEGORY_LIST_REJECTED,
	GET_MENU_LIST_STORE_REQUESTED, //GET MENU LIST STORE
	GET_MENU_LIST_STORE_FULFILLED,
	GET_MENU_LIST_STORE_REJECTED,

	CREATE_MENU_TRANSACTION_FULFILLED, //CREATE MENU TRANSACTION
	CREATE_MENU_TRANSACTION_REJECTED,

	GET_PRINT_STORE_TRANSACTION_REQUESTED, //GET PRINT STORE TRANSACTION
	GET_PRINT_STORE_TRANSACTION_FULFILLED,
	GET_PRINT_STORE_TRANSACTION_REJECTED,

	CUSTOMER_TOPUP_LOGIN_REQUESTED,//#CUSTOMER TOP-UP LOGIN 
    CUSTOMER_TOPUP_LOGIN_FULFILLED,
	CUSTOMER_TOPUP_LOGIN_REJECTED,

	GET_BONUS_TAXI_ONLINE_REQUESTED,//GET BONUS TAXI ONLINE
	GET_BONUS_TAXI_ONLINE_FULFILLED,
	GET_BONUS_TAXI_ONLINE_REJECTED,

	GET_PROMO_DISCOUNT_ALL_STORE_REQUESTED, //#GET PROMO DISCOUNT ALL
	GET_PROMO_DISCOUNT_ALL_STORE_FULFILLED,
	GET_PROMO_DISCOUNT_ALL_STORE_REJECTED,
	
	CREATE_MENU_PRODUCT_KASIR_STORE_FULFILLED, //#CREATE MENU PRODUCT KASIR STORE
	CREATE_MENU_PRODUCT_KASIR_STORE_REJECTED,

	UPDATE_PROMO_REQUESTED, //#UPDATE PROMO
	UPDATE_PROMO_FULFILLED,
	UPDATE_PROMO_REJECTED,

	GET_DISCOUNT_LIST_REQUESTED,
	GET_DISCOUNT_LIST_FULFILLED,
	GET_DISCOUNT_LIST_REJECTED,

	CREATE_STAFF_STORE_FULFILLED, //#CREATE STAFF STORE 
	CREATE_STAFF_STORE_REJECTED,

	CREATE_DISCOUNT_PROMO_STORE_FULFILLED, //CREATE DISCOUNT PROMO STORE 
	CREATE_DISCOUNT_PROMO_STORE_REJECTED

} from '../actions/store.action'

const initialState = {

	list: {
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	},
	detail: {
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	},
	item: {
		data: {},
		isCreated: false,
		isError: false,
		error: {}
	},
	updateStore: {
		data: {},
		isUpdated: false,
		isError: false,
		error: {}
	},
	status: {
		data: {},
		isUpdated: false,
		isUpdating: false,
		isStatusChanging: false,
		isStatusChanged: false,
		isError: false,
		error: {}
	},
	category: {
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	},
	storemenu: {
		id:null,
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	},
	transaction: {
		data: {},
		isPaying: false,
		isPaid: false,
		isError: false,
		error: {}
	},
	print: {
		data: {},
		isPrinting: false,
		isPrinted: false,
		isError: false,
		error: {}
	},
	bonus: {
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	},
	discount: {
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	},

	promo: {
		data: {},
		isFetching: false,
		isLoaded: false,
		isError: false,
		error: {}
	},

	promoUpdate: {
		data: {},
		isUpdated: false,
		isError: false,
		error: {}
	},

	menuproduk: {
		data: {},
		isCreated: false,
		isError: false,
		error: {}
	},

	staffemployee: {
		data: {},
		isCreated: false,
		isError: false,
		error: {}
	},

	promodiscount: {
		data: {},
		isCreated: false,
		isError: false,
		error: {}
	}
}

const store = (state = initialState, action) => {
	switch(action.type) {
		case GET_STORE_LIST_REQUESTED: {
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

		case GET_STORE_LIST_FULFILLED: {
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

		case GET_STORE_LIST_REJECTED: {
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

		case GET_STORE_DETAIL_REQUESTED: {
			return {
				...state,
				detail: {
					...state.detail,
					data: {},
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_STORE_DETAIL_FULFILLED: {
			return {
				...state,
				detail: {
					...state.detail,
					data: action.payload,
					isLoaded: true,
					isFetching: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_STORE_DETAIL_REJECTED: {
			return {
				...state,
				detail: {
					...state.detail,
					data: {},
					isLoaded: false,
					isFetching: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case CREATE_STORE_REQUESTED: {
			return {
				...state,
				item: {
					...state.item,
					data: {},
					isCreated: false,
					isError: false,
					error: {}
				}
			}
		}

		case CREATE_STORE_FULFILLED: {
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

		case CREATE_STORE_REJECTED: {
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


		case UPDATE_STORE_REQUESTED: {
			return {
				...state,
				updateStore: {
					...state.updateStore,
					data: {},
					isUpdated: false,
					isError: false,
					error: {}
				}
			}
		}

		case UPDATE_STORE_FULFILLED: {
			return {
				...state,
				updateStore: {
					...state.updateStore,
					data: action.payload,
					isUpdated: true,
					isError: false,
					error: {}
				}
			}
		}

		case UPDATE_STORE_REJECTED: {
			return {
				...state,
				updateStore: {
					...state.updateStore,
					data: {},
					isUpdated: false,
					isError: true,
					error: action.payload
				}
			}
		}
		
		case CHANGE_STATUS_STORE_REQUESTED: {
			return {
				...state,
				status: {
					...state.status,
					data: {},
					id: action.id,
					isStatusChanging: true,
					isStatusChanged: false,
					isError: false,
					error: {}
				}
			}
		}

		case CHANGE_STATUS_STORE_FULFILLED: {
			return {
				...state,
				status: {
					...state.status,
					data: action.payload,
					id: action.id,
					isStatusChanging: false,
					isStatusChanged: true,
					isError: false,
					error: {}
				}
			}
		}

		case CHANGE_STATUS_STORE_REJECTED: {
			return {
				...state,
				status: {
					...state.status,
					data: {},
					id: action.id,
					isStatusChanging: false,
					isStatusChanged: false,
					isError: true,
					error: action.payload
				}
			}
		}

		case GET_CATEGORY_LIST_REQUESTED: {
			return {
				...state,
				category: {
					...state.category,
					data: {},
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_CATEGORY_LIST_FULFILLED: {
			return {
				...state,
				category: {
					...state.category,
					data: action.payload,
					isLoaded: true,
					isFetching: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_CATEGORY_LIST_REJECTED: {
			return {
				...state,
				category: {
					...state.category,
					data: {},
					isLoaded: false,
					isFetching: false,
					isError: true,
					error: action.payload
				}
			}
		}

		//GET MENU LIST STORE
		case GET_MENU_LIST_STORE_REQUESTED: {
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

		case GET_MENU_LIST_STORE_FULFILLED: {
			
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

		case GET_MENU_LIST_STORE_REJECTED: {
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

		//CREATE MENU TRANSACTION
		case CREATE_MENU_TRANSACTION_FULFILLED: {
			return {
				...state,
				transaction: {
					...state.transaction,
					data: action.payload,
					isPaid: true,
					isError: false,
					error: {}
				}
			}
		}

		case CREATE_MENU_TRANSACTION_REJECTED: {
			return {
				...state,
				transaction: {
					...state.transaction,
					data: {},
					isPaid: false,
					isError: true,
					error: action.payload
				}
			}
		}

	

		//GET PRINT STORE TRANSACTION
		case GET_PRINT_STORE_TRANSACTION_REQUESTED: {
			return {
				...state,
				print: {
					...state.print,
					data: {},
					isPrinting: true,
					isPrinted: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_PRINT_STORE_TRANSACTION_FULFILLED: {
			return {
				...state,
				print: {
					...state.print,
					data: action.payload,
					isPrinting: false,
					isPrinted: true,
					isError: false,
					error: {}
				}
			}
		}

		case GET_PRINT_STORE_TRANSACTION_REJECTED: {
			return {
				...state,
				print: {
					...state.print,
					data: {},
					isPrinting: false,
					isPrinted: false,
					isError: true,
					error: action.payload
				}
			}
		}

		 //#CUSTOMER TOP-UP LOGIN 
         case CUSTOMER_TOPUP_LOGIN_REQUESTED: {
            return {
                ...state,
                isAuthenticating: true,
                isAuthenticated: false,
                userData: {},
                isError: false,
                error: {}
            }
        }

        case CUSTOMER_TOPUP_LOGIN_FULFILLED: {
            return {
                ...state,
                isAuthenticating: false,
                isAuthenticated: true,
                userData: action.payload,
                isError: false,
                error: {}
            }
        }

        case CUSTOMER_TOPUP_LOGIN_REJECTED: {
            return {
                ...state,
                isAuthenticating: false,
                isAuthenticated: false,
                userData: {},
                isError: true,
                error: action.payload
            }
		}

		case GET_DISCOUNT_LIST_REQUESTED: {
			return {
				...state,
				discount: {
					...state.discount,
					data: {},
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_DISCOUNT_LIST_FULFILLED: {
			return {
				...state,
				discount: {
					...state.discount,
					data: action.payload,
					isLoaded: true,
					isFetching: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_DISCOUNT_LIST_REJECTED: {
			return {
				...state,
				discount: {
					...state.discount,
					data: {},
					isLoaded: false,
					isFetching: false,
					isError: true,
					error: action.payload
				}
			}
		}

		//#GET BONUS TAXI ONLINE
		case GET_BONUS_TAXI_ONLINE_REQUESTED: {
			return {
				...state,
				bonus: {
					...state.bonus,
					data: {},
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_BONUS_TAXI_ONLINE_FULFILLED: {
			return {
				...state,
				bonus: {
					...state.bonus,
					data: action.payload,
					isLoaded: true,
					isFetching: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_BONUS_TAXI_ONLINE_REJECTED: {
			return {
				...state,
				bonus: {
					...state.bonus,
					data: {},
					isLoaded: false,
					isFetching: false,
					isError: true,
					error: action.payload
				}
			}
		}
	
		//#GET PROMO DISCOUNT ALL
		case GET_PROMO_DISCOUNT_ALL_STORE_REQUESTED: {
			return {
				...state,
				promo: {
					...state.promo,
					data: {},
					isFetching: true,
					isLoaded: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_PROMO_DISCOUNT_ALL_STORE_FULFILLED: {
			return {
				...state,
				promo: {
					...state.promo,
					data: action.payload,
					isLoaded: true,
					isFetching: false,
					isError: false,
					error: {}
				}
			}
		}

		case GET_PROMO_DISCOUNT_ALL_STORE_REJECTED: {
			return {
				...state,
				promo: {
					...state.promo,
					data: {},
					isLoaded: false,
					isFetching: false,
					isError: true,
					error: action.payload
				}
			}
		}

		//#CREATE MENU PRODUCT KASIR STORE
		case CREATE_MENU_PRODUCT_KASIR_STORE_FULFILLED: {
			return {
				...state,
				menuproduk: {
					...state.menuproduk,
					data: {},
					isCreated: true,
					isError: false,
					error: {}
				}
			}
		}

		case CREATE_MENU_PRODUCT_KASIR_STORE_REJECTED: {
			return {
				...state,
				menuproduk: {
					...state.menuproduk,
					data: action.payload,
					isCreated: false,
					isError: false,
					error: {}
				}
			}
		}

		//#UPDATE PROMO
		case UPDATE_PROMO_REQUESTED: {
			return {
				...state,
				promoUpdate: {
					...state.promoUpdate,
					data: {},
					isUpdated: false,
					isError: false,
					error: {}
				}
			}
		}

		case UPDATE_PROMO_FULFILLED: {
			return {
				...state,
				promoUpdate: {
					...state.promoUpdate,
					data: action.payload,
					isUpdated: true,
					isError: false,
					error: {}
				}
			}
		}

		case UPDATE_PROMO_REJECTED: {
			return {
				...state,
				promoUpdate: {
					...state.promoUpdate,
					data: {},
					isUpdated: false,
					isError: true,
					error: action.payload
				}
			}
		}

		//#CREATE STAFF STORE 
		case CREATE_STAFF_STORE_FULFILLED: {
			return {
				...state,
				staffemployee: {
					...state.staffemployee,
					// data: {},
					data: action.payload,
					isCreated: true,
					isError: false,
					error: {}
				}
			}
		}

		case CREATE_STAFF_STORE_REJECTED: {
			return {
				...state,
				staffemployee: {
					...state.staffemployee,
					data: action.payload,
					isCreated: false,
					isError: false,
					error: {}
				}
			}
		}

	//#CREATE DISCOUNT PROMO STORE
	case CREATE_DISCOUNT_PROMO_STORE_FULFILLED: {
		return {
			...state,
			promodiscount: {
				...state.promodiscount,
				// data: {},
				data: action.payload,
				isCreated: true,
				isError: false,
				error: {}
			}
		}
	}

	case CREATE_DISCOUNT_PROMO_STORE_REJECTED: {
		return {
			...state,
			promodiscount: {
				...state.promodiscount,
				data: action.payload,
				isCreated: false,
				isError: false,
				error: {}
			}
		}
	}


		default: {
			return state;
		}
	}
}

export default store;
