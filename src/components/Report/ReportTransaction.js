import React, { Component } from 'react';
import { Nav, NavTabLink, NavItem } from '../Nav';
import { PropsRoute } from '../Route';
import { TabContent } from '../Tab';
import ReportTransactionListContainer from '../../containers/ReportTransactionListContainer';

class ReportTransaction extends Component {
	constructor() {
		super();
		this.renderTransactionTabNav = this.renderTransactionTabNav.bind(this);
		this.renderTransactionTabContent = this.renderTransactionTabContent.bind(this);
	}

	renderTransactionTabNav = (type, i) => {
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

	renderTransactionTabContent = (type, i) => {
		const {
			match,
			activeTab
		} = this.props;

		return (
			<TabContent activeTab={activeTab} tabIndex={i}>
				<PropsRoute
					component={ReportTransactionListContainer}
					type={type}
					{...this.props}
				/>
			</TabContent>
		)
	}

	render() {
		const {
			transactionTypes
		} = this.props;

		return (
			<div className="inner-view">
				<div className="padding-bottom-3">
					<h5 className="fw-semibold">Laporan Transaksi</h5>
				</div>
				<Nav tabs className="flex justify-content--space-between">
					{transactionTypes.map(this.renderTransactionTabNav)}
				</Nav>
				{transactionTypes.map(this.renderTransactionTabContent)}
			</div>
		)
	}
}

export default ReportTransaction;
