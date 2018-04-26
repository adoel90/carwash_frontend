import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getReportMemberExportToExcell, getReportOwnerSuperAdmin} from '../../../actions/report.action';
import { Button } from '../../../components/Button';
import { AdminReportSellingTotalView } from '../AdminReport';
import moment from 'moment';

function mapStateToProps(state){
    return {
        report: state.report
    }
}

function mapDispatchToProps(dispatch){
    return {
        getReportOwnerSuperAdminDispatch: (data) => dispatch(getReportOwnerSuperAdmin(data)),
        // getReportMemberExportToExcellDispatch: (data) => dispatch(getReportMemberExportToExcell(data)),
        action: bindActionCreators({getReportOwnerSuperAdmin }, dispatch)
    }
}

class AdminReportSellingTotal extends Component {
    constructor() {
        super();
        this.populateTableData = this.populateTableData.bind(this);
        this.showDate = this.showDate.bind(this);
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
        // this.handleExportToExcell = this.handleExportToExcell.bind(this);
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
            },
            reportOwnerList : {}
        }
    }
    
    componentDidMount = () => {

        const { getReportOwnerSuperAdminDispatch } = this.props;
        const { period } = this.state;

        let requiredData = {
            start_date : moment(period.from).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD')
        }
        getReportOwnerSuperAdminDispatch(requiredData);
    }
    
    componentDidUpdate = (prevProps) => {
        const  { report } = this.props;
        //Get Report Owner -  didUpdate
        if(prevProps.report.reportOwner !== report.reportOwner){
            if(report.reportOwner.isLoaded){
                this.setState({
                    ...this.state,
                    reportOwnerList: report.reportOwner
                }, () => {
                    this.populateTableData();
                })
            }
        }
    }

    handlePeriodChange = (type, date) => {
    	const { period } = this.state;
        period[type] = date;
        
    	this.forceUpdate();
    }

    showDate = (e) => {
        const { action } = this.props;

        let { period } = this.state;
        e.preventDefault();

        let requiredData = {
            start_date : moment(period.from).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD')
        }
        action.getReportOwnerSuperAdmin(requiredData);

    }

    populateTableData = () => {
        const { report } = this.props;
        
        const columns = [{
            title: 'Nama Owner',
            accessor: 'name',
            align: 'left'
        }, {
            title: 'Nama Toko',
            accessor: 'store',
            align: 'left'
        }, {
            title: 'Total Penjualan',
            accessor: 'price',
            align: 'left',
            // isCurrency: true
        }
    ]

        const rows = [];
        const store_names = [];

        if(report.reportOwner.isLoaded){
            report.reportOwner.data.result.forEach((value, i) => {

                let row = {
                    name: value.users.name,
                    store: value.store.name,
                    price: value ? value.total : null
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
        const { action } = this.props;

        let {period } = this.state;

        let requiredData = {
            start_date : moment(period.from).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD')
        }
        action.getReportMemberList(requiredData);
    }

    //#
    // handleExportToExcell = (e, period) => {
    //     e.preventDefault();
    //     const { getReportMemberExportToExcellDispatch } = this.props;

    //     let requiredData = {
    //         start_date : moment(period.from).format('YYYY-MM-DD'),
    //         end_date : moment(period.to).format('YYYY-MM-DD'), 
    //         convert: true
    //     }
    //     getReportMemberExportToExcellDispatch(requiredData);
    // }

    render() {
        return(
            <div>
                <AdminReportSellingTotalView
                    {...this.state}
                    {...this.props}
                    showDate={this.showDate}
                    handlePeriodChange={this.handlePeriodChange}
                    // handleExportToExcell={this.handleExportToExcell}
                />;
            </div>
        ) 

    }
}


export default connect( mapStateToProps, mapDispatchToProps )(AdminReportSellingTotal);