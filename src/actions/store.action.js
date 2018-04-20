import axios from 'axios';
import { constant } from '../config';
import { log } from 'util';

//GET STORE LIST
export const GET_STORE_LIST_REQUESTED = 'GET_STORE_LIST_REQUESTED';
export const GET_STORE_LIST_FULFILLED = 'GET_STORE_LIST_FULFILLED';
export const GET_STORE_LIST_REJECTED = 'GET_STORE_LIST_REJECTED';

//GET STORE LIST DETAIL
export const GET_STORE_DETAIL_REQUESTED = 'GET_STORE_DETAIL_REQUESTED';
export const GET_STORE_DETAIL_FULFILLED = 'GET_STORE_DETAIL_FULFILLED';
export const GET_STORE_DETAIL_REJECTED = 'GET_STORE_DETAIL_REJECTED';

export const CREATE_STORE_REQUESTED = 'CREATE_STORE_REQUESTED';
export const CREATE_STORE_FULFILLED = 'CREATE_STORE_FULFILLED';
export const CREATE_STORE_REJECTED = 'CREATE_STORE_REJECTED';

export const UPDATE_STORE_REQUESTED = 'UPDATE_STORE_REQUESTED';
export const UPDATE_STORE_FULFILLED = 'UPDATE_STORE_FULFILLED';
export const UPDATE_STORE_REJECTED = 'UPDATE_STORE_REJECTED';

export const CHANGE_STATUS_STORE_REQUESTED = 'CHANGE_STATUS_STORE_REQUESTED';
export const CHANGE_STATUS_STORE_FULFILLED = 'CHANGE_STATUS_STORE_FULFILLED';
export const CHANGE_STATUS_STORE_REJECTED = 'CHANGE_STATUS_STORE_REJECTED';

export const GET_CATEGORY_LIST_REQUESTED = 'GET_CATEGORY_LIST_REQUESTED';
export const GET_CATEGORY_LIST_FULFILLED = 'GET_CATEGORY_LIST_FULFILLED';
export const GET_CATEGORY_LIST_REJECTED = 'GET_CATEGORY_LIST_REJECTED';

export const GET_DISCOUNT_LIST_REQUESTED = 'GET_DISCOUNT_LIST_REQUESTED';
export const GET_DISCOUNT_LIST_FULFILLED = 'GET_DISCOUNT_LIST_FULFILLED';
export const GET_DISCOUNT_LIST_REJECTED = 'GET_DISCOUNT_LIST_REJECTED';

//#GET MENU LIST STORE
export const GET_MENU_LIST_STORE_REQUESTED = 'GET_MENU_LIST_STORE_REQUESTED';
export const GET_MENU_LIST_STORE_FULFILLED = 'GET_MENU_LIST_STORE_FULFILLED';
export const GET_MENU_LIST_STORE_REJECTED = 'GET_MENU_LIST_STORE_REJECTED';

//CREATE MENU TRANSACTION
export const CREATE_MENU_TRANSACTION_FULFILLED = "CREATE_MENU_TRANSACTION_FULFILLED";
export const CREATE_MENU_TRANSACTION_REJECTED = "CREATE_MENU_TRANSACTION_REJECTED";

//GET PRINT STORE TRANSACTION
export const GET_PRINT_STORE_TRANSACTION_REQUESTED = "GET_PRINT_STORE_TRANSACTION_REQUESTED";
export const GET_PRINT_STORE_TRANSACTION_FULFILLED = "GET_PRINT_STORE_TRANSACTION_FULFILLED";
export const GET_PRINT_STORE_TRANSACTION_REJECTED = "GET_PRINT_STORE_TRANSACTION_REJECTED";

//#CUSTOMER TOP-UP LOGIN 
export const CUSTOMER_TOPUP_LOGIN_REQUESTED = 'CUSTOMER_TOPUP_LOGIN_REQUESTED';
export const CUSTOMER_TOPUP_LOGIN_FULFILLED = 'CUSTOMER_TOPUP_LOGIN_FULFILLED';
export const CUSTOMER_TOPUP_LOGIN_REJECTED = 'CUSTOMER_TOPUP_LOGIN_REJECTED';

