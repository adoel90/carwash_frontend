import React, { Component } from 'react';
import classNames from 'classnames';

class Icon extends Component {
	render() {
		const {
			src,
			iconSize,
			className
		} = this.props;

		const classes = classNames(
			'icon',
			iconSize ? `icon--${iconSize}` : null
		)

		return (
			<img src={src} className={classes} />
		);
	}

}

export default Icon;
