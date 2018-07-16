import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { Button } from '../../../components/Button';
import { AdminReportMemberView } from '../AdminReport';
import { getReportMemberSuperAdmin, getReportMemberSuperAdminPrint, getReportMemberExportToExcell} from '../../../actions/report.action';
import { getMemberDetailHistoris } from '../../../actions/member.action';

function mapStateToProps(state){
    return {
        report: state.report,
        member: state.member
    }
};

function mapDispatchToProps(dispatch){
    return {
        getMemberDetailHistorisDispatch: (data) => dispatch(getMemberDetailHistoris(data)),
        getReportMemberExportToExcellDispatch: (data) => dispatch(getReportMemberExportToExcell(data)),
        action: bindActionCreators({getReportMemberSuperAdmin, getReportMemberSuperAdminPrint }, dispatch)
    }
};

class AdminReportMember extends Component {

    constructor(){
        super();
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
        this.showDate = this.showDate.bind(this);
        this.populateTableData = this.populateTableData.bind(this);
        this.handlePrint = this.handlePrint.bind(this);
        this.handleExportToExcell = this.handleExportToExcell.bind(this);
        this.openMemberModalDetailNew = this.openMemberModalDetailNew.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.populateTableDetailHistoris = this.populateTableDetailHistoris.bind(this);

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

        this.state = {
            period: {
                from: moment().add(-1, 'month'),
        		to: moment()
            },
            table: {
                columns: [],
                rows: [],
                limit: 10,
                searchParams: [
                    { accessor: 'name', name: 'Nama Member' },
                    { accessor: 'email', name: 'Email' },
                    { accessor: 'kartu', name: 'Tipe Member' },
              ]
            },
            tabel: {
                kolom:[],
                baris:[],
                limit:10
            },
            search: {
                searchText: '',
                searchBy: 'name'
            },
            isModalOpen: {
                detailMemberHistory: false
            },
            selectedMemberDetail: {},
            reportMemberList: {},
            listMemberTransactionHistoris: {}
        };
    };

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
                    reportMemberList: report.reportMember
                }, () => {
                    this.populateTableData();
                })
            }
        }

        //#GET REPORT MEMBER SUPERADMIN WITH PRINT
        if(prevProps.report.reportMemberPrint !== report.reportMemberPrint){

        };
        
         //Get Detail Member Historis
        if(prevProps.member.memberHistoris !== member.memberHistoris){
            if(member.memberHistoris.isLoaded){
                  this.setState({
                        ...this.state,
                        listMemberTransactionHistoris: member.memberHistoris.data.data.result
                  },() => {
                        // console.log(this.state);
                        this.populateTableDetailHistoris();
                  } );

            }
        };
    }

    handlePeriodChange = (type, date) => {
    	const { period } = this.state;
        period[type] = date;
    	this.forceUpdate();
    };

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

        const { report,member} = this.props;
        const { reportMemberList  } = this.state;
        
        const columns = [{
            title: 'No. Kartu',
            accessor: 'id',
            align: 'left'
        }, 
        {
            title: 'Kartu',
            accessor: 'kartu',
            align: 'left'
        }, 
        {
            title: 'Nama',
            accessor: 'name',
            align: 'left'
        },{
            title: 'Tgl Daftar',
            accessor: 'created',
            align: 'left'
        },{
            title: 'Saldo',
            accessor: 'balance',
            align: 'left',
            isCurrency: true
        },
        {
            title: 'Status',
            accessor: 'data',
            // width: '30%',
            // align: 'center',
            // render: (row) => (
            //       <td className="flex justify-content--center">
            //             <Button className="margin-right-small" type="button" onClick={() => this.openMemberModalDetailNew(row)}>Histori</Button>                              
            //       </td>
            // )
        }];

        const rows = [];

        if(report.reportMember.isLoaded){
            report.reportMember.data.result.report.forEach((value, i) => {
                // console.log(value);
                let row = {
                    id: value.card.id,
                    kartu: value.card.type ? value.card.type.name : null,
                    name: value.name,
                    created: value.created_at,
                    balance: value.balance,
                    last: value.last_transaction,
                    // id: value.id,
                    data:value
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
    };
    
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

        console.log(row);

        this.setState({
              ...this.state,
              selectedMemberDetail: row
        }, () => {

            const { selectedMemberDetail } = this.state;
            const { getMemberDetailHistorisDispatch } = this.props;

            let data = {
                id: selectedMemberDetail.id,
                transaction: true
            }
            getMemberDetailHistorisDispatch(data);
            this.toggleModal('detailMemberHistory');
        });
    }

    //#
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

      //#
      populateTableDetailHistoris = () => {
            
        const { member } = this.props;
        const { tabel } = this.state;

        const kolom = [{
            title: 'Tanggal Transaksi',
            accessor: 'date',
            align: 'left' 
        }, 
        {
            title: 'Transaksi',
            accessor: 'type',
            align: 'left' 
        },
        {
            title: 'Jumlah',
            accessor: 'total',
            align: 'left' 
        }];

        let barisArray = [];

        if(member.memberHistoris.isLoaded){
            member.memberHistoris.data.data.result.transaction.map((value) => {
            
                let baris = {
                    date: moment(value.date).format('DD MMM YYYY'),
                    total: value.total,
                    type: value.type === "store" ? "Penjualan" : value.type
                }
                barisArray.push(baris);
            });
        };

        this.setState({
            ...this.state,
            tabel: {
                ...this.state.tabel,
                kolom: kolom,
                baris: barisArray
            }
        })
    }

    render (){
        return(
            <div>
                <AdminReportMemberView 
                    {...this.state} 
                    { ...this.props} 
                    showDate={this.showDate}
                    handlePeriodChange={this.handlePeriodChange}
                    handlePrint={this.handlePrint}
                    handleExportToExcell= {this.handleExportToExcell}
                    toggleModal={this.toggleModal}
                    handleInputChange= {this.handleInputChange}
                    optionsPagination = {this.optionsPagination}
                    openMemberModalDetailNew = { this.openMemberModalDetailNew}
                    />
            </div>
        )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(AdminReportMember);