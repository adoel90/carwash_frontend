import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginContainer from '../containers/LoginContainer';
import ServiceContainer from '../containers/ServiceContainer';
import CafeContainer from '../containers/CafeContainer';
import CashierContainer from '../containers/CashierContainer';
import ProfileContainer from '../containers/ProfileContainer';
import SettingContainer from '../containers/SettingContainer';

class MainView extends React.Component {
	render() {
		return (
<<<<<<< HEAD
			<Switch>
				<Route name="login" path='/login' component={ LoginContainer } />
				<Route name="self-service" path='/self-service' component={ SelfServiceContainer } />
				<Route name="profile" path='/profile' component={ ProfileContainer } />
				<Route name="cashier" path='/cashier' component={ CashierContainer } />
				<Route name="cafe" path='/cafe' component={ CafeContainer } />
				<Route name="setting" path='/setting' component={ SettingContainer } />
			</Switch>
=======
			<main className="main">
				<Switch>
					<Route name="login" path='/login' component={ LoginContainer } />
					<Route name="service" path='/service' component={ ServiceContainer } />
					<Route name="profile" path='/profile' component={ ProfileContainer } />
					<Route name="cashier" path='/cashier' component={ CashierContainer } />
					<Route name="cafe" path='/cafe' component={ CafeContainer } />
					<Redirect from="/*" to="service" />
				</Switch>
			</main>
>>>>>>> development
		)
	}
}

export default MainView;
