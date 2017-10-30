import { combineReducers } from 'redux';
import authentication from './authentication.reducer';
import service from './service.reducer';
import cafe from './cafe.reducer';

const rootReducer = combineReducers({
	authentication,
	service,
	cafe
});

export default rootReducer;
