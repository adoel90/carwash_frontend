import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import User from './user.reducer';
import member from './member.reducer';
import service from './service.reducer';

const rootReducer = combineReducers({
	User,
	member,
	service,
	form: formReducer
});

export default rootReducer;
