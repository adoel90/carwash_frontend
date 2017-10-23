import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import User from './user.reducer';
import member from './member.reducer';

const rootReducer = combineReducers({
	User,
	member,
	form: formReducer
});

export default rootReducer;
