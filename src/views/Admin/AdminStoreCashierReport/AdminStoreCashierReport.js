import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { AdminStoreCashierReportView, AdminStoreCashierReportPaymentReceipt} from '../AdminStoreCashierReport';
import { getReportStoreCashierMember, getReportStoreCashierMemberPrint} from '../../../actions/store.action';


function mapStateToProps(state) {
    return {
        store: state.store
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getReportStoreCashierMemberDispatch: (data) => dispatch(getReportStoreCashierMember(data)),
        getReportStoreCashierMemberPrintDispatch: (data) => dispatch(getReportStoreCashierMemberPrint(data)),
        action: bindActionCreators({ getReportStoreCashierMember }, dispatch)
    }
}

class AdminStoreCashierReport extends Component {

    constructor(){
        super();
        this.showDate = this.showDate.bind(this);
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
        this.populateTableData= this.populateTableData.bind(this);
        this.handlePrint = this.handlePrint.bind(this);
        this.state = {
            table: {
                columns: [],
                rows: [],
                limit: 10
            },
            period: {
                from: moment(),
        		to: moment()
            }, 
            report: {},
            printData: {},
            printDataDetail:{},
            statusPrintData: null
        }
    }

    componentDidMount(){
        const {getReportStoreCashierMemberDispatch, user} = this.props;
        const { period } = this.state;

        let data = {
            start_date : moment(period.from).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD'),
            user: user.id,
            print: null
        }
        getReportStoreCashierMemberDispatch(data);
    }

    componentDidUpdate(prevProps){
        const { store } = this.props;
        if(prevProps.store.reportCashierMember !== store.reportCashierMember){
            if(store.reportCashierMember.isLoaded){

                this.setState({
                    ...this.state,
                    printData: store.reportCashierMember,
                    statusPrintData: 200
                }, () => {
                    this.populateTableData();
                })
            }
        }
    }

    showDate = (e) => {
        e.preventDefault();
        const { getReportStoreCashierMemberDispatch, user } = this.props;
        let { period } = this.state;

        let requiredData = {
            start_date : moment(period.to).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD'),
            user: user.id,
            print: false
        }
        getReportStoreCashierMemberDispatch(requiredData);
    }

    handlePeriodChange = (fromTo, date) => {
        const { period } = this.state;
    	period[fromTo] = date;
    	this.forceUpdate();
    }

    populateTableData = () => {
        const { store } = this.props;
       
        const columns = [
        {
            title: 'Tanggal Transaksi',
            accessor: 'transaction_date',
            align: 'left'
        },
        {
            title: 'Nama Kasir ',
            accessor: 'kasirName',
            align: 'left'
        }, 
        {
            title: 'Deskripsi',
            accessor: 'description',
            align: 'left'
        }, 
        {
            title: 'Total Transaksi',
            accessor: 'total',
            align: 'left',
            isCurrency: true
        }]

        const rows = [] 
        
        if(store.reportCashierMember.isLoaded){
            store.reportCashierMember.data.result.data.forEach((value, i) => {
                let row = {
                    // id: value.id,
                    kasirName: value.user.name,
                    transaction_date: moment(value.transaction_date).format('DD-MM-YYYY'),
                    description: value.description,
                    total: value.total
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

    handlePrint(period){
        const { getReportStoreCashierMemberPrintDispatch, user } = this.props;
        const { printData } = this.state;

        let requiredData = {
            start_date : moment(period.to).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD'),
            user: user.id,
            print: true
        }

        this.setState({
            ...this.state,
            printDataDetail: printData.data.result.data,
            statusPrintData: 200
            }, () => {
                window.print();
        })
        // getReportStoreCashierMemberPrintDispatch(requiredData);
    }

    render () { 
        return(
            <div>
                <AdminStoreCashierReportView 
                    {...this.props}
                    {...this.state}
                    showDate={this.showDate}
                    handlePeriodChange={this.handlePeriodChange}
                    handlePrint= {this.handlePrint}
                />

                 {/* want to print mini pos */}
                 <AdminStoreCashierReportPaymentReceipt {...this.props} {...this.state}/>
            </div>
        )   
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(AdminStoreCashierReport);