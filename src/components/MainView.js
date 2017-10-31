import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from '../components/Route';

import LoginContainer from '../containers/LoginContainer';
import ServiceContainer from '../containers/ServiceContainer';
import CafeContainer from '../containers/CafeContainer';
import CashierContainer from '../containers/CashierContainer';

class MainView extends React.Component {
	render() {
		const {
			isAuthenticated,
			accessToken,
			user
		} = this.props;

		return (
			<Switch>
				<Route name="login" path='/login' component={ LoginContainer } />
				<PrivateRoute name="service" path='/service' component={ServiceContainer} isAuthenticated={isAuthenticated} user={user} accessToken={accessToken} />
				<PrivateRoute name="cashier" path='/cashier' component={CashierContainer} isAuthenticated={isAuthenticated} user={user} accessToken={accessToken} />
				<PrivateRoute name="cafe" path='/cafe' component={CafeContainer} isAuthenticated={isAuthenticated} user={user} />
			</Switch>
		)
	}
}

export default MainView;
