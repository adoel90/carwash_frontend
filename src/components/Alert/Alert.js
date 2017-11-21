import React, { Component } from 'react';
import classNames from 'classnames';

class Alert extends Component {
	render() {
		const {
			theme,
			className,
			children
		} = this.props;

		const classes = classNames(
			'alert',
			theme ? `alert--${theme}` : null,
			className
		)

		return (
			<div className={classes}>
				{children}
			</div>
		);
	}

}

export default Alert;
