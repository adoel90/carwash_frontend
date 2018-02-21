import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableBody } from '../Table';
import { PaginationSet } from '../Pagination';

class TableSet extends Component {
    constructor() {
        super();
        this.state = {
            offset: 0,
            limit: 10,
            activePage: 1
        }
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
            defaultLimit,
            pagination,
            ...attributes
        } = this.props;
        
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
                .slice(offset, limit)
                .map((row, i) => {
                return <tr key={i}>{ renderTableCell(row) }</tr>
            })
        }

        const renderTableCell = (row) => {            
            return columns.map((column, i) => {
                if(column.render) {
                    return <td key={i}>{column.render}</td>
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
                return <PaginationSet activePage={activePage} limit={limit} total={rows.length} />
            }
        }
        
        return (
            <div className="table-set">
                <Table {...attributes}>
                    { renderTableHead() }
                    { renderTableBody() }
                </Table>
                <div className="flex justify-content--space-between" style={{padding: '30px 0'}}>
                    <small>Menunjukan {rows.length} baris.</small>
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