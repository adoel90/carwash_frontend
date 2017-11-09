import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class NavLink extends React.Component {
	render() {
		const {
			to,
			route,
			className
		} = this.context.router

		const {
			children
		} = this.props;

		let isActive = route.location.pathname.includes(this.props.to);

		const classes = classNames(
			'navigation__link',
			isActive ? 'is-active' : null,
			className
		)

		return (
			<Link className={classes} {...this.props}>
				{children}
			</Link>
		)
	}
}

NavLink.contextTypes = {
	router: PropTypes.object
}

export default NavLink;
