import React, { Component } from 'react';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import moment from 'moment';

import { Button } from '../../../components/Button';
import { TabContent } from '../../../components/Tab';
import { PropsRoute } from '../../../components/Route';
import { Nav, NavItem, NavLink, NavTabLink} from '../../../components/Nav';
import { AdminStoresReportView, AdminStoreStaffPaymentReceipt } from '../AdminStoresReport';
import { getStoreList, getStoreStaffReport, getStoreStaffReportWithPrint, getStoreStaffReportDetailAyoTail } from '../../../actions/vendor.action';
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
        getStoreStaffReportDetailAyoTailDispatch: (data) => dispatch(getStoreStaffReportDetailAyoTail(data))
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
            namePriceTotalList:{}
        }
    }

    componentDidMount = () => {
        // const {requiredData, period } = this.state;
        const {period, storeActive} = this.state;
        const { vendorState, store, getStoreStaffReportDispatch, user} = this.props;
        this.getStoreList();

        //#GET REPORT STORE STAFF
        const requiredDataStoreStaff = {
            store: store.list.isLoaded ? store.list.data.data.result.store[storeActive].id : null,
            start_date: period.from.format('YYYY-MM-DD'),
            end_date: period.to.format('YYYY-MM-DD'),
            staff: user.id,
            print: false
        }

        getStoreStaffReportDispatch(requiredDataStoreStaff);
    }

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
                    //CALL populateTableDetail()
                    // console.log(this.state);
                    this.populateTableDetail();

                })
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
            // console.log(this.state);
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
        const {period, storeActive} = this.state;
        const { vendorState, store, getStoreStaffReportDispatch, user} = this.props;


        const requiredDataStoreStaff = {
            store: store.list.data.data.result.store.length > 1 ? store.list.data.data.result.store[1].id || store.list.data.data.result.store[2].id :  store.list.data.data.result.store[storeActive].id,
            // start_date:  period.from.format('YYYY-MM-DD'),
            // end_date: period.to.format('YYYY-MM-DD'),
            start_date : moment(period.to).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD'),
            staff: user.id,
            print: false
        }
        getStoreStaffReportDispatch(requiredDataStoreStaff);
    }

    populateTableData = () => {

        const {report, vendorState} = this.props;
        const { dailyOrdered } = this.state;
        
        const columns = [{
            title: 'No. Bill/ No. Invoice ',
            accessor: 'queue',
            align: 'left'
        }, {
            title: 'Nama Customer ',
            accessor: 'customer',
            align: 'left'
        },
        // {
        //     title: 'Tanggal Transaksi',
        //     accessor: 'date',
        //     align: 'left'
        // },
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
                // console.log(value);

                let row = {
                    // staff: value.user.name,
                    // queue: "CRS805-" + value.queue,
                    id:value.id,
                    queue: value.queue,
                    customer: value.member.name,
                    // date: value.date,
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
        const {storeActive} = this.state;
        const { vendorState, store, getStoreStaffReportWithPrintDispatch, user} = this.props;
        this.getStoreList();

        //#GET REPORT STORE STAFF
        const requiredDataStoreStaff = {
            store: store.list.isLoaded ? store.list.data.data.result.store[storeActive].id : null,
            start_date : moment(period.to).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD'),
            staff: user.id,
            print: false
        }

        getStoreStaffReportWithPrintDispatch(requiredDataStoreStaff);

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
                                        <h4>{store.name}</h4>
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