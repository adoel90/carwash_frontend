import { combineReducers } from 'redux';
import authentication from './authentication.reducer';

import user from './user.reducer';
import service from './service.reducer';
import cafe from './cafe.reducer';
import member from './member.reducer';
import card from './card.reducer';
import dialog from './dialog.reducer';
import report from './report.reducer';
import access from './access.reducer';
import module from './module.reducer';
import vendor from './vendor.user.reducer';

const rootReducer = combineReducers({
	authentication,
	user,
	service,
	cafe,
	member,
	card,
	dialog,
	report,
	access,
	module,
	vendor
});

export default rootReducer;
