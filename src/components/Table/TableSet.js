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
			currentPage: 1,
			limit: 10,
			offset: 0
		}
	}

	handlePageChange = (page) => {
		const {
			limit,
			offset,
			currentPage
		} = this.state;

		// this.setState({
		// 	currentPage: page,
		// 	limit: (pageIndex * tempLimit),
		// 	offset: ((pageIndex * tempLimit) + tempOffset)
		// })
	}

	renderTablePagination = () => {
		const {
			control,
			rows
		} = this.props;

		const {
			limit,
			offset,
			currentPage
		} = this.state;

		return (
			<TablePagination
				rows={rows.length}
				limit={limit}
				offset={offset}
				currentPage={currentPage}
				handlePageChange={this.handlePageChange}
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
			offset
		} = this.state;

		return (
			<div className="table-main">
				<Table {...this.props}>
					<TableHeading theme="primary">
						{columns.map(this.renderTableColumn)}
					</TableHeading>
					<TableBody>
						{rows
							.map(this.renderTableRow)
							.slice(offset, limit)
						}
					</TableBody>
				</Table>
				{ hasPagination ? this.renderTablePagination() : null }
			</div>
		);
	}

}

export default TableSet;
