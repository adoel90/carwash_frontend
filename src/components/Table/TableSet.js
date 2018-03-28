import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableBody } from '../Table';
import { PaginationSet } from '../Pagination';
import { SearchBar } from '../Search';

class TableSet extends Component {
    
    constructor() {
        super();
        this.handlePageChange = this.handlePageChange.bind(this);
        this.renderTableSearchBar = this.renderTableSearchBar.bind(this);
        this.state = {
            offset: 0,
            limit: 10,
            activePage: 1
        }
    }

    handlePageChange = (page) => {
        const {
            activePage
        } = this.props;
        
        const {
            offset,
            limit,
        } = this.state;
        
        this.setState({
            ...this.state,
            activePage: page
        });
    }

    renderTableSearchBar = () => {
		const {
			search,
			searchBy,
			searchText,
			placeholder,
			searchParams,
			handleInputChange
        } = this.props;

        return (
			<SearchBar
				value={search.searchText}
                placeholder={placeholder}
                handleInputChange={handleInputChange}
				onChange={(e) => handleInputChange('search', e)}
				onSearchChange={(e) => handleInputChange('search', e)}
				className="margin-bottom-large"
				searchBy={searchBy}
				searchParams={searchParams}
			/>
		)
	}
    
    render() {
        const {
            offset,
            limit,
            activePage
        } = this.state;
        
        const {
            loaded,
            loading,
            columns,
            rows,
            pagination,
            hasSearchBar,
            searchParams,
            searchBy,
            search,
            ...attributes
        } = this.props;

        let lowerBound = (activePage - 1) * limit;
        let upperBound = activePage * limit;
        
        const renderTableHead = () => (
            <TableHead>
                <tr>
                    { renderTableColumns() }
                </tr>
            </TableHead>
        )

        const renderTableColumns = () => {
            return columns.map((column, i) => {
                return (
                    <th key={i} width={column.width}>
                        <p className={`text-align-${column.align}`}>
                            {column.title}
                        </p>
                    </th>
                )
            })
        }

        const renderFilteredRow = (row, i) => {
            const {
                searchText
            } = this.props;
    
            return row.name.toLowerCase().includes(searchText.toLowerCase());
        }

        const renderTableBody = () => (
            <TableBody>
                { renderTableRows() }
            </TableBody>
        )

        const renderTableRows = () => {
            if(loading) {
                return <td colSpan={columns.length} style={{padding: '30px', textAlign: 'center'}}>Tunggu sebentar, mengambil data dari sistem...</td>
            }

            if(loaded) {
                /** Checks if rows has array items */
                if(rows.length) {
                    if(hasSearchBar || searchParams || searchBy) {
                        let filteredRow = rows.filter((row) => {
                            if(row[searchBy]) {
                                return row[searchBy].toString().toLowerCase().includes(search.searchText.toLowerCase())
                            }
                        })

                        if(!filteredRow.length) {
                            return <td colSpan={columns.length} style={{padding: '30px', textAlign: 'center'}}>Data tidak ditemukan</td>
                        }

                        return filteredRow
                                .slice(lowerBound, upperBound)
                                .map((row, i) => {
                                    return <tr key={i}>{ renderTableCell(row) }</tr>
                                })
                    }

                    return rows
                        .slice(lowerBound, upperBound)
                        .map((row, i) => {
                        return <tr key={i}>{ renderTableCell(row) }</tr>
                    })
                } else {
                    return <td colSpan={columns.length} style={{padding: '30px', textAlign: 'center'}}>Data tidak ditemukan</td>
                }
            }
        }

        const renderTableCell = (row) => {            
            return columns.map((column, i) => {
                if(column.render) {
                    return column.render(row);
                }
                
                for(var key in row) {
                    if(column.accessor == key) {
                        return (
                            <td key={i}>
                                <p className={`text-align-${column.rowAlign}`}>
                                    {row[key]}
                                </p>
                            </td>
                        )
                    }      
                }
            })
        }
    
        const renderTablePagination = () => {
            if(pagination) {
                return <PaginationSet 
                    activePage={activePage} 
                    total={rows.length} 
                    limit={limit}  
                    onPageChange={this.handlePageChange} 
                />
            }
        }
        
        return (
            <div className="table-set">
                { hasSearchBar ? this.renderTableSearchBar() : null}
                <Table {...attributes}>
                    { renderTableHead() }
                    { renderTableBody() }
                </Table>
                <div className="flex justify-content--space-between" style={{padding: '30px 0'}}>
                    <small>Menunjukan {upperBound > rows.length ? rows.length : upperBound} dari {rows.length} baris.</small>
                    { renderTablePagination() }
                </div>
            </div>
        );
    }
}

TableSet.propTypes = {
    columns: PropTypes.array,
    rows: PropTypes.array,
    defaultLimit: PropTypes.oneOfType([
        PropTypes.string, PropTypes.number
    ]),
    striped: PropTypes.bool,
    fullWidth: PropTypes.bool,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
}

export default TableSet;