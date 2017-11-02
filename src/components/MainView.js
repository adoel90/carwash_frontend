import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PrivateRoute, PropsRoute } from '../components/Route';

import LoginContainer from '../containers/LoginContainer';
import ServiceContainer from '../containers/ServiceContainer';
import CafeContainer from '../containers/CafeContainer';
import CashierContainer from '../containers/CashierContainer';

import AdminContainer from '../containers/AdminContainer';
import CustomerContainer from '../containers/CustomerContainer';

class MainView extends React.Component {
	render() {
		const {
			isAuthenticated,
			accessToken,
			user
		} = this.props;

		return (
			<Switch>
				<PropsRoute name="admin" path="/admin" component={AdminContainer} {...this.props} />
				<PropsRoute name="customer" path="/customer" component={CustomerContainer} {...this.props} />
			</Switch>
		)
	}
}

export default MainView;
