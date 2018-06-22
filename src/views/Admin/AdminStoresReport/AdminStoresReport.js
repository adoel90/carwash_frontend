import React, { Component } from 'react';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import moment from 'moment';

import { Button } from '../../../components/Button';
import { TabContent } from '../../../components/Tab';
import { PropsRoute } from '../../../components/Route';
import { Nav, NavItem, NavLink, NavTabLink} from '../../../components/Nav';
import { AdminStoresReportView, AdminStoreStaffPaymentReceipt } from '../AdminStoresReport';
import { getVendorEmployeeList, getStoreList, getStoreStaffReport, getStoreStaffReportWithPrint, getStoreStaffReportDetailAyoTail } from '../../../actions/vendor.action';
// import { getStoreStaffList } from '../../../actions/store.action';
// import { getStoreReportList } from '../../../actions/vendor.report.action';

function mapStateToProps(state) {
    return {
        vendorReportState : state.vendorReportState,
        store : state.store,
        vendorState: state.vendorState
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getStoreListDispatch: () => dispatch(getStoreList()),
        getStoreStaffReportDispatch: (data) => dispatch(getStoreStaffReport(data)),
        getStoreStaffReportWithPrintDispatch: (data) => dispatch(getStoreStaffReportWithPrint(data)),
        getStoreStaffReportDetailAyoTailDispatch: (data) => dispatch(getStoreStaffReportDetailAyoTail(data)),
        getVendorEmployeeListDispatch: (data) => dispatch(getVendorEmployeeList(data))
    }
}

class AdminStoresReport extends Component {
    constructor(){
        super();
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
        this.populateData = this.populateData.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.getStoreList = this.getStoreList.bind(this);

        this.toggleTab = this.toggleTab.bind(this);
        this.populateTableData = this.populateTableData.bind(this);
        this.handlePrint = this.handlePrint.bind(this);

        this.openModalDetail = this.openModalDetail.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        this.populateTableDetail = this.populateTableDetail.bind(this);
        this.handleChangeStaffOwnerOptions = this.handleChangeStaffOwnerOptions.bind(this);

        this.state = {

            isModalOpen: {
                detailReportStaff: false
            },
            vendorReport : {},
            vendorReportList : {},
            table: {
                vendorReportListResults: [],
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
        		// from: moment().add(-1, 'day'),
        		from: moment(),
        		to: moment()
            },
            
            requiredData: {
                type:'',
                start_date: moment().add(-1, 'month'),
                end_date: moment()
                
            },
            storeReportMonth: {},
            storeActive: 0,
            storeList: {},

            activeTab: 0,
            storeIdTab: {},
            idStore: {},
            dailyOrdered: {},
            statusPrintData: null,
            statusPrintDetail: null,
            selectedRow: {},
            namePriceTotalList:{},
            staffOwnerList:{},
            // newStaffSelected:{
            //     id: null,
            //     // name: ''
            // },
            staffId:null
        }
    }

    componentDidMount = () => {
        const {period, storeActive, staffId} = this.state;
        const { vendorState, store, getStoreStaffReportDispatch, getVendorEmployeeListDispatch, user} = this.props;
        
        //#GET STORE LIST
        this.getStoreList();

        //#GET REPORT STORE STAFF
        let requiredDataStoreStaffReport = {
            store: store.list.isLoaded ? store.list.data.data.result.store[storeActive].id : null,
            start_date: period.from.format('YYYY-MM-DD'),
            end_date: period.to.format('YYYY-MM-DD'),
            // staff: user.id,
            staff : staffId === null ? '' : user.id,
            print: false
        }
        
        getStoreStaffReportDispatch(requiredDataStoreStaffReport);

        //GET STORE STAFF LIST || EMPLOYEE
        let requiredDataStoreStaff = {
            id: store.list.isLoaded ? store.list.data.data.result.store[storeActive].id : null,
            active: false
        }
        getVendorEmployeeListDispatch(requiredDataStoreStaff);

    };

