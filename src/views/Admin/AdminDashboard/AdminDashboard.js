import React, { Component } from 'react';
import { AdminDashboardView } from '../AdminDashboard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getReportMemberGraph } from '../../../actions/report.action';
import { Button } from '../../../components/Button';

import moment from 'moment';

class AdminDashboard extends Component {
    constructor() {
        super();
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
        this.showDate = this.showDate.bind(this);
        this.getReportMemberGraph = this.getReportMemberGraph.bind(this);
        this.state = {
            period: {
                from: moment().add(-1, 'month'),
        		to: moment()
            }
        }
    }

    componentDidMount = () => {
        this.getReportMemberGraph();
    }

    handlePeriodChange = (type, date) => {
    	const {
    		period
    	} = this.state;

    	period[type] = date;
    	this.forceUpdate();
    }

    showDate = (e) => {
        const {
            action
        } = this.props;

        let {
            period
        } = this.state;

        e.preventDefault();

        let requiredData = {
            type : 'month',
            start_date : moment(period.from).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD')
        }

        action.getReportMemberGraph(requiredData);
    }

    getReportMemberGraph = () => {
        const {
            action
        } = this.props;

        let {
            period
        } = this.state;

        let requiredData = {
            type : 'month',
            start_date : moment(period.from).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD')
        }

        action.getReportMemberGraph(requiredData);
    }
    
    render() {
        return (
            <AdminDashboardView 
                {...this.state} 
                {...this.props} 
                handlePeriodChange={this.handlePeriodChange}
                showDate={this.showDate}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        report : state.report
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        action : bindActionCreators({ getReportMemberGraph }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);