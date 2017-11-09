import React from 'react';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends React.Component {
	render() {
		const {
			component: Component,
			isAuthenticated,
			redirectTo,
			accessToken,
			member,
			user,
			...rest
		} = this.props;

		const authenticateRoute = (props) => {
			return isAuthenticated
			? <Component {...props} accessToken={accessToken} user={user} member={member} />
			: <Redirect to={{pathname: redirectTo, state: {from: props.location}}} />
		}

		return <Route {...rest} render={Component ? authenticateRoute : null} />
	}
}

export default PrivateRoute;
