import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { ReportSalesList } from '../components/Report';
import { getSalesReport } from '../actions/report.action';

class ReportSalesListContainer extends Component {
	constructor() {
		super();
		this.getSalesReportByType = this.getSalesReportByType.bind(this);
		this.state = {
			period: {
				start: moment().subtract(1, 'months'),
				end: moment()
			}
		}
	}

	componentDidMount = () => {
		this.getSalesReportByType();
	}

	getSalesReportByType = () => {
		const { period } = this.state;
		const {
			accessToken,
			dispatch,
			type
		} = this.props;

		let requiredData = {
			type: type.type,
			start_date: period.start.format('YYYY/MM/DD'),
			end_date: period.end.format('YYYY/MM/DD')
		}

		dispatch(getSalesReport(requiredData, accessToken));
	}

	render() {
		return (
			<ReportSalesList
				{...this.props}
				{...this.state}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		report: state.report,
		reportSales: state.report.sales.data
	}
}


export default connect(mapStateToProps)(ReportSalesListContainer);
