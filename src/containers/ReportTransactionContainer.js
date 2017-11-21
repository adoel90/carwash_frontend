import React, { Component } from 'react';
import { ReportTransaction } from '../components/Report';

class ReportTransactionContainer extends Component {
	render() {
		return (
			<ReportTransaction
				{...this.state}
				{...this.props}
			/>
		)
	}
}

export default ReportTransactionContainer;