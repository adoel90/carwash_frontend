import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { withCookies } from 'react-cookie';
import { AuthRoute } from '../components/Route';

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
				<AuthRoute name="service" path='/service' component={ServiceContainer} isAuthenticated={isAuthenticated} />
				<AuthRoute name="cashier" path='/cashier' component={CashierContainer} isAuthenticated={isAuthenticated} />
				<AuthRoute name="cafe" path='/cafe' component={CafeContainer} isAuthenticated={isAuthenticated} />
				<Redirect from="/" to="/login" />
			</Switch>
		)
	}
}

export default withCookies(MainView);
