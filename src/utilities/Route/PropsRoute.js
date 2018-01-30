import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class PropsRoute extends Component {
	render() {
		const {
			component: Component,
			...rest
		} = this.props;
		
		return <Route {...rest} render={(props) => <Component {...props} /> } />
	}
}

export default PropsRoute;



// import React from 'react';
// import { Route } from 'react-router-dom';

// const PropsRoute = (props) => {
// 	const {
// 		component: Component,
// 		...rest
// 	} = props;

// 	return <Route {...rest} render={(routeProps) => <Component {...props} /> } />
// }

// export default PropsRoute;

// const renderMergedProps = (component, ...rest) => {
// 	const finalProps = Object.assign({}, ...rest);
// 	return (
// 		React.createElement(component, finalProps)
// 	)
// }
