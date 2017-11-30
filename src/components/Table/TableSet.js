import React, { Component } from 'react';
import { Table, TableHeading, TableBody, TablePagination } from '../Table';
import { Button, ButtonGroup } from '../Button';
import { Input } from '../Input';
import { PageBlock } from '../Page';
import { Badge } from '../Badge';
import Currency from '../Currency';
import SearchBar from '../SearchBar';

class TableSet extends Component {
	constructor() {
		super();
		this.renderTableColumn = this.renderTableColumn.bind(this);
		this.renderTableBody = this.renderTableBody.bind(this);
		this.renderFilteredRow = this.renderFilteredRow.bind(this);
		this.renderTableRow = this.renderTableRow.bind(this);
		this.renderTableSearchBar = this.renderTableSearchBar.bind(this);
		this.renderTablePagination = this.renderTablePagination.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.handleResetPagination = this.handleResetPagination.bind(this);

		this.state = {
			activePage: 1,
			limit: 10
		}
	}

	componentDidUpdate = (prevProps) => {
		if(prevProps.searchText !== this.props.searchText) {
			this.handleResetPagination();
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

	handleResetPagination = () => {
		this.setState({
			activePage: 1
		})
	}

	renderTableSearchBar = () => {
		const {
			searchText,
			placeholder,
			handleInputChange
		} = this.props;

		return (
			<SearchBar
				name="searchText"
				value={searchText}
				placeholder={placeholder}
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
			searchText
		} = this.props;

		return row.name.toLowerCase().includes(searchText.toLowerCase());
	}

	renderTableRow = (row, i) => {
		const {
			columns,
			onUpdate,
			onDelete,
			onToggleStatus,
			onRowClick,
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
					else if(column.isCurrency) {
						cells.push(
							<td>
								<Currency
									name={column.accessor}
									value={row[key]}
								/>
							</td>
						)
					}
					else if(column.isStatus) {
						cells.push(
							<td>
								<small className={`fw-bold tt-uppercase ls-base ${row.status ? 'clr-primary' : 'clr-danger'}`}>{row.status ? 'Aktif' : 'Tidak Aktif'}</small>
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

		if(onUpdate || onDelete || onToggleStatus) {
			const action = (
				<td>
					<ButtonGroup className="flex justify-content--center">
						{
							onUpdate
							? <Button type="button" buttonTheme="primary" buttonSize="small" onClick={(e) => onUpdate(row, e)}>
								<small className="tt-uppercase ls-base fw-semibold clr-light">Ubah</small>
							</Button>
							: null
						}
						{
							onDelete
							? <Button type="button" buttonTheme="danger" buttonSize="small" onClick={(e) => onDelete(row, e)}>
								<small className="tt-uppercase ls-base fw-semibold clr-light">Hapus</small>
							</Button>
							: null
						}
						{
							onToggleStatus
							? <Button type="button" buttonTheme={row.status ? 'secondary' : 'danger' } buttonSize="small" onClick={() => onToggleStatus(row)}>
								<small className={`tt-uppercase ls-base fw-semibold ${row.status ? 'clr-dark' : 'clr-light'}`}>{row.status ? 'Aktif' : 'Nonaktif'}</small>
							</Button>
							: null
						}

					</ButtonGroup>
				</td>
			)

			cells.push(action);
		}

		if(onRowClick) {
			return (
				<tr onClick={() => onRowClick(row)}>{cells}</tr>
			)

		}

		return <tr>{cells}</tr>
	}

	renderTableBody = () => {
		const {
			rows,
			searchText,
			hasSearchBar
		} = this.props;

		const {
			activePage,
			limit
		} = this.state;

		const lowerLimit = (activePage - 1) * limit;
		const upperLimit = activePage * limit;

		if(rows.length) {
			if(hasSearchBar) {
				let filteredRow = rows.filter((row) => {
					return row.name.toLowerCase().includes(searchText.toLowerCase());
				});

				if(!filteredRow.length) {
					return (
						<TableBody className="ta-center">
							<td colspan="100%" style={{ padding: '40px' }}>Data tidak dapat ditemukan.</td>
						</TableBody>
					)
				}

				return (
					<TableBody>
						{
							filteredRow
							.map(this.renderTableRow)
							.slice(lowerLimit, upperLimit)
						}
					</TableBody>
				)
			}

			return (
				<TableBody>
					{rows.map(this.renderTableRow)}
				</TableBody>
			)
		}
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

		return (
			<div className="table-main">
				{ hasSearchBar ? this.renderTableSearchBar() : null}
				<Table {...this.props}>
					<TableHeading theme="primary">
						{this.renderTableColumn()}
					</TableHeading>
					{ this.renderTableBody() }
				</Table>
				{ hasPagination ? this.renderTablePagination() : null }
			</div>
		);
	}

}

export default TableSet;