//GET BONUS TAXI ONLINE
export const GET_BONUS_TAXI_ONLINE_REQUESTED = 'GET_BONUS_TAXI_ONLINE_REQUESTED';
export const GET_BONUS_TAXI_ONLINE_FULFILLED = 'GET_BONUS_TAXI_ONLINE_FULFILLED';
export const GET_BONUS_TAXI_ONLINE_REJECTED = 'GET_BONUS_TAXI_ONLINE_REJECTED';

//#GET PROMO DISCOUNT //#GET PROMO DISCOUNT ALL
export const GET_PROMO_DISCOUNT_ALL_STORE_REQUESTED = 'GET_PROMO_DISCOUNT_ALL_STORE_REQUESTED';
export const GET_PROMO_DISCOUNT_ALL_STORE_FULFILLED = 'GET_PROMO_DISCOUNT_ALL_STORE_FULFILLED';
export const GET_PROMO_DISCOUNT_ALL_STORE_REJECTED = 'GET_PROMO_DISCOUNT_ALL_STORE_REJECTED';

//#CREATE MENU PRODUCT KASIR STORE
export const CREATE_MENU_PRODUCT_KASIR_STORE_FULFILLED = "CREATE_MENU_PRODUCT_KASIR_STORE_FULFILLED";
export const CREATE_MENU_PRODUCT_KASIR_STORE_REJECTED = "CREATE_MENU_PRODUCT_KASIR_STORE_REJECTED";

//#UPDATE PROMO
export const UPDATE_PROMO_REQUESTED = 'UPDATE_PROMO_REQUESTED';
export const UPDATE_PROMO_FULFILLED = 'UPDATE_PROMO_FULFILLED';
export const UPDATE_PROMO_REJECTED = 'UPDATE_PROMO_REJECTED';

//#CREATE STAFF STORE 
export const CREATE_STAFF_STORE_FULFILLED = "CREATE_STAFF_STORE_FULFILLED";
export const CREATE_STAFF_STORE_REJECTED = "CREATE_STAFF_STORE_REJECTED";

//CREATE DISCOUNT PROMO STORE  
export const CREATE_DISCOUNT_PROMO_STORE_FULFILLED = "CREATE_DISCOUNT_PROMO_STORE_FULFILLED";
export const CREATE_DISCOUNT_PROMO_STORE_REJECTED = "CREATE_DISCOUNT_PROMO_STORE_REJECTED";
 
//#GET STORE LIST WITH ID USER LOGIN
export const GET_STORE_LIST_WITH_ID_REQUESTED = 'GET_STORE_LIST_WITH_ID_REQUESTED';
export const GET_STORE_LIST_WITH_ID_FULFILLED = 'GET_STORE_LIST_WITH_ID_FULFILLED';
export const GET_STORE_LIST_WITH_ID_REJECTED = 'GET_STORE_LIST_WITH_ID_REJECTED';

//#CHANGE STATUS STORE STAFF
export const CHANGE_STATUS_STORE_STAFF_REQUESTED = 'CHANGE_STATUS_STORE_STAFF_REQUESTED';
export const CHANGE_STATUS_STORE_STAFF_FULFILLED = 'CHANGE_STATUS_STORE_STAFF_FULFILLED';
export const CHANGE_STATUS_STORE_STAFF_REJECTED = 'CHANGE_STATUS_STORE_STAFF_REJECTED'

//#GET PRINT MEMBER TRANSACTION
export const GET_PRINT_MEMBER_TRANSACTION_REQUESTED = 'GET_PRINT_MEMBER_TRANSACTION_REQUESTED';
export const GET_PRINT_MEMBER_TRANSACTION_FULFILLED = 'GET_PRINT_MEMBER_TRANSACTION_FULFILLED';
export const GET_PRINT_MEMBER_TRANSACTION_REJECTED = 'GET_PRINT_MEMBER_TRANSACTION_REJECTED';

//#GET REPORT STORE CASHIER MEMBER
export const GET_REPORT_STORE_CASHIER_MEMBER_REQUESTED = 'GET_REPORT_STORE_CASHIER_MEMBER_REQUESTED';
export const GET_REPORT_STORE_CASHIER_MEMBER_FULFILLED = 'GET_REPORT_STORE_CASHIER_MEMBER_FULFILLED';
export const GET_REPORT_STORE_CASHIER_MEMBER_REJECTED = 'GET_REPORT_STORE_CASHIER_MEMBER_REJECTED';

