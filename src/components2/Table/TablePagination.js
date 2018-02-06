import React, { Component } from 'react';
import classNames from 'classnames';
// import Pagination from 'react-js-pagination';
import { Pagination, PaginationItem } from '../Pagination';

class TablePagination extends Component {
	constructor() {
		super();
		this.renderPagers = this.renderPagers.bind(this);
		this.handlePagers = this.handlePagers.bind(this);

		this.state = {
			totalPagers: ''
		}
	}

	componentDidMount = () => {
		this.handlePagers();
	}

	handlePagers = () => {
		const {
			totalPagers
		} = this.state

		const {
			totalRows,
			limit,
			activePage
		} = this.props;

		let pages = Math.floor(totalRows/limit);
		let pagers = 1;
		while(pagers <= pages) {
			pagers++;
		}

		this.setState({
			totalPagers: pagers
		})
	}

	renderPagers = (pager, i) => {
		const {
			activePage,
			onPageChange
		} = this.props;

		const {
			totalPagers
		} = this.state;

		let pagers = [];
		let j = 1;
		while(j <= totalPagers) {
			const pager = j;
			pagers.push(
				<PaginationItem active={pager === activePage} onClick={() => onPageChange(pager)}>
					{pager}
				</PaginationItem>
			)
			j++;
		}

		return pagers;
	}

	render() {
		const {
			activePage,
			onPageChange,
			stickToBottom
		} = this.props;

		const {
			totalPagers
		} = this.state;

		const classes = classNames(
			'pagination--table',
			'flex justify-content--center',
			stickToBottom ? 'sticky sticky--bottom' : null
		)

		return (
			<Pagination className={classes}>
				<PaginationItem onClick={() => onPageChange(activePage - 1)} disabled={activePage == 1}>Previous</PaginationItem>
				{ this.renderPagers() }
				<PaginationItem onClick={() => onPageChange(activePage + 1)} disabled={activePage == totalPagers}>Next</PaginationItem>
			</Pagination>
		)
	}
}

export default TablePagination;
