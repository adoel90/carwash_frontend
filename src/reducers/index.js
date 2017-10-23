import { combineReducers } from 'redux';
import User from './user.reducer';
import member from './member.reducer';

const rootReducer = combineReducers({
	User,
	member
});

export default rootReducer;
