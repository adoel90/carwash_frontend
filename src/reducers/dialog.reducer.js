import {
	OPEN_DIALOG_FULFILLED,
	CLOSE_DIALOG_FULFILLED
} from '../actions/dialog.action';

const initialState = {
	data: {},
	isOpened: false,
	isClosed: false,
	isError: false,
	error: {}
}

const dialog = (state = initialState, action) => {
	switch(action.type) {
		case 'OPEN_DIALOG_FULFILLED': {
			return {
				...state,
				isOpened: true,
				isClosed: false,
				data: action.data
			}
		}

		case 'CLOSE_DIALOG_FULFILLED': {
			return {
				...state,
				isOpened: false,
				isClosed: true,
				data: {}
			}
		}

		default: {
			return state;
		}
	}
}

export default dialog;
