export const SHOW_DIALOG_FULFILLED = 'SHOW_DIALOG_FULFILLED';
export const HIDE_DIALOG_FULFILLED = 'HIDE_DIALOG_FULFILLED';

export const showDialog = (data) => {
	return async dispatch => {
		let dialogData = {
			type: data.type,
			title: data.title,
			message: data.message,
			onConfirm: data.onConfirm || null,
			confirmText: data.confirmText || null,
			onClose: data.onClose || null,
			closeText: data.closeText
		}

		dispatch(showDialog(dialogData));
	}

	function showDialog(data) {
		return {
			type: SHOW_DIALOG_FULFILLED,
			payload: data
		}
	}
}

export const hideDialog = () => {
	return async dispatch => {
		dispatch(hideDialog())
	}

	function hideDialog() {
		return {
			type: HIDE_DIALOG_FULFILLED
		}
	}
}

// export const toggleDialog = (data, isOpen) => {
// 	return async dispatch => {

// 		dispatch({ type: TOGGLE_DIALOG_REQUESTED })

// 		if(!isOpen) {
// 			let dialogData = {};

// 			switch(data.type) {
// 				case 'confirm': {
// 					dialogData = {
// 						type: data.type,
// 						title: data.title,
// 						message: data.message,
// 						confirm: data.confirm,
// 						confirmText: data.confirmText,
// 						cancel: data.cancel,
// 						cancelText: data.cancelText
// 					}

// 					dispatch({
// 						type: SHOW_DIALOG_CONFIRM,
// 						payload: dialogData
// 					})
// 				}

// 				case 'success': {
// 					dialogData = {
// 						type: data.type,
// 						title: data.title,
// 						message: data.message,
// 						close: data.close,
// 						closeText: data.closeText
// 					}
// 				}

// 				dispatch({
// 					type: SHOW_DIALOG_SUCCESS,
// 					payload: dialogData
// 				})
// 			}
// 		} else {
// 			dispatch({ type: CLOSE_DIALOG })
// 		}
// 	}
// }
