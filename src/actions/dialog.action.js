export const SHOW_DIALOG_CONFIRM = 'SHOW_DIALOG_CONFIRM';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';

export const toggleDialog = (data, isOpen) => {
	return async dispatch => {

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
						cancelText: data.cancelText
					}

					dispatch({
						type: SHOW_DIALOG_CONFIRM,
						payload: dialogData
					})
				}
			}
		} else {
			dispatch({
				type: CLOSE_DIALOG
			})
		}
	}
}
