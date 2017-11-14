import React, { Component } from 'react';
import classNames from 'classnames';
import { TablePagination } from '../Table';

class Table extends Component {
	render() {
		const {
			tableData,
			children,
			className,
			isStriped,
			isHoverable,
		} = this.props;

		const classes = classNames(
			'table',
			isStriped ? 'table--striped' : null,
			isStriped ? 'table--hoverable' : null
		)

		return (
			<table className={classes}>
				{children}
			</table>
		)
	}

}

export default Table;
