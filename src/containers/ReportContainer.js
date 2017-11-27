import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Report } from '../components/Report';
import ReportTransactionContainer from '../containers/ReportTransactionContainer'
import ReportSalesContainer from '../containers/ReportSalesContainer';

class ReportContainer extends Component {
	constructor() {
		super();
		this.state = {
			subroutes: [
				{ id: 1, name: 'Laporan Penjualan', path: "/admin/report/sales-report", component: ReportSalesContainer },
				{ id: 2, name: 'Laporan Transaksi', path: "/admin/report/transaction-report", component: ReportTransactionContainer }
			]
		}
	}

	render() {
		return (
			<Report
				{...this.state}
				{...this.props}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		dialog: state.dialog
	}
}

export default connect(mapStateToProps)(ReportContainer);
