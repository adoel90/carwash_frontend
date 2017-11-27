import React, { Component } from 'react';

import { Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from '../components/Route';

import MainHeader from '../components/MainHeader';
import MainSubheader from '../components/MainSubheader';
import MainContent from '../components/MainContent';

import LandingContainer from '../containers/LandingContainer';
import ServiceContainer from '../containers/ServiceContainer';

class CustomerContainer extends Component {
	constructor() {
		super();
		this.handleRouteRedirect = this.handleRouteRedirect.bind(this);
		this.state = {
			navigations: [
				{ id: 1, name: 'Pilih Layanan', path: "/customer/service" },
				{ id: 2, name: 'Profil Saya', path: "/customer/my-profile" },
				{ id: 3, name: 'Kartu Saya', path: "/customer/my-card" },
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
			match
		} = this.props;

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
					<Redirect from={`${match.url}`} to={`${match.url}/landing`} />
					{ this.handleRouteRedirect() }
				</MainContent>
			</div>
		);
	}
}

export default CustomerContainer;