//GET REPORT STORE CASHIER MEMBER WITH PRINT
export const GET_REPORT_STORE_CASHIER_MEMBER_PRINT_REQUESTED = 'GET_REPORT_STORE_CASHIER_MEMBER_PRINT_REQUESTED';
export const GET_REPORT_STORE_CASHIER_MEMBER_PRINT_FULFILLED = 'GET_REPORT_STORE_CASHIER_MEMBER_PRINT_FULFILLED';
export const GET_REPORT_STORE_CASHIER_MEMBER_PRINT_REJECTED = 'GET_REPORT_STORE_CASHIER_MEMBER_PRINT_REJECTED';

const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;
const userLogin = localStorage.getItem('userData') ? localStorage.getItem('userData') : null;
const userId =  localStorage.getItem('userData') ? JSON.parse(userLogin).id : null;


export const getStoreList = (data) => {

	return async dispatch => {

		dispatch(fetchRequest());
		
		return axios
			.get(`${constant.API_PATH}store/list?accessToken=${accessToken}`)
			.then((response) => {
				dispatch(fetchSuccess(response));
			})
			.catch((error) => {
				dispatch(fetchError(error));
			})
	}

	function fetchRequest() { return { type: GET_STORE_LIST_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_STORE_LIST_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_STORE_LIST_REJECTED, payload: data } }
}

