import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends React.Component {
	render() {
		const {
			component: Component,
			isAuthenticated,
			user,
			accessToken,
			...rest
		} = this.props;

		const authenticate = (props) => {
			return isAuthenticated
			? <Component {...props} user={user} accessToken={accessToken} />
			: <Redirect to={{pathname: '/login', state: {from: props.location}}} />
		}

		return <Route {...rest} render={authenticate} />
	}
}

export default PrivateRoute;
