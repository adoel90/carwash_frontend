import { combineReducers } from 'redux';
import authentication from './authentication.reducer';
import service from './service.reducer';
import cafe from './cafe.reducer';
import member from './member.reducer';
import dialog from './dialog.reducer';

const rootReducer = combineReducers({
	authentication,
	service,
	cafe,
	member,
	dialog
});

export default rootReducer;