export const getStoreDetail = (data) => {
	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}store/detail?accessToken=${accessToken}&id=${data.id}`)
			.then((response) => {
				dispatch(fetchSuccess(response));
			})
			.catch((error) => {
				dispatch(fetchError(error));
			})
	}

	function fetchRequest() { return { type: GET_STORE_DETAIL_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_STORE_DETAIL_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_STORE_DETAIL_REJECTED, payload: data } }
}

export const createStore = (data) => {
	return async dispatch => {
		dispatch(createRequest());
		return axios
			.post(`${constant.API_PATH}store/create?accessToken=${accessToken}`, data)
			.then((response) => {
				dispatch(createSuccess(response));
			})
			.catch((error) => {
				dispatch(createError(error))
			})
	}

	function createRequest() { return { type: CREATE_STORE_REQUESTED } }
	function createSuccess(data) { return { type: CREATE_STORE_FULFILLED, payload: data } }
	function createError(data) { return { type: CREATE_STORE_REJECTED, payload: data } }
}

export const updateStore = (data) => {
	return async dispatch => {
		dispatch(updateRequest());
		return axios
			.put(`${constant.API_PATH}store/update?accessToken=${accessToken}`, data)
			.then((response) => {
				dispatch(updateSuccess(response));
			})
			.catch((error) => {
				dispatch(updateError(error))
			})
	}

	function updateRequest() { return { type: UPDATE_STORE_REQUESTED } }
	function updateSuccess(data) { return { type: UPDATE_STORE_FULFILLED, payload: data } }
	function updateError(data) { return { type: UPDATE_STORE_REJECTED, payload: data } }
}

export const changeStatusStore = (data) => {
	console.log(data);
	return async dispatch => {
		dispatch(statusRequest());
		return axios
			.put(`${constant.API_PATH}store/status?accessToken=${accessToken}`, data)
			.then((response) => {
				dispatch(statusSuccess(response, data.id));
			})
			.catch((error) => {
				dispatch(statusError(error, data.id));
			})
	}

	function statusRequest(id) { return { type: CHANGE_STATUS_STORE_REQUESTED, id: id } }
	function statusSuccess(data, id) { return { type: CHANGE_STATUS_STORE_FULFILLED, payload: data, id: id } }
	function statusError(data, id) { return { type: CHANGE_STATUS_STORE_REJECTED, payload: data, id: id } }
}

export const getCategoryList = (data) => {
	return async dispatch => {
		dispatch(categoryRequest());
		return axios
			.get(`${constant.API_PATH}store/category?accessToken=${accessToken}`)
			.then((response) => {
				dispatch(categorySuccess(response));
			})
			.catch((err) => {
				dispatch(categoryError(err));
			})
	}

	function categoryRequest() { return { type: GET_CATEGORY_LIST_REQUESTED } }
	function categorySuccess(data) { return { type: GET_CATEGORY_LIST_FULFILLED, payload: data } }
	function categoryError(data) { return { type: GET_CATEGORY_LIST_REJECTED, payload: data } }
}

//#GET MENU LIST STORE
export const getMenuListStore = (data) => {

	return async dispatch => {

		dispatch(fetchRequest());
		return axios
			
			.get(`${constant.API_PATH}store/menu/list?accessToken=${accessToken}&store=${data.id}`)
			.then((response) => {
				dispatch(fetchSuccess(response));
			})
			.catch((error) => {
				dispatch(fetchError(error));
			})
	}

	function fetchRequest() { return { type: GET_MENU_LIST_STORE_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_MENU_LIST_STORE_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_MENU_LIST_STORE_REJECTED, payload: data } }

}

//#CREATE MENU TRANSACTION
export const createStoreTransaction = (data) => {
	let requiredData = {
		menu : data.menu,
		store : data.store.id,
		token : data.token ? data.token : null,
		staff: data.staff 
	}
	
	return async dispatch => {
		return axios
			.post(`${constant.API_PATH}store/transaction/create?accessToken=${requiredData.token ? requiredData.token : accessToken}`, {
				menu: requiredData.menu,
				store: requiredData.store,
				staff: requiredData.staff
			},{'Content-Type': 'application/json'})
			.then((response) => {
				dispatch(handleSuccess(response.data));
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleSuccess(data) { return { type: CREATE_MENU_TRANSACTION_FULFILLED, payload: data }}
	function handleError(data) { return { type: CREATE_MENU_TRANSACTION_REJECTED, payload: data }}
}

//# GET PRINT STORE TRANSACTION
export const printStoreTransaction = (data) => {

	return async dispatch => {
		dispatch(handleRequest());
		return axios
			.get(`${constant.API_PATH}store/transaction/print?accessToken=${accessToken}&id=${data.id}`)
			.then((response) => {
				dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleRequest() { return { type: GET_PRINT_STORE_TRANSACTION_REQUESTED } }
	function handleSuccess(data) { return { type: GET_PRINT_STORE_TRANSACTION_FULFILLED, payload: data } }
	function handleError(data) { return { type: GET_PRINT_STORE_TRANSACTION_REJECTED, payload: data } }

}

/*
//  CUSTOMER TOP-UP LOGIN 
//  Calls the API to get `accessToken` required to access the app.
*/
export const kasirTopUpLogin = (data) => { 

	console.log(data);
    return async dispatch => {
        dispatch(loginRequest());

        return axios
            .post(`${constant.API_PATH}member/authenticate`, {
                card: data.cardID
            })
            .then((response) => {
                let result = response.data.result;
                // localStorage.setItem('accessTokenTopUp', result.accessToken);
                // localStorage.setItem('userDataTopUp', JSON.stringify(result));
                
                dispatch(loginSuccess(result));
            })
            .catch((error) => {
                dispatch(loginError(error));
            })
    }

    function loginRequest() { return { type: CUSTOMER_TOPUP_LOGIN_REQUESTED } }
    function loginSuccess(data) { return { type: CUSTOMER_TOPUP_LOGIN_FULFILLED, payload: data } }
    function loginError(data) { return { type: CUSTOMER_TOPUP_LOGIN_REJECTED, payload: data } }
}

export const getDiscountListById = (data) => {
	let date = {
		start_date: data.start_date ? data.start_date : '',
		end_date: data.end_date ? data.end_date : '',
		active: data.active ? true : false
	}

	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}store/discount/list?accessToken=${accessToken}&id=${data.id}&start_date=${date.start_date}&end_date=${date.end_date}&active=${date.active}`)
			.then((response) => {
				dispatch(fetchSuccess(response));
			})
			.catch((error) => {
				dispatch(fetchError(error));
			})
	}

	function fetchRequest() { return { type: GET_DISCOUNT_LIST_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_DISCOUNT_LIST_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_DISCOUNT_LIST_REJECTED, payload: data } }
	
}

//GET BONUS TAXI ONLINE
export const getBonusTaxiOnline = () => {

	return async dispatch => {

		dispatch(getBonusRequest());

		return axios
		
			.get(`${constant.API_PATH}tier/list?accessToken=${accessToken}`)
			.then((response) => {
				dispatch(getBonusSuccess(response.data));
			})
			.catch((err) => {
				dispatch(getBonusError(err));
			})
	}

	function getBonusRequest() { return { type: GET_BONUS_TAXI_ONLINE_REQUESTED } }
	function getBonusSuccess(data) { return { type: GET_BONUS_TAXI_ONLINE_FULFILLED, payload: data } }
	function getBonusError(data) { return { type: GET_BONUS_TAXI_ONLINE_REJECTED, payload: data } }
}


