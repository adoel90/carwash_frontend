import React, { Component } from 'react';
import { PageBlock } from '../Page';
import { Nav } from '../Nav';

class ReportSales extends Component {    
	constructor() {
		super();
		this.renderSalesTabNav = this.renderSalesTabNav.bind(this);
		this.renderSalesTabContent = this.renderSalesTabContent.bind(this);
	}

	renderSalesTabNav = () => {

	}

	renderSalesTabContent = () => {

	}
	
	render() {
		const {
			salesTypes
		} = this.props;

		return (
			<div className="inner-view">
				<div className="padding-bottom-3">
					<h5 className="fw-semibold">Laporan Transaksi</h5>
				</div>
				<Nav tabs className="flex justify-content--space-between">
					{salesTypes.map(this.renderSalesTabNav)}
				</Nav>
				{salesTypes.map(this.renderSalesTabContent)}
			</div>
		);
	}

}

export default ReportSales;
