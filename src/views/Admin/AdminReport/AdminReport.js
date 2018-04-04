import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getReportMemberList } from '../../../actions/report.action';
import { Button } from '../../../components/Button';
import { AdminReportView } from '../AdminReport';

import moment from 'moment';

class AdminReport extends Component {
    constructor() {
        super();
        this.getReportMemberList = this.getReportMemberList.bind(this);
        this.populateTableData = this.populateTableData.bind(this);
        this.showDate = this.showDate.bind(this);
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
        this.state = {
            report: {},
            reportList: {},
            table: {
                columns: [],
                rows: [],
                limit: 10
            },
            period: {
                from: moment().add(-1, 'month'),
        		to: moment()
            }
        }
    }
    
    componentDidMount = () => {
        this.getReportMemberList();
    }
    
    componentDidUpdate = (prevProps) => {
        const {
            report
        } = this.props;

        const {
            reportList
        } = this.state;
        
        if(prevProps.report.member !== report.member) {
            this.populateTableData();
        }
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
            start_date : moment(period.from).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD')
        }

        action.getReportMemberList(requiredData);
    }

    populateTableData = () => {
        const {
            report
        } = this.props;
        
        const columns = [{
            title: 'Nama Member',
            accessor: 'name'
        }, {
            title: 'Alamat Email',
            accessor: 'email'
        }, {
            title: 'Tipe Member',
            accessor: 'type',
            align: 'center'
        }, {
            title: 'Price',
            accessor: 'price',
            align: 'center'
        }]

        const rows = [] 
        
        if(report.member.isLoaded) {
            report.member.data.result.report.forEach((item, i) => {
                let row = {
                    id: item.id,
                    name: item.name,
                    email: item.email,
                    type: item.type,
                    price: item.price,
                    data: item
                }

                rows.push(row);
            })
        }

        this.setState({
            ...this.state,
            table: {
                ...this.state.table,
                columns: columns,
                rows: rows
            }
        })
    }

    getReportMemberList = () => {
        const {
            action
        } = this.props;

        let {
            period
        } = this.state;

        let requiredData = {
            start_date : moment(period.from).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD')
        }

        action.getReportMemberList(requiredData);
    }

    render() {
        return <AdminReportView
                    {...this.state}
                    {...this.props}
                    showDate={this.showDate}
                    handlePeriodChange={this.handlePeriodChange}
                />;
    }
}

const mapStateToProps = (state) => {
    return {
        report: state.report
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        action: bindActionCreators({ getReportMemberList }, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminReport);