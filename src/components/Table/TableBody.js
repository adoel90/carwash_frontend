import React, { Component } from 'react';
import classNames from 'classnames';

class TableBody extends Component {
	render() {
		const {
			children,
			className
		} = this.props;

		const classes = classNames(
			className
		)

		return <tbody className={classes}>{children}</tbody>
	}

}

export default TableBody;
