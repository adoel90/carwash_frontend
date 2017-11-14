import React, { Component } from 'react';
import classNames from 'classnames';

class TableContainer extends Component {
	render() {
		const {
			className,
			children
		} = this.props;

		const classes = classNames(
			'table__container',
			className

		)

		return <div className={classes}>{children}</div>
	}

}

export default TableContainer;
