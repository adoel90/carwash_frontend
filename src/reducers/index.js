import { combineReducers } from 'redux';
<<<<<<< HEAD
import { reducer as formReducer } from 'redux-form';
import User from './user.reducer';
import member from './member.reducer';

const rootReducer = combineReducers({
	User,
	member,
	form: formReducer
=======
import user from './user.reducer';
import service from './service.reducer';

const rootReducer = combineReducers({
	user,
	service
>>>>>>> development
});

export default rootReducer;
