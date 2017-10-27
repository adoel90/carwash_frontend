import React from 'react';
import { Route, Redirect } from 'react-router-dom';
 
class AuthRoute extends React.Component {
	render() {
		const {
			component: Component,
			auth,
			...rest
		} = this.props;

		const authenticate = () => {
			return auth 
			? <Component {...this.props} />
			: <Redirect to={{pathname: '/login', state: {from: this.props.location}}} />
		}

		return <Route {...rest} render={authenticate} />

	}
}

export default AuthRoute;