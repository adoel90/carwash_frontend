import React, { Component } from 'react';
import classNames from 'classnames';
import { TablePagination } from '../Table';

class Table extends Component {
	render() {
		const {
			tableData,
			children,
			className,
			compact,
			isStriped,
			isHoverable,
		} = this.props;

		const classes = classNames(
			'table',
			isStriped ? 'table--striped' : null,
			isHoverable ? 'table--hoverable' : null,
			compact ? 'table--compact' : null
		)

		return (
			<div className={classes}>
				<table>
					{children}
				</table>
			</div>
		)
	}

}

export default Table;
