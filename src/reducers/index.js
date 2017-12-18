import { combineReducers } from 'redux';
import user from './user.reducer';
import service from './service.reducer';
import cafe from './cafe.reducer';
import member from './member.reducer';
import card from './card.reducer';
import dialog from './dialog.reducer';
import report from './report.reducer';
import access from './access.reducer';
import module from './module.reducer';

const rootReducer = combineReducers({
	user,
	service,
	cafe,
	member,
	card,
	dialog,
	report,
	access,
	module
});

export default rootReducer;
