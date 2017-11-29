import React, { Component } from 'react';
import classNames from 'classnames';

class Badge extends Component {
	render() {
		const {
			theme,
			pill,
			className,
			children
		} = this.props;

		const classes = classNames(
			'badge',
			theme ? `badge--${theme}` : null,
			pill ? 'badge--pill' : null,
			className
		)

		return (
			<div className={classes}>
				{children}
			</div>
		);
	}

}

export default Badge;
