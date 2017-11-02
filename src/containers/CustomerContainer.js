import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import { PrivateRoute } from '../components/Route';

import LandingContainer from '../containers/LandingContainer';
import ServiceContainer from '../containers/ServiceContainer';

class Customer extends Component {
	render() {
		const {
			isAuthenticated,
			accessToken,
			user,
			match
		} = this.props;

		return (
			<div>
				<Route
					name="landing"
					path="/landing"
					component={LandingContainer}
				/>
				<PrivateRoute
					name="service"
					path='/service'
					component={ServiceContainer}
					isAuthenticated={isAuthenticated}
					user={user}
					accessToken={accessToken}
					redirectTo={`${match.url}/landing`}
				/>
			</div>
		);
	}

}

export default Customer;
