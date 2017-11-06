import React, { Component } from 'react';
import classNames from 'classnames';

class ButtonGroup extends Component {
	render() {
		const {
			children,
			className
		} = this.props;

		const classes = classNames(
			'button-group',
			className
		)

		return <div className={classes}>{children}</div>
	}

}

export default ButtonGroup;
