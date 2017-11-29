import React, { Component } from 'react';
import { PageBlock } from '../Page';
import { Nav, NavTabLink, NavItem } from '../Nav';
import { TabContent } from '../Tab';
import ReportSalesListContainer from '../../containers/ReportSalesListContainer';

class ReportSales extends Component {
	constructor() {
		super();
		this.renderSalesTabNav = this.renderSalesTabNav.bind(this);
		this.renderSalesTabContent = this.renderSalesTabContent.bind(this);
	}

	renderSalesTabNav = (type, i) => {
		const {
			activeTab,
			toggleTab
		} = this.props;

		return (
			<NavItem>
				<NavTabLink
					active={activeTab === i}
					onClick={() => toggleTab(i)}>
					{type.name}
				</NavTabLink>
			</NavItem>
		)
	}

	renderSalesTabContent = (type, i) => {
		const {
			activeTab
		} = this.props;

		return (
			<TabContent activeTab={activeTab} tabIndex={i}>
				<ReportSalesListContainer
					type={type}
					{...this.props}
				/>
			</TabContent>
		)
	}

	render() {
		const {
			salesTypes
		} = this.props;

		return (
			<div className="inner-view">
				<div className="padding-bottom-3">
					<h5 className="fw-semibold">Laporan Penjualan</h5>
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
