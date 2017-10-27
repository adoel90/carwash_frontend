import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { AuthRoute } from '../components/Route';

import LoginContainer from '../containers/LoginContainer';
import ServiceContainer from '../containers/ServiceContainer';
import CafeContainer from '../containers/CafeContainer';
import CashierContainer from '../containers/CashierContainer';
import ProfileContainer from '../containers/ProfileContainer';

class MainView extends React.Component {
	render() {
		const { isAuth, accessToken } = this.props;

		return (
			<main className="main">
				<Switch>
					<Route name="login" path='/login' component={ LoginContainer } />
					
					<AuthRoute auth={isAuth} name="service" path='/service' component={ ServiceContainer } />
					<AuthRoute auth={isAuth} name="profile" path='/profile' component={ ProfileContainer } />
					<AuthRoute auth={isAuth} name="cashier" path='/cashier' component={ CashierContainer } />
					<AuthRoute auth={isAuth} name="cafe" path='/cafe' component={ CafeContainer } />

					{/*<Route name="service" path='/service' component={ ServiceContainer } />
					<Route name="profile" path='/profile' component={ ProfileContainer } />
					<Route name="cashier" path='/cashier' component={ CashierContainer } />
					<Route name="cafe" path='/cafe' component={ CafeContainer } />*/}
				</Switch>
			</main>
		)
	}
}

export default withCookies(MainView);
