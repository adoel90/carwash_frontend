import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeContainer from '../containers/HomeContainer';
import LoginContainer from '../containers/LoginContainer';
import CashierContainer from '../containers/CashierContainer';

class MainView extends React.Component {
	render() {
		return (
			<Switch>
				<Route name="home" exact path='/login' component={ LoginContainer } />
				<Route name="home" path='/cashier' component={ CashierContainer } />
				<Route name="home" path='/' component={ HomeContainer } />
			</Switch>
		)
	}
}

export default MainView;
