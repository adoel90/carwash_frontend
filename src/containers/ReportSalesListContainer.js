import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { ReportSalesList } from '../components/Report';
import { getSalesReport } from '../actions/report.action';
import numeral from 'numeral'

class ReportSalesListContainer extends Component {
	constructor() {
		super();
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleSearchSalesSubmit = this.handleSearchSalesSubmit.bind(this);
		this.getSalesReportByType = this.getSalesReportByType.bind(this);
		this.generateChartData = this.generateChartData.bind(this);
		this.state = {
			period: {
				start: moment().subtract(1, 'months'),
				end: moment()
			},
			chartData: {},
			chartOptions: {},
			salesData: {} 
		}
	}

	componentDidUpdate = (prevProps) => {
		const {
			report
		} = this.props;
		
		if(prevProps.report.sales !== report.sales) {
			if(report.sales.isLoaded) {
				this.setState({
					salesData: report.sales
				}, () => {
					this.generateChartData();
				});
			}
		}
	}

	componentDidMount = () => {
		this.getSalesReportByType();
	}

	handleSearchSalesSubmit = (e) => {
		e.preventDefault();

		this.getSalesReportByType();
	}

	handleDateChange = (range, date) => {
		const {
			period
		} = this.state;

		period[range] = date;
		this.forceUpdate();
	}

	generateChartData = () => {
		const {
			salesData
		} = this.state;

		let labels = [];
		let datasets = [{
			label: 'Total Penjualan',
			data: [],
			backgroundColor: '#71B9D8'
		}]; 

		for(const key in salesData.data) {
			labels.push(key);
			datasets[0].data.push(salesData.data[key].total);
		}
		
		this.setState({
			chartData: {
				labels: labels,
				datasets: datasets,
			}
		})
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
				handleDateChange={this.handleDateChange}
				handleSearchSalesSubmit={this.handleSearchSalesSubmit}
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
