import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { PropsRoute, PrivateRoute } from '../Route';
import { AdminHeader, AdminSubheader, AdminContent } from '../Admin';
// import MainHeader from '../MainHeader';
// import MainSubheader from '../MainSubheader';
// import MainContent from '../MainContent';

import LoginContainer from '../../containers/LoginContainer';
import SettingsContainer from '../../containers/SettingsContainer';
import ReportContainer from '../../containers/ReportContainer';
import CashierContainer from '../../containers/CashierContainer';
import CafeContainer from '../../containers/CafeContainer';

class Admin extends Component {
	constructor() {
		super();
		this.handleRedirect = this.handleRedirect.bind(this);
	}

	handleRedirect = () => {
		const {
			user,
			match,
			isAuthenticated,
			navigations,
			history
		} = this.props;

		if(!isAuthenticated) {
			return <Redirect from="/*" to={`${match.url}/login`} />
		}
		else {
			return navigations.length
			? <Redirect to={navigations[0].path} />
			: null
		}
	}

	render() {
		const {
			match,
			isAuthenticated,
			user,
			accessToken
		} = this.props;

		return (
			<div>
				<AdminHeader {...this.props} />
				<AdminSubheader {...this.props} />
				<AdminContent>
					{ this.handleRedirect() }
					<Route name="login" path={`${match.url}/login`} component={ LoginContainer } />
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
						name="report"
						path={`${match.url}/report`}
						component={ReportContainer}
						isAuthenticated={isAuthenticated}
						redirectTo={`${match.url}/login`}
						user={user}
						accessToken={accessToken}
					/>

					<PrivateRoute
						name="cafe"
						path={`${match.url}/cafe`}
						component={CafeContainer}
						isAuthenticated={isAuthenticated}
						redirectTo={`${match.url}/login`}
						user={user}
						accessToken={accessToken}
					/>
					<PrivateRoute
						name="cashier"
						path={`${match.url}/cashier`}
						component={CashierContainer}
						isAuthenticated={isAuthenticated}
						redirectTo={`${match.url}/login`}
						user={user}
						accessToken={accessToken}
					/>
				</AdminContent>
			</div>
		);
	}

}

export default Admin;