    //#
    componentDidUpdate = (prevProps) => {
        const { vendorReportState, store, getStoreReportDispatch, vendorState} = this.props;
        const {period,storeReportMonth, storeActive} = this.state;
        
        if(prevProps.vendorReportState.summary !== vendorReportState.summary) {
            this.setState({
                ...this.state,
                storeReportMonth: vendorReportState.summary
            }, () => {
                this.populateData();
            });
        }  
        
        //Get Store List
        if(prevProps.store.list !== store.list) {
            if (store.list.isLoaded) {
                this.setState({
                    ...this.state,
                    storeList: store.list.data.data,
                    idStore: store.list.data.data.result.store[storeActive]
                }) 
            }
        }

        //GET REPORT PENJUALAN
        if(prevProps.vendorState.reportStaff !== vendorState.reportStaff){
            if(vendorState.reportStaff.isLoaded){

                this.setState({
                    ...this.state,
                    dailyOrdered: vendorState.reportStaff.data.data.result.data
                },() => {
                    // console.log(this.state);
                    this.populateTableData();
                });
            }
        }

        //#GET STORE STAFF REPORT DETAIL
        if(prevProps.vendorState.reportDetailStoreStaff !== vendorState.reportDetailStoreStaff){
            if(vendorState.reportDetailStoreStaff.isLoaded){

                this.setState({
                    ...this.state,
                    namePriceTotalList : vendorState.reportDetailStoreStaff.data.result.data
                }, () => {
                    this.populateTableDetail();

                })
            }
        }

        //Get List Vendor/Store Staff
        if(prevProps.vendorState.employee !== vendorState.employee){
            if(vendorState.employee.isLoaded){
                this.setState({
                    ...this.state,
                    staffOwnerList: vendorState.employee.data.data.result.staff
                });
            }
        }
    }

    //#Get Store List
    getStoreList = ()=> {
        const { getStoreListDispatch } = this.props;
        getStoreListDispatch();
    }
    
