import { combineReducers } from 'redux';
import user from './user.reducer';
import service from './service.reducer';

const rootReducer = combineReducers({
	user,
	service
});

export default rootReducer;
