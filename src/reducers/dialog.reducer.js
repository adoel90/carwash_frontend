import {
	TOGGLE_DIALOG_REQUESTED,
	SHOW_DIALOG_CONFIRM,
	SHOW_DIALOG_SUCCESS,
	CLOSE_DIALOG
} from '../actions/dialog.action';

const initialState = {
	isOpen: false,
	type: '',
	title: '',
	message: '',
	confirm: null,
	close: null,
	cancel: null,
	confirmText: null,
	cancelText: null,
	closeText: null
}

const dialog = (state = initialState, action) => {
	switch(action.type) {
		case TOGGLE_DIALOG_REQUESTED: {
			return initialState;
		}

		case SHOW_DIALOG_CONFIRM: {
			return {
				...state,
				isOpen: true,
				type: action.payload.type,
				title: action.payload.title,
				message: action.payload.message,
				confirm: action.payload.confirm,
				confirmText: action.payload.confirmText,
				cancel: action.payload.cancel,
				cancelText: action.payload.cancelText
			}
		}

		case SHOW_DIALOG_SUCCESS: {
			return {
				...state,
				isOpen: true,
				type: action.payload.type,
				title: action.payload.title,
				message: action.payload.message,
				close: action.payload.close,
				closeText: action.payload.closeText
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
