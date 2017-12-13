import React from 'react';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends React.Component {
	render() {
		console.log(this.props);
		
		const {
			component: Component,
			isAuthenticated,
			redirectTo,
			accessToken,
			member,
			user,
			...rest
		} = this.props;

		const renderComponent = (props) => {
			return isAuthenticated
			? <Component {...props} accessToken={accessToken} user={user} member={member} />
			: <Redirect to={{pathname: redirectTo, state: {from: props.location}}} />
		}

		return <Route {...rest} render={Component ? renderComponent : null} />
	}
}

export default PrivateRoute;
