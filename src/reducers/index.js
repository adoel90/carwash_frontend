import { combineReducers } from 'redux';
import User from './user.reducer';
import Service from './service.reducer';

const rootReducer = combineReducers({
	User,
	Service
});

export default rootReducer;
