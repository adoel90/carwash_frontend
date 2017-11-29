import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { ReportTransactionList } from '../components/Report';
import { getTransactionReport } from '../actions/report.action';

class ReportTransactionListContainer extends Component {
	constructor() {
		super();
		this.state = {
			transactionList: [],
			period: {
				start: moment().subtract(1, 'months'),
				end: moment()
			}
		}

		this.getTransactionReport = this.getTransactionReport.bind(this);
	}

	componentDidMount = () => {
		this.getTransactionReport();
	}

	componentDidUpdate = (prevProps) => {
		const {
			report
		} = this.props;

		if(prevProps.report.transaction !== this.props.report.transaction) {
			if(report.transaction.isLoaded) {
				this.setState({
					transactionList: report.transaction.data.transaction
				})
			}
		}
	}

	getTransactionReport = () => {
		const { period } = this.state;
		const {
			type,
			dispatch,
			accessToken
		} = this.props;

		let requiredData = {
			type: type.type,
			start_date: period.start.format('YYYY/MM/DD'),
			end_date: period.end.format('YYYY/MM/DD')
		}

		dispatch(getTransactionReport(requiredData, accessToken))
	}

    render() {
        return (
            <ReportTransactionList
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

export default connect(mapStateToProps)(ReportTransactionListContainer);
