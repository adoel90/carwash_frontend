import { combineReducers } from 'redux';
import user from './user.reducer';
import service from './service.reducer';
import cafe from './cafe.reducer';
import auth from './auth.reducer';

const rootReducer = combineReducers({
	user,
	service,
	cafe,
	auth
});

export default rootReducer;
