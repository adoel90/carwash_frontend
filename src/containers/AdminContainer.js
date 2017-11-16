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
		this.handleRedirect = this.handleRedirect.bind(this);

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

	handleNavigationItems = () => {
		const { user } = this.props;
		const level = user.level.id;

		switch(level) {
			case 1: {
				this.setState({
					navigationItems: [
						{ name: 'Pengaturan', path: '/admin/settings' },
					]
				})
				break;
			}
			case 2: {
				this.setState({
					navigationItems: [
						{ name: 'Kafe', path: '/admin/cafe' },
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


	handleRedirect = () => {
		const {
			isAuthenticated,
			user,
			match
		} = this.props;

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

					{ this.handleRedirect() }
				</MainContent>
			</div>
		);

	}
}

export default AdminContainer;
