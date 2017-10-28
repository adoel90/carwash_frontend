import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import classNames from 'classnames';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { AuthRoute } from '../components/Route';

import LoginContainer from '../containers/LoginContainer';
import ServiceContainer from '../containers/ServiceContainer';
import CafeContainer from '../containers/CafeContainer';
import CashierContainer from '../containers/CashierContainer';

class MainView extends React.Component {
	render() {
		const { isAuth, accessToken } = this.props;

		return (
			<Switch>
				<Route name="login" path='/login' component={ LoginContainer } />
				
				<AuthRoute auth={isAuth} name="service" path='/service' component={ ServiceContainer } />
				<AuthRoute auth={isAuth} name="cashier" path='/cashier' component={ CashierContainer } />
				<AuthRoute auth={isAuth} name="cafe" path='/cafe' component={ CafeContainer } />
			</Switch>
		)
	}
}

export default withCookies(MainView);
