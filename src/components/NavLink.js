import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class NavLink extends React.Component {
	render() {
		const {
			route
		} = this.context.router

		// let isActive = this.props.to.includes(route.location.pathname);
		let isActive = route.location.pathname.includes(this.props.to);
		let className = isActive ? 'is-active' : '';

		return (
			<Link className={className} {...this.props}>
				{this.props.children}
			</Link>
		)
	}
}

NavLink.contextTypes = {
	router: PropTypes.object
}

export default NavLink;
