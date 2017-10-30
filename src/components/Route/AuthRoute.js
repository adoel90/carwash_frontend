import React from 'react';
import { Route, Redirect } from 'react-router-dom';

class AuthRoute extends React.Component {
	render() {
		const {
			component: Component,
			auth,
			...rest
		} = this.props;

		const authenticate = (props) => {
			console.log(props);

			return auth
			? <Component {...props} />
			: <Redirect to={{pathname: '/login', state: {from: props.location}}} />
		}

		return <Route {...rest} render={authenticate} />

	}
}

export default AuthRoute;
