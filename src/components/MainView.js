import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PrivateRoute, PropsRoute } from '../components/Route';


import AdminContainer from '../containers/AdminContainer';
import CustomerContainer from '../containers/CustomerContainer';
import LogoutContainer from '../containers/LogoutContainer';

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
				<Route name="logout" path="/logout" component={LogoutContainer} />
			</Switch>
		)
	}
}

export default MainView;
