import { combineReducers } from 'redux';
import user from './user.reducer';
import service from './service.reducer';
import cafe from './cafe.reducer';

const rootReducer = combineReducers({
	user,
	service,
	cafe
});

export default rootReducer;
