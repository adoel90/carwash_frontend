export const OPEN_DIALOG_FULFILLED = 'OPEN_DIALOG_FULFILLED';
export const CLOSE_DIALOG_FULFILLED = 'CLOSE_DIALOG_FULFILLED';

export const openDialog = (data) => {
	return async(dispatch) => {
		if(data) {
			let dialogData = {
				type: data.type,
				title: data.title,
				message: data.message,
				onConfirm: data.onConfirm || null,
				confirmText: data.confirmText || null,
				onClose: data.onClose,
				closeText: data.closeText
			}
	
			dispatch({
				type: OPEN_DIALOG_FULFILLED,
				data: dialogData
			})
		}
	}
}

export const closeDialog = (data) => {
	return async(dispatch) => {
		dispatch({ type: CLOSE_DIALOG_FULFILLED })
	}
}

// export const SHOW_DIALOG_FULFILLED = 'SHOW_DIALOG_FULFILLED';
// export const HIDE_DIALOG_FULFILLED = 'HIDE_DIALOG_FULFILLED';

// export const showDialog = (data) => {
// 	return async dispatch => {
// 		let dialogData = {
// 			type: data.type,
// 			title: data.title,
// 			message: data.message,
// 			onConfirm: data.onConfirm || null,
// 			confirmText: data.confirmText || null,
// 			onClose: data.onClose || null,
// 			closeText: data.closeText
// 		}

// 		dispatch(showDialog(dialogData));
// 	}

// 	function showDialog(data) {
// 		return {
// 			type: SHOW_DIALOG_FULFILLED,
// 			payload: data
// 		}
// 	}
// }

// export const hideDialog = () => {
// 	return async dispatch => {
// 		dispatch(hideDialog())
// 	}

// 	function hideDialog() {
// 		return {
// 			type: HIDE_DIALOG_FULFILLED
// 		}
// 	}
// }