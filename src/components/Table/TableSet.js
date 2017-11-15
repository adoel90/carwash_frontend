import React, { Component } from 'react';
import { Table, TableHeading, TableBody, TablePagination } from '../Table';
import { Button, ButtonGroup } from '../Button';

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

	renderTableCell = (cell, i) => {
		return <td key={i}>{cell}</td>
	}

	renderTableRow = (row, i) => {
		const {
			columns,
			onUpdate,
			onDelete,
		} = this.props;

		let cells = [];

		columns.map((column) => {
			for(const key of Object.keys(row)) {
				if(key === column.accessor) {
					cells.push(row[key]);
				}
			}
		})

		if(onUpdate || onDelete) {
			const action = (
				<ButtonGroup>
					<Button type="button" buttonTheme="primary" buttonSize="small" onClick={() => onUpdate(row)}>
						<small className="tt-uppercase ls-base fw-semibold clr-light">Ubah</small>
					</Button>
					<Button type="button" buttonTheme="secondary" buttonSize="small" onClick={() => onDelete(row)}>
						<small className="tt-uppercase ls-base fw-semibold clr-light">Hapus</small>
					</Button>
				</ButtonGroup>
			)

			cells.push(action);
		}

		return (
			<tr>
				{cells.map(this.renderTableCell)}
			</tr>
		)
	}

	renderTableColumn = (column, i) => {
		const {
			columns,
			onUpdate,
			onDelete
		} = this.props

		const tableColumns = [];

		columns.map((column, i) => {
			tableColumns.push(<th>{column.title}</th>);

			// return (
			// 	<th>{column.title}</th>
			// )
		})

		if(onUpdate || onDelete) {
			tableColumns.push(<th>Pengaturan</th>)
		}

		return tableColumns;
	}

	render() {
		const {
			columns,
			rows,
			hasPagination
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
						{this.renderTableColumn()}
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