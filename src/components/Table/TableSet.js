import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableBody } from '../Table';
import { PaginationSet } from '../Pagination';

class TableSet extends Component {
    constructor() {
        super();
        this.handlePageChange = this.handlePageChange.bind(this);
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
    
    render() {
        const {
            offset,
            limit,
            activePage
        } = this.state;
        
        const {
            columns,
            rows,
            pagination,
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
                return <th key={i}>{column.title}</th>
            })
        }

        const renderTableBody = () => (
            <TableBody>
                { renderTableRows() }
            </TableBody>
        )

        const renderTableRows = () => {
            return rows
                .slice(lowerBound, upperBound)
                .map((row, i) => {
                return <tr key={i}>{ renderTableCell(row) }</tr>
            })
        }

        const renderTableCell = (row) => {            
            return columns.map((column, i) => {
                if(column.render) {
                    return column.render(row);
                }
                
                for(var key in row) {
                    if(column.accessor == key) {
                        return <td key={i}>{row[key]}</td>
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
}

export default TableSet;