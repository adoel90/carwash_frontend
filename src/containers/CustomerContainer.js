import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from '../components/Route';

import LandingContainer from '../containers/LandingContainer';
import ServiceContainer from '../containers/ServiceContainer';

class CustomerContainer extends Component {
	constructor() {
		super();
		this.handleRouteRedirect = this.handleRouteRedirect.bind(this);
	}

	componentDidMount = () => {
		this.handleRouteRedirect();
	}

	componentDidUpdate = (prevProps) => {
		if(prevProps !== this.props) {
			this.handleRouteRedirect();
		}
	}

	handleRouteRedirect = () => {
		const { isAuthenticated, match } = this.props;

		if(isAuthenticated) {
			<Redirect from={`${match.url}`} to={`${match.url}/service`} />
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
			</div>
		);
	}

}

export default CustomerContainer;