//#GET PROMO DISCOUNT ALL
export const getPromoDiscountListAllStore = (data) => {

	console.log(data);

	return async dispatch => {
		
		dispatch(fetchRequest());
		
		return axios
			// .get(`${constant.API_PATH}store/discount/list?accessToken=${accessToken}&id=${data.storeid.id}&start_date=${data.start_date}&end_date=${data.end_date}`)			
			.get(`${constant.API_PATH}store/discount?accessToken=${accessToken}&id=${data.storeid.id}&active=${data.active}`)			
			.then((response) => {
				dispatch(fetchSuccess(response));
			})
			.catch((error) => {
				dispatch(fetchError(error));
			});

			function fetchRequest() { return { type: GET_PROMO_DISCOUNT_ALL_STORE_REQUESTED } }
			function fetchSuccess(data) { return { type: GET_PROMO_DISCOUNT_ALL_STORE_FULFILLED, payload: data } }
			function fetchError(data) { return { type: GET_PROMO_DISCOUNT_ALL_STORE_REJECTED, payload: data } }
	}
}


//#CREATE MENU PRODUCT KASIR STORE
export const createMenuProduct = (data) => {
	
	console.log(data);

	return async dispatch => {
		const formData = new FormData();
		formData.append("store", data.store);
		formData.append('name', data.name);
		formData.append('description', data.deskripsi);
		formData.append('price', data.harga);
		formData.append('image', data.image);

		return axios
			.post(`${constant.API_PATH}store/menu/create?accessToken=${accessToken}`, formData)
			.then((response) => {
				dispatch(handleSuccess(response.data));
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleSuccess(data) { return { type: CREATE_MENU_PRODUCT_KASIR_STORE_FULFILLED, payload: data }}
	function handleError(data) { return { type: CREATE_MENU_PRODUCT_KASIR_STORE_REJECTED, payload: data }}
}

//#UPDATE PROMO
export const updatePromo = (data) => {

	return async dispatch => {
		dispatch(updateRequest());

		return axios
			.put(`${constant.API_PATH}store/discount/update?accessToken=${accessToken}`, data)
			.then((response) => {
				dispatch(updateSuccess(response));
			})
			.catch((error) => {
				dispatch(updateError(error))
			})
	}

	function updateRequest() { return { type: UPDATE_PROMO_REQUESTED } }
	function updateSuccess(data) { return { type: UPDATE_PROMO_FULFILLED, payload: data } }
	function updateError(data) { return { type: UPDATE_PROMO_REJECTED, payload: data } }
}

//#CREATE STAFF STORE 
export const createStaffStore = (data) => {

	console.log(data);

	return async dispatch => {

		return axios
			.post(`${constant.API_PATH}store/staff/create?accessToken=${accessToken}`, {
				
				store: data.store,
				name: data.name,
				username: data.username,
				password: data.password,
				email: data.email,
				level: data.level

			},{'Content-Type': 'application/json'})
			.then((response) => {
				dispatch(handleSuccess(response));
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleSuccess(data) { return { type: CREATE_STAFF_STORE_FULFILLED, payload: data }}
	function handleError(data) { return { type: CREATE_STAFF_STORE_REJECTED, payload: data }}
}

//CREATE DISCOUNT PROMO STORE 
export const createDiscountPromo = (data) => {

	console.log(data);

	return async dispatch => {

		return axios
			.post(`${constant.API_PATH}store/discount/create?accessToken=${accessToken}`, {
				
				store: data.store,
				price: data.price,
				date: data.date

			},{'Content-Type': 'application/json'})
			.then((response) => {
				dispatch(handleSuccess(response.data));
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleSuccess(data) { return { type: CREATE_DISCOUNT_PROMO_STORE_FULFILLED, payload: data }}
	function handleError(data) { return { type: CREATE_DISCOUNT_PROMO_STORE_REJECTED, payload: data }}

}

//#GET STORE LIST WITH ID USER LOGIN
export const getStoreListWithIdUser = (data) => {
	
	// console.log(data);//store.storelistspecial
	
	return async dispatch => {

		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}store/list?accessToken=${accessToken}&id=${userId}`)
			// .get(`${constant.API_PATH}store/list?accessToken=${accessToken}`)
			.then((response) => {
				dispatch(fetchSuccess(response));
			})
			.catch((error) => {
				dispatch(fetchError(error));
			})
	}

	function fetchRequest() { return { type: GET_STORE_LIST_WITH_ID_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_STORE_LIST_WITH_ID_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_STORE_LIST_WITH_ID_REJECTED, payload: data } }
}

//#CHANGE STATUS STORE STAFF
export const changeStatusStaff = (data) => {
	console.log(data);
	return async dispatch => {
		dispatch(statusRequest());
		return axios
			.put(`${constant.API_PATH}store/staff/status?accessToken=${accessToken}`, data)
			.then((response) => {

				dispatch(statusSuccess(response, data.id));
			})
			.catch((error) => {
				dispatch(statusError(error, data.id));
			})
	}

	function statusRequest(id) { return { type: CHANGE_STATUS_STORE_STAFF_REQUESTED, id: id } }
	function statusSuccess(data, id) { return { type: CHANGE_STATUS_STORE_STAFF_FULFILLED, payload: data, id: id } }
	function statusError(data, id) { return { type: CHANGE_STATUS_STORE_STAFF_REJECTED, payload: data, id: id } }
}


//#GET PRINT MEMBER TRANSACTION
export const printMemberTransaction = (data) => {
	console.log(data);

	return async dispatch => {

		dispatch(handleRequest());
		return axios
			.get(`${constant.API_PATH}member/topup/print?accessToken=${accessToken}&id=${data.id}`)
			.then((response) => {
				dispatch(handleSuccess(response.data))
			})
			.catch((error) => {
				dispatch(handleError(error))
			})
	}

	function handleRequest() { return { type: GET_PRINT_MEMBER_TRANSACTION_REQUESTED } }
	function handleSuccess(data) { return { type: GET_PRINT_MEMBER_TRANSACTION_FULFILLED, payload: data } }
	function handleError(data) { return { type: GET_PRINT_MEMBER_TRANSACTION_REJECTED, payload: data } }
}


//#GET REPORT STORE CASHIER MEMBER
export const getReportStoreCashierMember = (data) => {
	console.log(data);

	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			// .get(`${constant.API_PATH}report/user?accessToken=${accessToken}&start_date=${data.start_date}&end_date=${data.end_date}&user=${userId}&print=${data.print}`)
			.get(`${constant.API_PATH}report/user?accessToken=${accessToken}&start_date=${data.start_date}&end_date=${data.end_date}&user=${data.user}`)
			.then((response) => {
				dispatch(fetchSuccess(response.data));
			})
			.catch((error) => {
				dispatch(fetchSuccess(error));
			})
	}

	function fetchRequest() { return { type: GET_REPORT_STORE_CASHIER_MEMBER_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_REPORT_STORE_CASHIER_MEMBER_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_REPORT_STORE_CASHIER_MEMBER_REJECTED, payload: data } }
}


//GET REPORT STORE CASHIER MEMBER WITH PRINT
export const getReportStoreCashierMemberPrint = (data) => {
	// console.log(data);

	// return {
	// 	type: null
	// }
	return async dispatch => {
		dispatch(fetchRequest());
		return axios
			.get(`${constant.API_PATH}report/user?accessToken=${accessToken}&start_date=${data.start_date}&end_date=${data.end_date}&user=${userId}&print=${data.print}`)
			.then((response) => {
				window.open(`${constant.API_PATH}report/user?accessToken=${accessToken}&start_date=${data.start_date}&end_date=${data.end_date}&user=${userId}&print=${data.print}`, '_blank');
				// dispatch(fetchSuccess(response.data));
				// window.print()
			})
			.catch((error) => {
				dispatch(fetchSuccess(error));
			})
	}

	function fetchRequest() { return { type: GET_REPORT_STORE_CASHIER_MEMBER_PRINT_REQUESTED } }
	function fetchSuccess(data) { return { type: GET_REPORT_STORE_CASHIER_MEMBER_PRINT_FULFILLED, payload: data } }
	function fetchError(data) { return { type: GET_REPORT_STORE_CASHIER_MEMBER_PRINT_REJECTED, payload: data } }
}




