import React from 'react';
import { Route } from 'react-router-dom';

const renderMergedProps = (component, ...rest) => {
	const finalProps = Object.assign({}, ...rest);
	return (
		React.createElement(component, finalProps)
	)
}

const PropsRoute = (props) => {
	const {
		component,
		...rest
	} = props;

	return (
		<Route {...rest} render={routeProps => {
			return renderMergedProps(component, routeProps, rest)
		}} />
	)

	// const renderRoute = (props) => {
	// 	return <Component {...props} {...rest} />
	// };
	//
	// return <Route {...rest} render={renderRoute} />
}
//
// class PropsRoute extends React.Component {
// 	render() {
// 		const {
// 			component: Component,
// 			...rest
// 		} = this.props;
//
// 		const renderRoute = (routeProps) => {
// 			return <Component {...routeProps} {...rest} />
// 		};
//
// 		return <Route {...rest} render={renderRoute} />
// 	}
// }

export default PropsRoute;
