import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { PropsRoute, PrivateRoute } from './Route';
import AdminContainer from '../containers/AdminContainer';
import CustomerContainer from '../containers/CustomerContainer';
import LogoutContainer from '../containers/LogoutContainer';

class MainRoutes extends Component {
	render() {
		const {
			isAuthenticated,
			user,
			accessToken
		} = this.props;

		return (
			<Switch>
				<PropsRoute
					name="admin"
					path="/admin"
					component={AdminContainer}
					{...this.props}
				/>
				<PropsRoute
					name="customer"
					path="/customer"
					component={CustomerContainer}
					{...this.props}
				/>
				<PrivateRoute
					name="logout"
					path="/logout"
					component={LogoutContainer}
					isAuthenticated={isAuthenticated}
					user={user}
					accessToken={accessToken}
					redirectTo="/"
				/>
			</Switch>
		)

		// return (
		// 	<Switch>
		// 		<PropsRoute
		// 			name="admin"
		// 			path="/admin"
		// 			component={AdminContainer}
		// 			{...this.props}
		// 		/>
		// 		<PropsRoute
		// 			name="customer"
		// 			path="/customer"
		// 			component={CustomerContainer}
		// 			{...this.props}
		// 		/>
		// 		<PrivateRoute
		// 			name="logout"
		// 			path="/logout"
		// 			component={LogoutContainer}
		// 			isAuthenticated={isAuthenticated}
		// 			user={user}
		// 			accessToken={accessToken}
		// 			redirectTo="/"
		// 		/>
		// 	</Switch>
		// );
	}
}

export default MainRoutes;
