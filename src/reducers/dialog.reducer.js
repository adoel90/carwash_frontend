import {
	SHOW_DIALOG_CONFIRM,
	CLOSE_DIALOG
} from '../actions/dialog.action';

const initialState = {
	isOpen: false,
	type: '',
	title: '',
	message: '',
	confirm: '',
	confirmText: '',
	cancelText: ''
}

const dialog = (state = initialState, action) => {
	switch(action.type) {
		case SHOW_DIALOG_CONFIRM: {
			return {
				...state,
				isOpen: true,
				type: action.payload.type,
				title: action.payload.title,
				message: action.payload.message,
				confirm: action.payload.confirm,
				confirmText: action.payload.confirmText,
				cancelText: action.payload.cancelText
			}
		}

		case CLOSE_DIALOG: {
			return {
				...state,
				isOpen: false
			}
		}

		default: {
			return state;
		}
	}
}

export default dialog;
