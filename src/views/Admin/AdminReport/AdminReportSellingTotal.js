import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getReportMemberExportToExcell, getReportOwnerSuperAdmin} from '../../../actions/report.action';
import { getVendorEmployeeList, getStoreStaffReport } from '../../../actions/vendor.action';
import { Button } from '../../../components/Button';
import { AdminReportSellingTotalView } from '../AdminReport';
import moment from 'moment';

function mapStateToProps(state){
    return {
        report: state.report,
        vendorState: state.vendorState
    }
}

function mapDispatchToProps(dispatch){
    return {
        getReportOwnerSuperAdminDispatch: (data) => dispatch(getReportOwnerSuperAdmin(data)),
        getVendorEmployeeListDispatch: (data) => dispatch(getVendorEmployeeList(data)),
        getStoreStaffReportDispatch: (data) => dispatch(getStoreStaffReport(data)),
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

        this.handlePeriodChangeAccessDetailStore = this.handlePeriodChangeAccessDetailStore.bind(this);
        this.openAccessDetailStoreModal = this.openAccessDetailStoreModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleChangeStaffOwnerOptions = this.handleChangeStaffOwnerOptions.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.populateTableAccessDetailStore = this.populateTableAccessDetailStore.bind(this);


        this.state = {
            report: {},
            reportList: {},
            table: {
                columns: [],
                rows: [],
                limit: 10
            },
            tabel: {
                kolom:[],
                baris:[],
                limit:10
            },
            period: {
                from: moment().add(-1, 'month'),
        		to: moment()
            },
            periodrepot: {
        		// from: moment().add(-1, 'day'),
        		from: moment(),
        		to: moment()
            },
            
            reportOwnerList : {},
            selectedAccessDetailStore: {},
            isModalOpen: {
                accessDetailStore: false
            },
            staffId:null,
            idStore:{},
            dailyOrdered: {},
            invoice:{},
            totalTransaction:{}
        }
    }
    
    componentDidMount = () => {

        const { getReportOwnerSuperAdminDispatch, getVendorEmployeeListDispatch } = this.props;
        const { period } = this.state;

        let requiredData = {
            start_date : moment(period.from).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD')
        }
        getReportOwnerSuperAdminDispatch(requiredData);


       
    }
    
    componentDidUpdate = (prevProps) => {
        const  { report, vendorState } = this.props;
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

        //GET REPORT PENJUALAN
        if(prevProps.vendorState.reportStaff !== vendorState.reportStaff){

            if(vendorState.reportStaff.isLoaded){

                this.setState({
                    ...this.state,
                    dailyOrdered: vendorState.reportStaff.data.data.result.data,
                    // invoice: vendorState.reportStaff.data.data.result.data[0].queue,
                    // totalTransaction: vendorState.reportStaff.data.data.result.data[0].total,
                },() => {
                    console.log(this.state.invoice);
                    this.populateTableAccessDetailStore();
                    
                });
            }
        }

        // if(prevProps.vendorState.reportDetailStoreStaff !== vendorState.reportDetailStoreStaff){
        //     if(vendorState.reportDetailStoreStaff.isLoaded){

        //         this.setState({
        //             ...this.state,
        //             dailyOrdered : vendorState.reportDetailStoreStaff.data.result.data
        //         }, () => {
        //             console.log(this.state);
        //             this.populateTableAccessDetailStore();

        //         })
        //     }
        // }
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
                title: 'Total Laba Kotor',
                accessor: 'price',
                align: 'left',
                isCurrency: true
            },{
                title: 'Akses Detail',
                accessor: 'action',
                width: '30%',
                align: 'center',
                render: (row) => (
                    <td className="flex justify-content--center">
                            <Button className="margin-right-small" type="button" onClick={() => this.openAccessDetailStoreModal(row)}>Penjualan</Button>                              
                            {/* <Button className="margin-right-small" theme="secondary" type="button" onClick={() => this.openAccessDetailStoreModal(row)}>Staff</Button>                               */}
                    </td>
                    
                )
            }
        ];

        const rows = [];
        const store_names = [];

        if(report.reportOwner.isLoaded){
            report.reportOwner.data.result.forEach((value, i) => {

                let row = {
                    storeId: value.store.id,
                    nameId: value.users.id, //Id User Owner
                    name: value.users.name,
                    store: value.store.name,
                    price: value.total === null ? "-" : value.total
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
    
    handlePeriodChangeAccessDetailStore = (type, date) => {
        const { periodrepot } = this.state;
    	periodrepot[type] = date;
        this.forceUpdate();

    
    }

    handleChangeStaffOwnerOptions = (e) => {

        const { staffId } = this.state;
        
        const target = e.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            ...this.state,
            staffId :  parseInt(value)
        }, () => {
            // console.log(this.state);
        });
    }
    
    openAccessDetailStoreModal = (row) => {
        // console.log(row);

        this.setState({
              ...this.state,
              selectedAccessDetailStore: row

        }, () => {
            const { selectedAccessDetailStore, periodrepot, staffId,} = this.state;
            const { getVendorEmployeeListDispatch, getStoreStaffReportDispatch } = this.props;

            //#GET STORE STAFF LIST || EMPLOYEE
            let requiredDataStoreStaff = {
                id: selectedAccessDetailStore.storeId,
                active: false
            }
            getVendorEmployeeListDispatch(requiredDataStoreStaff);

            //#GET REPORT STORE STAFF
            let requiredDataStoreStaffReport = {
                store:selectedAccessDetailStore.storeId,
                start_date : moment(),
                end_date : moment(),
                staff :'',
                print: false
            };

            getStoreStaffReportDispatch(requiredDataStoreStaffReport);
   
            //#
            this.toggleModal('accessDetailStore');
        });
    };
    
    //#
    handleShow = (e) => {
        
        e.preventDefault();
        const {periodrepot, staffId, selectedAccessDetailStore} = this.state;
        const { getStoreStaffReportDispatch } = this.props;

         //#GET REPORT STORE STAFF
         if(staffId === 2018){//Special case when select Staff ID

            let requiredDataStoreStaffReport = {
                store:selectedAccessDetailStore.storeId,
                start_date : moment(periodrepot.to).format('YYYY-MM-DD'),
                end_date : moment(periodrepot.to).format('YYYY-MM-DD'),
                staff :'',
                print: false
            }
            // console.log(requiredDataStoreStaffReport);
            getStoreStaffReportDispatch(requiredDataStoreStaffReport);

         } else {
            let requiredDataStoreStaffReport = {
                store:selectedAccessDetailStore.storeId,
                start_date : moment(periodrepot.to).format('YYYY-MM-DD'),
                end_date : moment(periodrepot.to).format('YYYY-MM-DD'),
                staff :staffId,
                print: false
            }
            // console.log(requiredDataStoreStaffReport);
            getStoreStaffReportDispatch(requiredDataStoreStaffReport);
         }
    };

    populateTableAccessDetailStore = () => {
        const { vendorState } = this.props;
        const { tabel } = this.state;

        const kolom = [{
            title: 'Tanggal Transaksi',
            accessor: 'date',
            align: 'left' 
        },{
            title: 'Nama Item',
            accessor: 'item',
            align: 'left' 
        }, {
            title: 'Harga',
            accessor: 'price',
            align: 'left' 
        },{
            title: 'Total Item',
            accessor: 'quantity',
            align: 'left' 
        },{
            title: 'Nama Staff',
            accessor: 'staff',
            align: 'left' 
        },{
            title: 'Nama Toko',
            accessor: 'store',
            align: 'left'       
        }];

        let barisArray = [];
        let barisArrayKedua = [];
        let responseData = null;

        //#Get
        if(vendorState.reportStaff.isLoaded){
            vendorState.reportStaff.data.data.result.data.map((value) => { 
                
                //#1
                value.item.map((item, i) => {

                    let barisKedua = {
                        date: value.date,
                        item: item.name,
                        price: item.price,
                        quantity: item.quantity
                    }
                    barisArrayKedua.push(barisKedua);
                }); 

                //#2
                let uniqueSet = new Set(barisArrayKedua.map(e => JSON.stringify(e))); 
                let response = Array.from(uniqueSet).map(e => JSON.parse(e))

                for(let i = 0; i < response.length; i++){

                    const barisPertama = {
                        date: value.date,
                        item: [],
                        price:[],
                        quantity:[],
                        staff: value.user.name,
                        store: value.store.name
                    }
                    // console.log(response);
                    barisPertama.item.push(response[i].item);
                    barisPertama.price.push(response[i].price);
                    barisPertama.quantity.push(response[i].quantity);
                    barisArray.push(barisPertama);
                }

                //#3
                let uniqueSetFinal = new Set(barisArray.map(e => JSON.stringify(e))); 
                responseData = Array.from(uniqueSetFinal).map(e => JSON.parse(e))
 
            });

            this.setState({
                ...this.state,
                tabel: {
                    ...this.state.tabel,
                    kolom: kolom,
                    baris: responseData
                }
            })
        }
    }


    render() {
        return(
            <div>
                <AdminReportSellingTotalView
                    {...this.state}
                    {...this.props}
                    showDate={this.showDate}
                    handlePeriodChange={this.handlePeriodChange}
                    handlePeriodChangeAccessDetailStore= {this.handlePeriodChangeAccessDetailStore}
                    toggleModal={this.toggleModal}
                    handleChangeStaffOwnerOptions={this.handleChangeStaffOwnerOptions}
                    handleShow={this.handleShow}
                    // handleExportToExcell={this.handleExportToExcell}
                />;
            </div>
        ) 

    }
}


export default connect( mapStateToProps, mapDispatchToProps )(AdminReportSellingTotal);