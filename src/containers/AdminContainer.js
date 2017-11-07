import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { PropsRoute, PrivateRoute } from '../components/Route';

import LoginContainer from '../containers/LoginContainer';
import CashierContainer from '../containers/CashierContainer';
import CafeContainer from '../containers/CafeContainer';
import SettingsContainer from '../containers/SettingsContainer';

class AdminContainer extends React.Component {
	constructor() {
		super();
		this.handleRouteRedirect = this.handleRouteRedirect.bind(this);
	}

	componentDidMount = () => {
		this.handleRouteRedirect();
	}

	handleRouteRedirect = () => {
		const { isAuthenticated, user, match } = this.props;

		if(!isAuthenticated) {
			return <Redirect from={`${match.url}`} to={`${match.url}/login`} />
		} else {
			switch(user.level.id) {
				case 1: return <Redirect to={`${match.url}/dashboard`} />
				case 2: return <Redirect to={`${match.url}/cafe`} />
				default: return null;
			}
		}
	}

	render() {
		const {
			isAuthenticated,
			accessToken,
			user,
			match,
			...rest
		} = this.props;

		return (
			<div>
				<Route name="login" path={`${match.url}/login`} component={ LoginContainer } />
				<PrivateRoute
					name="cafe"
					path={`${match.url}/cafe`}
					component={CafeContainer}
					isAuthenticated={isAuthenticated}
					user={user}
					accessToken={accessToken}
					redirectTo={`${match.url}/login`}
				/>
				<PrivateRoute
					name="settings"
					path={`${match.url}/settings`}
					component={SettingsContainer}
					isAuthenticated={isAuthenticated}
					user={user}
					accessToken={accessToken}
					redirectTo={`${match.url}/login`}
				/>
				<PrivateRoute
					name="cashier"
					path={`${match.url}/cashier`}
					component={CashierContainer}
					isAuthenticated={isAuthenticated}
					user={user}
					accessToken={accessToken}
					redirectTo={`${match.url}/login`}
				/>

				<Redirect from={`${match.url}`} to={`${match.url}/login`} />
			</div>
		);

	}
}

export default AdminContainer;
