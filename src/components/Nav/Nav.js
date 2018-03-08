import React, { Component } from 'react';
import classNames from 'classnames';

class Nav extends Component {
	render() {
		const {
			tabs,
			children,
			className,
			attributes
		} = this.props;

		const classes = classNames(
			'navigation',
			tabs ? 'tab-navigation' : null,
			className
		);

		return (
			<nav className={classes} {...attributes}>
				<ul className="navigation__list">
					{children}
				</ul>
			</nav>
		);
	}

}

export default Nav;
