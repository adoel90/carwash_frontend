import { combineReducers } from 'redux';
import user from './user.reducer';
import service from './service.reducer';
import cafe from './cafe.reducer';
import member from './member.reducer';
import card from './card.reducer';
import dialog from './dialog.reducer';

const rootReducer = combineReducers({
	user,
	service,
	cafe,
	member,
	card,
	dialog
});

export default rootReducer;
