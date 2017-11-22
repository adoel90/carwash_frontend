import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Report } from '../components/Report';
import ReportTransactionContainer from '../containers/ReportTransactionContainer'

class ReportContainer extends Component {
	constructor() {
		super();
		this.state = {
			subroutes: [
				{ id: 1, name: 'Laporan Transaksi', path: "/admin/report/laporan-transaksi", component: ReportTransactionContainer },
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
		report: state.report
	}
}

export default connect(mapStateToProps)(ReportContainer);