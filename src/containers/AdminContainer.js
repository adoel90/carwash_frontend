import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { PropsRoute, PrivateRoute } from '../components/Route';

import MainHeader from '../components/MainHeader';
import MainSubheader from '../components/MainSubheader';
import MainContent from '../components/MainContent';

import LoginContainer from '../containers/LoginContainer';
import CashierContainer from '../containers/CashierContainer';
import CafeContainer from '../containers/CafeContainer';
import SettingsContainer from '../containers/SettingsContainer';

class AdminContainer extends React.Component {
	constructor() {
		super();
		this.handleNavigationItems = this.handleNavigationItems.bind(this);
		this.handleRouteRedirect = this.handleRouteRedirect.bind(this);

		this.state = {
			navigationItems: []
		}
	}

	componentDidMount = () => {
		const { user } = this.props;

		if(user.level) {
			this.handleNavigationItems();
		}
	}

	// componentDidUpdate = () => {
	// 	console.log(this.state.navigationItems);
	// }

	handleNavigationItems = () => {
		const { user } = this.props;
		const level = user.level.id;

		switch(level) {
			case 1: {
				this.setState({
					navigationItems: [
						{ name: 'Dashboard', path: '/admin/dashboard' },
						{ name: 'Pengaturan', path: '/admin/settings' },
					]
				})
				break;
			}
			case 2: {
				this.setState({
					navigationItems: [
						{ name: 'Cafe', path: '/admin/cafe' },
						{ name: 'Kasir', path: '/admin/cashier' },
					]
				})
				break;
			}

			default: {
				return null;
			}
		}
	}


	handleRouteRedirect = () => {
		const {
			isAuthenticated,
			user,
			match
		} = this.props;

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
				<MainHeader {...this.state} {...this.props} />
				<MainSubheader {...this.state} {...this.props} />
				<MainContent>
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

					{ this.handleRouteRedirect() }
				</MainContent>
			</div>
		);

	}
}

export default AdminContainer;
