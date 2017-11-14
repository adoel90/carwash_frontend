import React, { Component } from 'react';
// import Pagination from 'react-js-pagination';
import { Pagination, PaginationItem } from '../Pagination';

class TablePagination extends Component {
	constructor() {
		super();
		this.renderPages = this.renderPages.bind(this);
	}

	renderPages = () => {
		const {
			totalRows,
			limit,
			onPageChange,
			activePage
		} = this.props;

		let pages = Math.floor(totalRows / limit);
		let paginationItems = [];
		let i = 1;

		while(i <= pages) {
			const page = i;

			paginationItems.push(
				<PaginationItem isActive={page === activePage} onClick={() => onPageChange(page)}>
					{page}
				</PaginationItem>
			)

			i++;
		}

		return paginationItems;
	}

	render() {
		const {
			activePage,
			onPageChange
		} = this.props;

		return (
			<Pagination className="table__pagination flex justify-content--center">
				<PaginationItem onClick={() => onPageChange(activePage - 1)}>Previous</PaginationItem>
				{ this.renderPages() }
				<PaginationItem onClick={() => onPageChange(activePage + 1)}>Next</PaginationItem>
			</Pagination>
		)
	}
}

export default TablePagination;
