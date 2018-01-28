import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { ReportSales } from '../components/Report';

class ReportSalesContainer extends Component {
	constructor() {
		super();
		this.state = {
			salesTypes: [
				{ id: 1, name: 'Penjualan Service', type: 'service' },
				{ id: 2, name: 'Penjualan Cafe', type: 'cafe' },
			],
			activeTab: 0
		}

		this.toggleTab = this.toggleTab.bind(this);
	}

	toggleTab = (tabIndex) => {
		this.setState({
			activeTab: tabIndex
		})
	}

	render() {
		return (
			<ReportSales
				{...this.state}
				{...this.props}
				toggleTab={this.toggleTab}
			/>
		);
	}

}

const mapStateToProps = (state) => {
	return {
		report: state.report
	}
}

export default connect(mapStateToProps)(ReportSalesContainer);
