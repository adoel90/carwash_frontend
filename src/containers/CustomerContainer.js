import React, { Component } from 'react';

import { Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from '../components/Route';

import MainHeader from '../components/MainHeader';
import MainSubheader from '../components/MainSubheader';
import MainContent from '../components/MainContent';

import LandingContainer from './LandingContainer';
import ServiceContainer from './ServiceContainer';
import ProfileContainer from './ProfileContainer';

class CustomerContainer extends Component {
	constructor() {
		super();
		this.handleRouteRedirect = this.handleRouteRedirect.bind(this);
		this.state = {
			navigations: [
				{ id: 1, name: 'Pilih Layanan', path: "/customer/service" },
				{ id: 2, name: 'Profil Saya', path: "/customer/profile" },
			]
		}
	}

	handleRouteRedirect = () => {
		const {
			isAuthenticated,
			match
		} = this.props;

		if(isAuthenticated) {
			return <Redirect from={`${match.url}`} to={`${match.url}/service`} />
		} else {
			return <Redirect from={`${match.url}`} to={`${match.url}/landing`} />
		}
	}

	render() {
		const {
			isAuthenticated,
			accessToken,
			member,
			user,
			match
		} = this.props;

		if(user.id) {
			return <p>You are not authorized to view this content.</p>
		}

		return (
			<div>
				<MainHeader {...this.state} {...this.props} />
				<MainSubheader {...this.state} {...this.props} />
				<MainContent>
					<Route
						name="landing"
						path={`${match.url}/landing`}
						component={LandingContainer}
					/>
					<PrivateRoute
						name="service"
						path={`${match.url}/service`}
						component={ServiceContainer}
						isAuthenticated={isAuthenticated}
						member={member}
						accessToken={accessToken}
						redirectTo={`${match.url}/landing`}
					/>
					<PrivateRoute
						name="profile"
						path={`${match.url}/profile`}
						component={ProfileContainer}
						isAuthenticated={isAuthenticated}
						member={member}
						accessToken={accessToken}
						redirectTO={`${match.url}/landing`}
					/>
					<Redirect from={`${match.url}`} to={`${match.url}/landing`} />
					{ this.handleRouteRedirect() }
				</MainContent>
			</div>
		);
	}
}

export default CustomerContainer;
