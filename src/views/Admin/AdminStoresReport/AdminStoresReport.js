import React, { Component } from 'react';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import moment from 'moment';

import { TabContent } from '../../../components/Tab';
import { PropsRoute } from '../../../components/Route';
import { Nav, NavItem, NavLink, NavTabLink} from '../../../components/Nav';
import { AdminStoresReportView } from '../AdminStoresReport';
import { getStoreList, getStoreStaffReport,  getStoreStaffReportWithPrint} from '../../../actions/vendor.action';
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
        getStoreStaffReportWithPrintDispatch: (data) => dispatch(getStoreStaffReportWithPrint(data))
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

        this.state = {

            vendorReport : {},
            vendorReportList : {},
            table: {
                vendorReportListResults: [],
                columns: [],
                rows: [],
                limit: 10
            },

        	period: {
        		from: moment().add(-1, 'month'),
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
            dailyOrdered: {}
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
            store: store.list.data.data.result.store[storeActive].id,
            start_date: period.from.format('YYYY-MM-DD'),
            end_date: period.to.format('YYYY-MM-DD'),
            staff: user.id,
            print: false
        }
        getStoreStaffReportDispatch(requiredDataStoreStaff);
    }

    populateTableData = () => {

        const {report, vendorState} = this.props;
        const { dailyOrdered } = this.state;
        
        const columns = [{
            title: 'Nama Staff ',
            accessor: 'staff',
            align: 'left'
        }, {
            title: 'Nama Customer ',
            accessor: 'customer',
            align: 'left'
        },{
            title: 'Tanggal Transaksi',
            accessor: 'date',
            align: 'left'
        },{
            title: 'Total Transaksi',
            accessor: 'total',
            align: 'left',
            isCurrency: true
        }]

        const rows = [] 
        
        if(vendorState.reportStaff.isLoaded){
            dailyOrdered.forEach((value) => {
                let row = {
                    staff: value.user.name,
                    customer: value.member.name,
                    date: value.date,
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

    // handlePrint(period){
    handlePrint(e, period){

        e.preventDefault();
        const { getStoreStaffReportWithPrintDispatch, user, store } = this.props;
        const { storeActive } = this.state;

        let requiredData = {
            store: store.list.isLoaded ? store.list.data.data.result.store[storeActive].id : null,
            start_date: period.from.format('YYYY-MM-DD'),
            end_date: period.to.format('YYYY-MM-DD'),
            staff: user.id,
            print: true
        }

        console.log(period);
        console.log(requiredData);
        getStoreStaffReportWithPrintDispatch(requiredData);

        
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
                    {/* IN HERE code of : Get report owner list & Get report store staff */}



                    {/* RENDER CONTENT BASED ON ID STORE */}
                    {renderTabContent()}
                </div>
        )
    }
}

export default connect( mapStateToProps, mapDispatchToProps)(AdminStoresReport);