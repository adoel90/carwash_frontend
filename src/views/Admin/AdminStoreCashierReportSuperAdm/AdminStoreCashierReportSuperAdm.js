import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { getUserList } from '../../../actions/user.action';
import { getReportStoreCashierMember, getReportStoreCashierMemberPrint, getReportCashierSuperAdmConvertExcell} from '../../../actions/store.action';

import {AdminStoreCashierReportSuperAdmView , AdminStoreCashierReportPaymentReceiptSuperAdm} from '../AdminStoreCashierReportSuperAdm';

function mapStateToProps(state) {
    return {
        store: state.store,
        user: state.user,
    };
};

function mapDispatchToProps(dispatch) {
    return {    
        getUserListDispatch: (data) => dispatch(getUserList(data)),
        getReportStoreCashierMemberDispatch : (data) => dispatch(getReportStoreCashierMember(data)),
        getReportStoreCashierMemberPrintDispatch: (data) => dispatch(getReportStoreCashierMemberPrint(data)),
        getReportCashierSuperAdmConvertExcellDispatch : (data) => dispatch(getReportCashierSuperAdmConvertExcell(data)),
        // action: bindActionCreators({ getReportStoreCashierMember }, dispatch)
    }
};

class AdminStoreCashierReportSuperAdm extends Component{

    constructor(){
        super();
        this.handleClickChange = this.handleClickChange.bind(this);
        this.showDate = this.showDate.bind(this);
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
        this.populateTableData= this.populateTableData.bind(this);
        this.handlePrint = this.handlePrint.bind(this);
        this.handleConvertExcell = this.handleConvertExcell.bind(this);

        this.state = {
            kasirList: {},  
            showHideIntefaceReport: false,
            kasirId:{},

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
        };

        this.optionsPagination = {
            prePage:'Prev',
            nextPage:'Next',
            firstPage: '.', // First page button text
            lastPage: '.', // Last page button text
            sortIndicator: true,
            noDataText: 'Nama User tidak di temukan',
            // searchField: (props) => (<MySearchField { ...props } name="Search users"/>),
            hideSizePerPage: true,
            searchPosition: 'left',
            // onRowDoubleClick: function(row) {
            //     props.toggle();
            // }
        };

    };


    componentDidMount(){

        const { getUserListDispatch } = this.props;

        let requiredData = {
            access: null,
            active: false
        };
        getUserListDispatch(requiredData);
    };

    componentDidUpdate(prevProps){

        const { user, store } = this.props;
        const { kasirList } = this.state;
        

        if(prevProps.user.list !== user.list){            
            if(user.list.isLoaded){
                
                let levelAksesIdArray = [];

                user.list.data.data.result.map((value) => {
                    // console.log(value);
                    if(value.level.id === 3){

                        levelAksesIdArray.push(value);
                        this.setState({
                            ...this.state,
                            kasirList: levelAksesIdArray
                        }, () => {
                            console.log(this.state.kasirList);
                        });
                    } else {
                        // console.log("TAK ADA KASIR ID");
                    };
                });
            };
        };

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
        };
    };

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

            console.log(store.reportCashierMember);
            store.reportCashierMember.data.result.data.forEach((value, i) => {

                let row = {
                    id: value.id,
                    kasirName: value.user.name,
                    transaction_date: moment(value.transaction_date).format('DD MMM YYYY'),
                    description: value.description === "Buat Member" ? "Member Baru" : value.description,
                    total: value.total != null ? value.total : "Rp. 0"
                };
                rows.push(row);
            })
        };

        this.setState({
            ...this.state,
            table: {
                ...this.state.table,
                columns: columns,
                rows: rows
            }
        });
    };

    handlePrint(period){
        const { getReportStoreCashierMemberPrintDispatch, user } = this.props;
        const { printData, kasirId } = this.state;
        
        //Scenario superadmin can access route Kasir
        // let dataId = user.id === 1 ? user.id + 292 : user.id;

        let requiredData = {
            start_date : moment(period.to).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD'),
            user: kasirId,
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
    };

    //#
    handlePeriodChange = (fromTo, date) => {
        const { period } = this.state;
    	period[fromTo] = date;
    	this.forceUpdate();
    };

    //#
    handleClickChange = (e) => {

        e.preventDefault();

        const target = e.target;
        const name = target.name;
        const value = target.value;

        let requireData = {
            start_date : '',
            end_date : '',
            user: value,
            print: null
        };

        const { getReportStoreCashierMemberDispatch } = this.props;
        getReportStoreCashierMemberDispatch(requireData);

        //#
        this.setState({
            ...this.state,
            kasirId: value,
            showHideIntefaceReport: true
        });
    };

    handleConvertExcell(e){
        e.preventDefault();

        const { period, kasirId } = this.state;
        const { user, getReportCashierSuperAdmConvertExcellDispatch } = this.props;

          //Scenario superadmin can access route Kasir
        //   let dataId = user.id === 1 ? user.id + 2 : user.id;
        //   let dataId = user.id === 1 ? user.id + 292 : user.id;

        let requiredData = {
            start_date : moment(period.to).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD'),
            user: kasirId,
            print: false
        };

        getReportCashierSuperAdmConvertExcellDispatch(requiredData);

    };

    //#
    showDate = (e) => {
        e.preventDefault();
        const { getReportStoreCashierMemberDispatch, user } = this.props;
        let { period, kasirId, showHideIntefaceReport } = this.state;
        
        if(showHideIntefaceReport === true){

            let requiredData = {
                start_date : moment(period.to).format('YYYY-MM-DD'),
                end_date : moment(period.to).format('YYYY-MM-DD'),
                user:kasirId,
                print: false
            };
            getReportStoreCashierMemberDispatch(requiredData);
        }
    }

    render (){

        return (
            <div>
                <AdminStoreCashierReportSuperAdmView 
                    showDate={this.showDate}
                    handlePeriodChange={this.handlePeriodChange}
                    handlePrint= {this.handlePrint}
                    handleConvertExcell = {this.handleConvertExcell}
                    handleClickChange = {this.handleClickChange}
                    optionsPagination = {this.optionsPagination}
                    {...this.props} 
                    {...this.state}/>

                 {/* Want to print mini pos */}
                 <AdminStoreCashierReportPaymentReceiptSuperAdm {...this.props} {...this.state}/>
            </div>
        );

    };
};

export default connect( mapStateToProps, mapDispatchToProps )(AdminStoreCashierReportSuperAdm);
