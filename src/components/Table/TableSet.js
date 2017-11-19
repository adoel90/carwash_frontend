import React, { Component } from 'react';
import { Table, TableHeading, TableBody, TablePagination } from '../Table';
import { Button, ButtonGroup } from '../Button';
import { Input } from '../Input';
import SearchBar from '../SearchBar';

class TableSet extends Component {
	constructor() {
		super();
		this.renderTableColumn = this.renderTableColumn.bind(this);
		this.renderFilteredRow = this.renderFilteredRow.bind(this);
		this.renderTableRow = this.renderTableRow.bind(this);
		this.renderTableSearchBar = this.renderTableSearchBar.bind(this);
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


	renderTableSearchBar = () => {
		const {
			searchText,
			handleInputChange
		} = this.props;

		return (
			<SearchBar
				name="searchText"
				value={searchText}
				placeholder="Cari member..."
				onChange={(e) => handleInputChange(null, e)}
				className="margin-bottom-2"
			/>
		)
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
				stickToBottom
			/>
		)
	}

	renderFilteredRow = (row, i) => {
		const {
			hasSearchBar,
			searchText
		} = this.props;

		return row.name.toLowerCase().includes(searchText.toLowerCase());
	}

	renderTableRow = (row, i) => {
		const {
			columns,
			onUpdate,
			onDelete,
			rows,
			handleTableInputChange
		} = this.props;

		let cells = [];

		columns.map((column) => {
			for(const key of Object.keys(row)) {
				if(key === column.accessor) {
					if(column.editable) {
						cells.push(
							<td>
								<Input
									name={column.accessor}
									type="text"
									value={row[key]}
									className="ta-center"
									onChange={(e) => handleTableInputChange(rows, i, e)}
									selectOnFocus
								/>
							</td>
						)
					}
					else {
						cells.push(<td>{row[key]}</td>)
					}
					// cells.push(row[key]);
				}
			}
		})

		if(onUpdate || onDelete) {
			const action = (
				<td>
					<ButtonGroup>
						<Button type="button" buttonTheme="primary" buttonSize="small" onClick={() => onUpdate(row)}>
							<small className="tt-uppercase ls-base fw-semibold clr-light">Ubah</small>
						</Button>
						<Button type="button" buttonTheme="secondary" buttonSize="small" onClick={() => onDelete(row)}>
							<small className="tt-uppercase ls-base fw-semibold clr-light">Hapus</small>
						</Button>
					</ButtonGroup>
				</td>
			)

			cells.push(action);
		}

		return (
			<tr>
				{cells}
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
			hasPagination,
			hasSearchBar
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
				{ hasSearchBar ? this.renderTableSearchBar() : null}
				<Table {...this.props}>
					<TableHeading theme="primary">
						{this.renderTableColumn()}
					</TableHeading>
					<TableBody>
						{
							rows.length
								? rows
									.filter(this.renderFilteredRow)
									.map(this.renderTableRow)
									.slice(lowerLimit, upperLimit)
								: null
						}
					</TableBody>
				</Table>
				{ hasPagination ? this.renderTablePagination() : null }
			</div>
		);
	}

}

export default TableSet;
