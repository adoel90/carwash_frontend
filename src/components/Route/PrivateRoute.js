import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends React.Component {
	render() {
		const {
			component: Component,
			isAuthenticated,
			redirectTo,
			accessToken={accessToken},
			user,
			...rest
		} = this.props;

		const authenticateRoute = (props) => {
			return isAuthenticated
			? <Component {...props} accessToken={accessToken} user={user} />
			: <Redirect to={{pathname: redirectTo, state: {from: props.location}}} />
		}

		return <Route {...rest} render={Component ? authenticateRoute : null} />
	}
}

export default PrivateRoute;
