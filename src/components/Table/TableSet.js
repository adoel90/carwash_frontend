import React, { Component } from 'react';
import { Table, TableHeading, TableBody, TablePagination } from '../Table';

class TableSet extends Component {
	constructor() {
		super();
		this.renderTableColumn = this.renderTableColumn.bind(this);
		this.renderTableRow = this.renderTableRow.bind(this);
		this.renderTableCell = this.renderTableCell.bind(this);
		this.renderTablePagination = this.renderTablePagination.bind(this);
	}

	renderTablePagination = () => {

	}

	renderTableCell = (cell) => {
		return <td>{cell}</td>
	}

	renderTableRow = (row, i) => {
		const {
			columns
		} = this.props;

		let cells = [];

		for(const key of Object.keys(row)) {
			columns.map((column) => {
				if(column.accessor === key) {
					cells.push(row[key]);
				}
			})
		}

		return (
			<tr>
				{cells.map(this.renderTableCell)}
			</tr>
		)
	}

	renderTableColumn = (column, i) => {
		return (
			<th>{column.title}</th>
		)
	}

	render() {
		const {
			hasPagination,
			columns,
			rows
		} = this.props;

		return (
			<div className="table-main">
				<Table {...this.props}>
					<TableHeading theme="primary">
						{columns.map(this.renderTableColumn)}
					</TableHeading>
					<TableBody>
						{rows.map(this.renderTableRow)}
					</TableBody>
				</Table>
				{ hasPagination ? this.renderTablePagination() : null }
			</div>
		);
	}

}

export default TableSet;
