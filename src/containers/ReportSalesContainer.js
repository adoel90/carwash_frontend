import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReportSales } from '../components/Report';

class ReportSalesContainer extends Component {
	constructor() {
		super();
		this.state = {
			salesTypes: [
				{ id: 1, name: 'Cafe', type: 'cafe' },
				{ id: 2, name: 'Service', type: 'service' }
			],
			activeTab: 0
		}
	}

	render() {
		return (
			<ReportSales
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

export default connect(mapStateToProps)(ReportSalesContainer);
