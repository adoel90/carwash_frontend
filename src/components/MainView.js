import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeContainer from '../containers/HomeContainer';
import LoginContainer from '../containers/LoginContainer';
import CashierContainer from '../containers/CashierContainer';
import TopupContainer from '../containers/TopupContainer';
import LandingContainer from '../containers/LandingContainer';
import ServicesContainer from '../containers/ServicesContainer';

class MainView extends React.Component {
	render() {
		return (
			<Switch>
				<Route name="landing" exact path='/' component={ LandingContainer } />
				<Route name="services" path='/services' component={ ServicesContainer } />
				<Route name="login" path='/login' component={ LoginContainer } />
				<Route name="cashier" path='/cashier' component={ CashierContainer } />
				<Route name="topup" path='/topup' component={ TopupContainer } />
				<Route name="home" path='/' component={ HomeContainer } />
			</Switch>
		)
	}
}

export default MainView;
