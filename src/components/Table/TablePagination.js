import React, { Component } from 'react';
import { Pagination, PaginationItem } from '../Pagination';

class TablePagination extends Component {
	constructor() {
		super();
		this.renderPages = this.renderPages.bind(this);
		this.goToPage = this.goToPage.bind(this);

		this.state = {
			currentPage: 1
		}
	}

	goToPage = (page) => {
		this.setState({
			currentPage: page
		})
	}

	renderPages = () => {
		const {
			currentPage
		} = this.state;

		const {
			rows,
			limit
		} = this.props;

		let pages = Math.floor(rows / limit);
		let paginationItems = [];
		let i = 1;

		while(i <= pages) {
			const page = i;

			paginationItems.push(
				<PaginationItem
					isActive={page === currentPage}
					onClick={() => this.goToPage(page)}
				>
					{page}
				</PaginationItem>
			)

			i++;
		}

		return paginationItems;
	}

	render() {
		const {
			rows,
			limit
		} = this.props;

		console.log(`Rows: ${rows}`);

		return (
			<Pagination className="flex justify-content--center">
				<PaginationItem>Previous</PaginationItem>
				{ this.renderPages() }
				<PaginationItem>Next</PaginationItem>
			</Pagination>
		)
	}
}

export default TablePagination;
