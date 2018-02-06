import React, { Component } from 'react';
import classNames from 'classnames';
import TablePagination from './TablePagination';

class TableBody extends Component {
	constructor() {
		super();
		this.renderTableBody = this.renderTableBody.bind(this);
		this.renderTableRow = this.renderTableRow.bind(this);
		this.renderTableCell = this.renderTableCell.bind(this);
	}

	renderTableBody = () => {
		const {
			data
		} = this.props;

		return (
			<tbody>
				{data.map(this.renderTableRow)}
			</tbody>
		)
	}

	renderTableRow = (item, i) => {
		const {
			accessor
		} = this.props;

		let cellArr = [];

		for(const key of Object.keys(item)) {
			accessor.data.map((asd) => {
				if(asd.id === key) {
					cellArr.push(item[key]);
				}
			})
		}

		return (
			<tr>
				{ cellArr.map(this.renderTableCell) }
			</tr>
		)
	}

	renderTableCell = (cell, i) => {
		return <td>{ cell }</td>
	}

	render() {
		const {
			children,
			className
		} = this.props;

		const classes = classNames(
			className
		)

		return (
			<tbody className={classes}>
				{children}
			</tbody>
		)
	}

}

export default TableBody;
