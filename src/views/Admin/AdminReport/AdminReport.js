import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { Button } from '../../../components/Button';
import { AdminReportView } from '../AdminReport';
import { getReportMemberSuperAdmin, getReportMemberSuperAdminPrint, getReportMemberExportToExcell} from '../../../actions/report.action';
import { getMemberDetailHistoris } from '../../../actions/member.action';

function mapStateToProps(state){
    return {
        report: state.report,
        member: state.member
    }
}

function mapDispatchToProps(dispatch){
    return {
        getMemberDetailHistorisDispatch: (data) => dispatch(getMemberDetailHistoris(data)),
        getReportMemberExportToExcellDispatch: (data) => dispatch(getReportMemberExportToExcell(data)),
        action: bindActionCreators({getReportMemberSuperAdmin, getReportMemberSuperAdminPrint }, dispatch)
    }
}

class AdminReport extends Component {

    constructor(){
        super();
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
        this.showDate = this.showDate.bind(this);
        this.populateTableData = this.populateTableData.bind(this);
        this.handlePrint = this.handlePrint.bind(this);
        this.handleExportToExcell = this.handleExportToExcell.bind(this);
        this.openMemberModalDetailNew = this.openMemberModalDetailNew.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        this.state = {
            period: {
                from: moment().add(-1, 'month'),
        		to: moment()
            },
            table: {
                columns: [],
                rows: [],
                limit: 10
            },
            isModalOpen: {
                detailMemberHistory: false
            },
            selectedMemberDetail: {},
            reportMemberList: {},
            listMemberTransactionHistoris: {}
        }
    }

    componentDidMount(){
        const { action } = this.props;
        let { period } = this.state;

        let requiredData = {
            start_date : moment(period.from).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD')
        }
        action.getReportMemberSuperAdmin(requiredData);
    }

    componentDidUpdate(prevProps){

        const { report, member } = this.props;

        if(prevProps.report.reportMember !== report.reportMember){

            if(report.reportMember.isLoaded){
                this.setState({
                    ...this.state,
                    reportMemberList: report.reportMember,
                }, () => {
                    this.populateTableData();
                })
            }
        }

        //#GET REPORT MEMBER SUPERADMIN WITH PRINT
        if(prevProps.report.reportMemberPrint !== report.reportMemberPrint){

        }
        
         //Get Detail Member Historis
        if(prevProps.member.memberHistoris !== member.memberHistoris){
            if(member.memberHistoris.isLoaded){
                  this.setState({
                        ...this.state,
                        listMemberTransactionHistoris: member.memberHistoris.data.data.result
                  },() => {
                        // console.log(this.state);
                  } );

            }
      }
    }

    handlePeriodChange = (type, date) => {
    	const { period } = this.state;
        period[type] = date;
    	this.forceUpdate();
    }

    showDate = (e) => {

        e.preventDefault();
        const { action } = this.props;
        let { period } = this.state;

        let requiredData = {
            start_date : moment(period.from).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD')
        }
        action.getReportMemberSuperAdmin(requiredData);

    }

    populateTableData = () => {

        const { report } = this.props;
        
        const columns = [{
            title: 'Nomor Kartu',
            accessor: 'id',
            align: 'left'
        }, 
        // {
        //     title: 'Jenis Kartu',
        //     accessor: 'card',
        //     align: 'left'
        // }, 
        {
            title: 'Nama Member',
            accessor: 'name',
            align: 'left'
        },{
            title: 'Tanggal Daftar',
            accessor: 'created',
            align: 'left'
        },{
            title: 'Saldo',
            accessor: 'balance',
            align: 'left',
            isCurrency: true
        },{
            title: 'Tanggal Transaksi',
            accessor: 'last',
            align: 'left'
        },{
            title: 'Status',
            accessor: 'action',
            width: '30%',
            align: 'center',
            render: (row) => (
                  <td className="flex justify-content--center">
                        <Button className="margin-right-small" theme="light" type="button" onClick={() => this.openMemberModalDetailNew(row)}>Histori</Button>                              
                  </td>
            )
        }]

        const rows = [];

        if(report.reportMember.isLoaded){
            report.reportMember.data.result.report.forEach((value, i) => {
                // console.log(value);
                let row = {
                    id: value.card.id,
                    // card: report.reportMember.isLoaded ? value.card.type.name : null,
                    name: value.name,
                    created: value.created_at,
                    balance: value.balance,
                    last: value.last_transaction,
                    memberId: value.id,
                    // cardType: value.card.type.name
                
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

    //#
    toggleModal = (name) => {
        const { isModalOpen } = this.state;
        
        this.setState({
              ...this.state,
              isModalOpen: {
                    [name]: !isModalOpen[name]
              }
        })
    }

    //#
    handlePrint(period){
        const { action } = this.props;

        let requiredData = {
            start_date : moment(period.from).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD'),
            print: true
        }

        action.getReportMemberSuperAdminPrint(requiredData);
    }
    
    handleExportToExcell = (e, period) => {
        e.preventDefault();
        const { getReportMemberExportToExcellDispatch } = this.props;

        let requiredData = {
            start_date : moment(period.from).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD'), 
            convert: true
        }
        getReportMemberExportToExcellDispatch(requiredData);
    }

    openMemberModalDetailNew = (row) => {
        // console.log(row);
        this.setState({
              ...this.state,
              selectedMemberDetail: row
        }, () => {

            const { selectedMemberDetail } = this.state;
            const { getMemberDetailHistorisDispatch } = this.props;

            // console.log(selectedMemberDetail);
            let data = {
                id: selectedMemberDetail.memberId,
                // transaction: selectedMemberDetail.data.status
                transaction: true
            }
            getMemberDetailHistorisDispatch(data);
            this.toggleModal('detailMemberHistory');
        });
        
  }

    render (){
        return(
            <div>
                <AdminReportView 
                    {...this.state} 
                    { ...this.props} 
                    showDate={this.showDate}
                    handlePeriodChange={this.handlePeriodChange}
                    handlePrint={this.handlePrint}
                    handleExportToExcell= {this.handleExportToExcell}
                    toggleModal={this.toggleModal}
                    />

            </div>
        )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(AdminReport);