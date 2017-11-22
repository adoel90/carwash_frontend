import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReportTransaction } from '../components/Report';

class ReportTransactionContainer extends Component {
	constructor() {
		super();
		this.state = {
			transactionTypes: [
				{ id: 1, name: 'Cafe', type: 'cafe' },
				{ id: 2, name: 'Service', type: 'service' }
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

const mapDispatchToProps = (state) => {
	return {
		report: state.report
	}
}

export default connect(mapDispatchToProps)(ReportTransactionContainer);