import React, { Component } from 'react';
import { Table, TableHeading, TableBody, TablePagination } from '../Table';

class TableSet extends Component {
	constructor() {
		super();
		this.renderTableColumn = this.renderTableColumn.bind(this);
		this.renderTableRow = this.renderTableRow.bind(this);
		this.renderTableCell = this.renderTableCell.bind(this);
		this.renderTablePagination = this.renderTablePagination.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);

		this.state = {
			activePage: 1,
			limit: 10
		}
	}

	handlePageChange = (page) => {
		const {
			activePage
		} = this.state;

		this.setState({
			activePage: page
		})
	}

	renderTablePagination = () => {
		const {
			rows
		} = this.props;

		const {
			limit,
			activePage
		} = this.state;

		return (
			<TablePagination
				activePage={activePage}
				totalRows={rows.length}
				limit={limit}
				onPageChange={this.handlePageChange}
			/>
		)
	}

	renderTableCell = (cell) => {
		return <td>{cell}</td>
	}

	renderTableRow = (row, i) => {
		const {
			columns
		} = this.props;

		let cells = [];

		columns.map((column) => {
			for(const key of Object.keys(row)) {
				if(key === column.accessor) {
					cells.push(row[key]);
				}
			}
		})

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
			rows,
			control
		} = this.props;

		const {
			limit,
			offset,
			activePage
		} = this.state;

		const lowerLimit = (activePage - 1) * limit;
		const upperLimit = activePage * limit;

		return (
			<div className="table-main">
				<Table {...this.props}>
					<TableHeading theme="primary">
						{columns.map(this.renderTableColumn)}
					</TableHeading>
					<TableBody>
						{rows
							.map(this.renderTableRow)
							.slice(lowerLimit, upperLimit)
						}
					</TableBody>
				</Table>
				{ hasPagination ? this.renderTablePagination() : null }
			</div>
		);
	}

}

export default TableSet;
