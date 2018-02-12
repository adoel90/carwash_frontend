import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class PropsRoute extends Component {
	render() {
		const {
			component: Component,
			...rest
		} = this.props;
		
		return <Route {...rest} render={(props) => <Component {...props} {...rest} /> } />
	}
}

export default PropsRoute;