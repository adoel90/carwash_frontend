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

	componentDidMount = () => {
		const {
			isAuthenticated,
			handleNavigationItems,
			handleRedirect
		} = this.props

		if(isAuthenticated) {
			handleNavigationItems();
		}
	}

	handleRedirect = () => {
		const {
			user,
			match,
			isAuthenticated
		} = this.props;

		if(!isAuthenticated) {
			console.log(123);
			return <Redirect from="/*" to={`${match.url}/login`} />
		}
		else {
			let userLevel = user.level.id;
			switch(userLevel) {
				case 1: return <Redirect from="/*" to={`${match.url}/settings`} />
				case 2: return <Redirect from="/*" to={`${match.url}/cafe`} />
				default: return null;
			}
		}

		// if(!isAuthenticated) {
		// 	return <Redirect from={`${match.url}`} to={`${match.url}/login`} />
		// }
		// else {
		// 	switch(user.level.id) {
		// 		case 1: return <Redirect from={match.url} to={`${match.url}/settings`} />
		// 		case 2: return <Redirect from={match.url} to={`${match.url}/cafe`} />
		// 		default: return null;
		// 	}
		// }
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
