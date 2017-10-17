import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomeContainer from '../containers/HomeContainer';
import LoginContainer from '../containers/LoginContainer';
import CashierContainer from '../containers/CashierContainer';
import TopupContainer from '../containers/TopupContainer';
import LandingContainer from '../containers/LandingContainer';
import SelfServiceContainer from '../containers/SelfServiceContainer';

class MainView extends React.Component {
	render() {
		return (
			<Switch>
				<Route name="login" path='/login' component={ LoginContainer } />
				<Route name="cashier/register" path='/cashier' component={ CashierContainer } />
				<Redirect from="/cashier" to="/cashier/register" />
				{/* <Route name="topup" path='/topup' component={ TopupContainer } /> */}
				<Route name="home" path='/home' component={ HomeContainer } />
				<Route name="dashboard" path='/self-service' component={ SelfServiceContainer } />
				<Route name="self-service" path='/self-service' component={ SelfServiceContainer } />
				<Redirect from="/" to="self-service" />
				<Redirect from="/self-service" to="/self-service/car-wash" />
			</Switch>
		)
	}
}

export default MainView;
