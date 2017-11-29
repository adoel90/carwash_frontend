import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReportTransaction } from '../components/Report';

class ReportTransactionContainer extends Component {
	constructor() {
		super();
		this.state = {
			transactionTypes: [
				{ id: 1, name: 'Transaksi Cafe', type: 'cafe' },
				{ id: 2, name: 'Transaksi Service', type: 'service' }
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
			<ReportTransaction
				{...this.state}
				{...this.props}
				toggleTab={this.toggleTab}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		report: state.report
	}
}

export default connect(mapStateToProps)(ReportTransactionContainer);