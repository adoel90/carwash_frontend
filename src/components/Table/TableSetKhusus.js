import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableBody } from '../Table';
import { PaginationSet } from '../Pagination';
import { SearchBar } from '../Search';
import Currency from '../Currency';

class TableSetKhusus extends Component {

    constructor() {
        super();
        this.handlePageChange = this.handlePageChange.bind(this);
        this.renderTableSearchBar = this.renderTableSearchBar.bind(this);
        this.handleResetPagination = this.handleResetPagination.bind(this);
        // this.handleClickPagination = this.handleClickPagination.bind(this);
        // this.handleSearchPaginationSecond = this.handleSearchPaginationSecond.bind(this);

        this.state = {
            offset: 0,
            limit: 10,
            activePage: 1,
        };
    };

    handleResetPagination = () => {
        this.setState({
            ...this.state,
            activePage: 1
        });
    };

    handlePageChange = (page) => {
        const { activePage } = this.props;
        const { offset, limit } = this.state;

        this.setState({
            ...this.state,
            activePage: page
        }, () => {
            this.props.getCurrentActivePage(this.state.activePage);
        });
    };

    renderTableSearchBar = () => {

        const {
            search,
            searchBy,
            searchText,
            placeholder,
            searchParams,
            handleInputChange,
            handleSearchPaginationSecond,
            currentActive,
        } = this.props;


        // console.log(handleSearchPaginationSecond);
        // console.log(handleInputChange);

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
                handleSearchPaginationSecond={handleSearchPaginationSecond}
                // handleResetPagination= {(e) => handleResetPagination(e)}
                {...this.state}
                {...this.props}
            />

            // <div>
            //     <h1>Hai</h1>
            // </div>
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
            currentActive,
            ...attributes
        } = this.props;

        // console.log(activePage);

        let lowerBound = (activePage - 1) * limit;
        let upperBound = activePage * limit;

        const renderTableHead = () => (
            <TableHead>
                <tr>
                    {renderTableColumns()}
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
            });
        }

        const renderFilteredRow = (row, i) => {
            const { searchText } = this.props;
            return row.name.toLowerCase().includes(searchText.toLowerCase());
        };

        const renderTableBody = () => (
            <TableBody>
                {renderTableRows()}
            </TableBody>
        );

        const renderTableRows = () => {
            if (loading) {
                return <td colSpan={columns.length} style={{ padding: '30px', textAlign: 'center' }}>Tunggu sebentar, mengambil data dari sistem...</td>
            }

            if (loaded) {
                /** Checks if rows has array items */
                if (rows != null && rows.length) {

                    if (hasSearchBar || searchParams || searchBy) {
                        let filteredRow = rows.filter((row) => {

                            if (row[searchBy]) {
                                return row[searchBy].toString().toLowerCase().includes(search.searchText.toLowerCase())
                            }
                        });


                        if (!filteredRow.length) {
                            return <span colSpan={columns.length} style={{ padding: '30px', textAlign: 'center' }}>Data tidak ditemukan</span>
                        }

                        return filteredRow
                            .slice(lowerBound, upperBound)
                            .map((row, i) => {
                                return <tr key={i}>{renderTableCell(row)}</tr>
                            })
                    }

                    return rows
                        .slice(lowerBound, upperBound)
                        .map((row, i) => {
                            return <tr key={i}>{renderTableCell(row)}</tr>
                        })
                } else {
                    return <td colSpan={columns.length} style={{ padding: '30px', textAlign: 'center' }}>Data tidak ditemukan</td>
                }
            }
        }

        const renderTableCell = (row) => {
            return columns.map((column, i) => {

                if (column.render) {
                    return column.render(row);
                }

                for (var key in row) {
                    if (column.accessor == key) {
                        if (column.isCurrency) {
                            return (
                                <td key={i}>
                                    <p className={`text-align-${column.rowAlign}`}>
                                        <Currency
                                            name={column.accessor}
                                            value={row[key]}
                                        />
                                    </p>
                                </td>
                            )
                        }

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

            if (pagination && rows != null) {

                return <PaginationSet
                    activePage={search.searchText.length > 0 ? currentActive : activePage}
                    // total={rows.slice(lowerBound, upperBound).length} 
                    total={rows.length}
                    limit={limit}
                    onPageChange={this.handlePageChange}
                    {...this.state}
                    {...this.props}
                />
            }

        }

        return (
            <div className="table-set">
                {hasSearchBar ? this.renderTableSearchBar() : null}

                <Table {...attributes}>
                    {renderTableHead()}
                    {renderTableBody()}
                </Table>
                <div className="flex justify-content--space-between" style={{ padding: '30px 0' }}>

                    {rows != null && rows.length ?
                        <small>Menunjukan {upperBound > rows.length ? rows.length : upperBound} dari {rows.length} baris.</small> :
                        null
                    }

                    {renderTablePagination()}
                </div>
            </div>
        );
    }
};

TableSetKhusus.propTypes = {
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

export default TableSetKhusus;