    //#
	toggleTab = (tabIndex, store) => {

        this.setState({
            activeTab: tabIndex,
            storeIdTab: store
            
		}, () => {
            const { storeIdTab } = this.state;
            const { getVendorEmployeeListDispatch } = this.props;

             //GET STORE STAFF LIST || EMPLOYEE
            let requiredDataStoreStaff = {
                id: storeIdTab.id,
                active: false
            }
            getVendorEmployeeListDispatch(requiredDataStoreStaff);
        });
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

    populateData = () => {
        const { storeReportMonth } = this.state;
        const vendorReportListResults = []; 

        if(storeReportMonth.isLoaded) {
            storeReportMonth.data.data.result.map((data, i)=>{

                let vendorReportListResult = {
                    transaction:data.transaction,
                    name: data.name,
                    data: data
                }
                vendorReportListResults.push(vendorReportListResult);
            })
        };

        this.setState({
            ...this.state,
            table:{
                ...this.state.table,
                vendorReportListResults: vendorReportListResults
            }
        });
    }

    //#
    handlePeriodChange = (type, date) => {
    	const { period } = this.state;
    	period[type] = date;
        this.forceUpdate();
    }

    //#
    handleShow = (e) => {

        e.preventDefault();
        const {period, storeActive, staffId, storeIdTab} = this.state;
        const { vendorState, store, getStoreStaffReportDispatch, user} = this.props;

        //#GET REPORT STORE STAFF
        if(staffId === 2018){//Special case when select Staff ID

            const requiredDataStoreStaff = {
                store: storeIdTab.id === undefined ? store.list.data.data.result.store[0].id : storeIdTab.id,
                start_date : moment(period.to).format('YYYY-MM-DD'),
                end_date : moment(period.to).format('YYYY-MM-DD'),
                staff: '',
                print: false
            }
            getStoreStaffReportDispatch(requiredDataStoreStaff);

        } else {

            const requiredDataStoreStaff = {
                store: storeIdTab.id === undefined ? store.list.data.data.result.store[0].id : storeIdTab.id,
                start_date : moment(period.to).format('YYYY-MM-DD'),
                end_date : moment(period.to).format('YYYY-MM-DD'),
                staff: staffId === null ? user.id : staffId,
                print: false
            }
            getStoreStaffReportDispatch(requiredDataStoreStaff);
        }
    }

    populateTableData = () => {

        const {report, vendorState} = this.props;
        const { dailyOrdered } = this.state;
        
        const columns = [{
            title: 'No. Invoice ',
            accessor: 'queue',
            align: 'left'
        }, {
            title: 'Nama Staff ',
            accessor: 'staff',
            align: 'left'
        },
        {
            title: 'Total',
            accessor: 'total',
            align: 'left',
            isCurrency: true
        },
        {
            title: 'Aksi',
            accessor: 'action',
            // render: (data) => (
            render: (row) => (
                <td>
                    <Button className="margin-right-small" type="button" onClick={() => this.openModalDetail(row)}>Detail</Button>
                </td>
            )
        }
    ]

        const rows = [] 
        
        if(vendorState.reportStaff.isLoaded){
            dailyOrdered.forEach((value) => {
                console.log(value);

                let row = {
                    // staff: value.user.name,
                    // queue: "CRS805-" + value.queue,
                    id:value.id,
                    queue: value.queue,
                    // customer: value.member ? value.member.name : null ,
                    // date: value.date,
                    staff: value.user ? value.user.name : null,
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

    //#
    handlePrint(e, period){

        e.preventDefault();
        const {storeActive, storeIdTab, staffId, dailyOrdered} = this.state;
        const { vendorState, store, getStoreStaffReportWithPrintDispatch, user} = this.props;
        this.getStoreList();

        //#GET REPORT STORE STAFF
        const requiredDataStoreStaff = {
            store: storeIdTab.id === undefined ? store.list.data.data.result.store[0].id : storeIdTab.id,
            start_date : moment(period.to).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD'),
            staff: staffId === null ? user.id : staffId,
            print: false
        }
        // getStoreStaffReportWithPrintDispatch(requiredDataStoreStaff);

        this.setState({
            ...this.state,
                printData: dailyOrdered,
                statusPrintData: 200
            }, () => {
                window.print();
        })
    }

    //#
    openModalDetail = (row) => {
        // console.log(row);
        this.setState({
            ...this.state,
            selectedRow: row
        }, () => {

            this.toggleModal('detailReportStaff');

            const {getStoreStaffReportDetailAyoTailDispatch, user} = this.props;
            let { period, selectedRow, idStore} = this.state;

            let requireData = {
                id: selectedRow.id,
                // staff: user.name,
                // store: idStore.id,
                start_date: moment(period.to).format('YYYY-MM-DD'),  
                end_date : moment(period.to).format('YYYY-MM-DD'),
                // print: false
            }
            getStoreStaffReportDetailAyoTailDispatch(requireData);
        })
    }

    //#
    populateTableDetail = () => {
            
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
        if(vendorState.reportDetailStoreStaff.isLoaded){
            vendorState.reportDetailStoreStaff.data.result.data.map((value) => { 

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

    // handleChangeStaffOwnerOptions = (object, e) => {
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

    render() {
        const { activeTab, storeList} = this.state;
        const { store } = this.props;
        const renderTabContent = () => {

            if(store.list.isLoaded){
                if(store.list.data.data.result.store.length){
                    return store.list.data.data.result.store.map((store, i) => {
                        return (
                            <TabContent activeTab={activeTab} tabIndex={i}>            
                                <PropsRoute
                                    {...this.props}
                                    {...this.state}
                                    component={AdminStoresReportView}
                                    handlePeriodChange= {this.handlePeriodChange}
                                    toggleTab={this.toggleTab}
                                    handleShow={this.handleShow}
                                    handlePrint= {this.handlePrint}
                                    toggleModal={this.toggleModal}
                                    handleChangeStaffOwnerOptions= {this.handleChangeStaffOwnerOptions}
                                    />
                            </TabContent>
                        )
                    })
                }
            }
        }

        return (
                <div>
                    <Nav tabs className="flex justify-content--space-between">
                        { store.list.isLoaded ? store.list.data.data.result.store.map((store, i) => {   
                            return (
                                <NavItem>
                                    <NavTabLink active= {activeTab === i} onClick={() => this.toggleTab(i, store)}>
                                        <h5>{store.name}</h5>
                                    </NavTabLink>
                                </NavItem>
                            )                        
                        }) : null}
                    </Nav>
                    {/* want to print mini pos */}
                    <AdminStoreStaffPaymentReceipt {...this.props} {...this.state}/>
                    {/* IN HERE code of : Get report owner list & Get report store staff */}

                    {/* RENDER CONTENT BASED ON ID STORE */}
                    {renderTabContent()}
                </div>
        )
    }
}

export default connect( mapStateToProps, mapDispatchToProps)(AdminStoresReport);