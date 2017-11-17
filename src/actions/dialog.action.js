export const TOGGLE_DIALOG_REQUESTED = 'TOGGLE_DIALOG_REQUESTED';
export const SHOW_DIALOG_CONFIRM = 'SHOW_DIALOG_CONFIRM';
export const SHOW_DIALOG_SUCCESS = 'SHOW_DIALOG_SUCCESS';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';

export const toggleDialog = (data, isOpen) => {
	return async dispatch => {

		dispatch({ type: TOGGLE_DIALOG_REQUESTED })

		if(!isOpen) {
			let dialogData = {};

			switch(data.type) {
				case 'confirm': {
					dialogData = {
						type: data.type,
						title: data.title,
						message: data.message,
						confirm: data.confirm,
						confirmText: data.confirmText,
						cancel: data.cancel,
						cancelText: data.cancelText
					}

					dispatch({
						type: SHOW_DIALOG_CONFIRM,
						payload: dialogData
					})
				}

				case 'success': {
					dialogData = {
						type: data.type,
						title: data.title,
						message: data.message,
						close: data.close,
						closeText: data.closeText
					}
				}

				dispatch({
					type: SHOW_DIALOG_SUCCESS,
					payload: dialogData
				})
			}
		} else {
			dispatch({ type: CLOSE_DIALOG })
		}
	}
}
