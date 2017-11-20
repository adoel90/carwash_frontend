import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { PropsRoute, PrivateRoute } from '../Route';
import MainHeader from '../MainHeader';
import MainSubheader from '../MainSubheader';
import MainContent from '../MainContent';

import LoginContainer from '../../containers/LoginContainer';
import SettingsContainer from '../../containers/SettingsContainer';
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
			handleNavigationItems
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

		console.log(isAuthenticated);

		if(!isAuthenticated) {
			return <Redirect from={`${match.url}`} to={`${match.url}/login`} />
		} else {
			switch(user.level.id) {
				case 1: return <Redirect to={`${match.url}/settings`} />
				case 2: return <Redirect to={`${match.url}/cafe`} />
				default: return null;
			}
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
				<MainHeader {...this.props} />
				<MainSubheader {...this.props} />
				<MainContent>
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

					{/* <Redirect from={`${match.url}`} to={`${match.url}/login`} /> */}
					{this.handleRedirect()}
				</MainContent>
			</div>
		);
	}

}

export default Admin;
