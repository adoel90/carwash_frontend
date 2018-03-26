import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getReportMemberList } from '../../../actions/report.action';
import { Button } from '../../../components/Button';
import { AdminReportView } from '../AdminReport';

class AdminReport extends Component {
    constructor() {
        super();
        this.getReportMemberList = this.getReportMemberList.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.populateTableData = this.populateTableData.bind(this);
        this.showDate = this.showDate.bind(this);
        this.state = {
            report: {},
            reportList: {},
            table: {
                columns: [],
                rows: [],
                limit: 10
            },
            reportDate: {
                start_date : '2017-12-01',
                end_date : '2018-04-01'
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
            this.setState({
                ...this.state,
                reportList: report.member
            }, () => {
                this.populateTableData();
            });
        }
    }

    handleInputChange = (object, e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            ...this.state,
            [object]: {
                ...this.state[object],
                [name]: value
            }
        });
    }

    showDate = (e) => {
        const {
            action
        } = this.props;

        let {
            selectedReport
        } = this.state;

        e.preventDefault();

        console.log(selectedReport)
    }

    populateTableData = () => {
        const { reportList } = this.state;
        
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
        }]

        const rows = [] 
        
        if(reportList.isLoaded) {
            reportList.data.result.report.forEach((item, i) => {
                let row = {
                    id: item.id,
                    name: item.name,
                    email: item.email,
                    type: item.type,
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
            getReportMemberList
        } = this.props;

        let requiredData = {
            start_date : '2017-12-01',
            end_date : '2018-04-01'
        }

        getReportMemberList(requiredData);
    }

    render() {
        return <AdminReportView
                    {...this.state}
                    {...this.props}
                    handleInputChange={this.handleInputChange}
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
        getReportMemberList: (data) => dispatch(getReportMemberList(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminReport);