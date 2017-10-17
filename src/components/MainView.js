import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginContainer from '../containers/LoginContainer';
import SelfServiceContainer from '../containers/SelfServiceContainer';
import CashierContainer from '../containers/CashierContainer';
import ProfileContainer from '../containers/ProfileContainer';

class MainView extends React.Component {
	render() {
		return (
			<Switch>
				<Route name="login" path='/login' component={ LoginContainer } />
				<Route name="self-service" path='/self-service' component={ SelfServiceContainer } />
				<Route name="cashier" path='/cashier' component={ CashierContainer } />
				<Route name="profile" path='/profile' component={ ProfileContainer } />
			</Switch>
		)
	}
}

export default MainView;
