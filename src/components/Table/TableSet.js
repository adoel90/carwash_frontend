import React, { Component } from 'react';
import classNames from 'classnames';
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
			searchParams,
			handleInputChange
		} = this.props;

		return (
			<SearchBar
				value={searchText}
				placeholder={placeholder}
				onChange={(e) => handleInputChange('search', e)}
				onSearchChange={(e) => handleInputChange('search', e)}
				className="margin-bottom-2"
				searchParams={searchParams}
			/>
		)
	}

	renderTablePagination = () => {
		const {
			rows
		} = this.props;

		const {
			limit,
			activePage,
		} = this.state;

		if(rows.length) {
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
			settings,
			onUpdate,
			onDelete,
			onChangeStatus,
			onRowClick,
			rows,
			handleIndexedInputChange
		} = this.props;

		let cells = [];

		columns.map((column) => {
			Object.keys(row).forEach((key) =>  {
				if(key === column.accessor) {
					if(column.isEditable) {
						cells.push(
							<td>
								<Input
									name={column.accessor}
									type="text"
									value={row[key]}
									className="ta-center"
									onChange={(e) => handleIndexedInputChange(rows, i, e)}
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
					else if(column.isToggleable) {
						cells.push(
							<td>
								<small className={`fw-bold tt-uppercase ls-base ${row.status ? 'clr-primary' : 'clr-danger'}`}>{row.status ? 'Aktif' : 'Tidak Aktif'}</small>
							</td>
						)
					}
					else {
						cells.push(<td>{row[key]}</td>)
					}
				}
			})
		})

		if(settings) {
			let settingsRow = (
				<td>
					<ButtonGroup className="flex justify-content--center">
						{ settings.map((item) => {
							if(item.isToggleable) {
								return <Button buttonTheme={row.status ? 'success' : 'danger'} buttonSize="small" onClick={(e) => item.action(row, e)} disabled={row.statusChanging}>
									<small className={`clr-light fw-semibold tt-uppercase ls-base`}>{row.statusChanging ? 'Merubah...' : (row.status ? item.activeText : item.inactiveText)}</small>
								</Button>
							}
							
							return <Button buttonTheme={item.theme} buttonSize="small" className="clr-light" onClick={(e) => item.action(row, e)}>
								<small className="fw-semibold tt-uppercase ls-base">{item.name}</small>
							</Button>
						})}
					</ButtonGroup>
				</td>
			)

			cells.push(settingsRow);
		}

		return <tr onClick={onRowClick ? () => onRowClick(row) : null}>{cells}</tr>
	}

	renderTableBody = () => {
		const {
			rows,
			searchText,
			hasSearchBar,
			searchParams,
			searchBy
		} = this.props;

		const {
			activePage,
			limit
		} = this.state;

		/** Set the lower and upper limit of the pagination */
		const lowerLimit = (activePage - 1) * limit;
		const upperLimit = activePage * limit;

		/** Checks if rows has array items */
		if(rows.length) {
			if(hasSearchBar && searchParams) {
				let filteredRow = rows.filter((row) => {
					if(row[searchBy]) {
						return row[searchBy].toString().toLowerCase().includes(searchText.toLowerCase())
					}

				})

				if(!filteredRow.length) {
					return (
						<TableBody className="ta-center">
							<td colspan="100%" style={{ padding: '40px' }}>Data tidak ditemukan.</td>
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
					{rows
						.map(this.renderTableRow)
						.slice(lowerLimit, upperLimit)
					}
				</TableBody>
			)
		} else {
			return (
				<TableBody className="ta-center">
					<td colspan="100%" style={{ padding: '40px' }}>Data tidak dapat ditemukan.</td>
				</TableBody>
			)
		}
	}

	renderTableColumn = () => {
		const {
			columns,
			settings,
			onUpdate,
			onDelete,
			onChangeStatus
		} = this.props

		const tableColumns = [];

		columns.map((column, i) => {
			let columnClasses = classNames(
				column.size ? `th--${column.size}` : null
			)

			tableColumns.push(<th key={i} className={columnClasses}>{column.title}</th>);
		})

		if(onUpdate || onDelete || onChangeStatus) {
			tableColumns.push(<th>Pengaturan</th>)
		}

		if(settings) {
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
