import React, { Component } from 'react';
import classNames from 'classnames';

class Table extends Component {
	render() {
		const {
			striped,
			children,
			className
		} = this.props;

		const classes = classNames(
			'table',
			striped ? 'table--striped' : null
		)

		return <table className={classes}>{children}</table>
	}

}

export default Table;
