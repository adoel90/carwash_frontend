import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import classNames from 'classnames';

class NavTabLink extends Component {

	render() {
		const {
			active,
			children,
			className
		} = this.props;

		const classes = classNames(
			'navigation__link',
			active ? 'is-active' : null,
			className
		)

		return (
			<a className={classes} {...this.props}>
				{this.props.children}
			</a>
		);
	}

}

export default NavTabLink;
