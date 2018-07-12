import React, { Component } from 'react';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import moment from 'moment';

import { AdminStoresReportMenuView } from '../AdminStoresReportMenu';
import { Nav, NavItem, NavLink, NavTabLink} from '../../../components/Nav';
import { TabContent } from '../../../components/Tab';
import { PropsRoute } from '../../../components/Route';
import { Button } from '../../../components/Button';

import { getStoreList, getStoreMenuReportOwner, getStoreMenuReportOwnerConvertExcell, getStoreMenuReportOwnerWithPrint} from '../../../actions/vendor.action';
import { getStoreListWithIdUser } from '../../../actions/store.action';
import vendorState from '../../../reducers/vendor.user.reducer';

function mapStateToProps(state) {
    return {
        store : state.store,
        vendorState: state.vendorState
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getStoreListDispatch: () => dispatch(getStoreList()),
        getStoreMenuReportOwnerDispatch: (data) => dispatch(getStoreMenuReportOwner(data)),
        getStoreMenuReportOwnerConvertExcellDispatch : (data) => dispatch(getStoreMenuReportOwnerConvertExcell(data)),
        getStoreMenuReportOwnerWithPrintDispatch: (data) => dispatch(getStoreMenuReportOwnerWithPrint(data)),
        
        getStoreListWithIdUserDispatch: () => dispatch(getStoreListWithIdUser())
    }
}

class AdminStoresReportMenu extends Component {

    constructor(){
        super();

        this.toggleTab = this.toggleTab.bind(this);
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.populateTableData = this.populateTableData.bind(this);
        this.handlePrint = this.handlePrint.bind(this);
        this.handleConvertExcell = this.handleConvertExcell.bind(this);

        this.state = {

            table: {
                columns: [],
                rows: [],
                limit: 10
            },
            period: {
        		// from: moment().add(-1, 'day'),
        		from: moment(),
        		to: moment()
            },
            menuDetailList: {},
            storeList: {},
            idStore: {},
            storeActive: 0,
            activeTab: 0,
            startDateDidMount: null
        }
    }

    componentDidMount(){

        const {period, storeIdTab, storeActive} = this.state;
        const { getStoreListDispatch, getStoreListWithIdUserDispatch, store, getStoreMenuReportOwnerDispatch } = this.props;
        getStoreListDispatch();
        getStoreListWithIdUserDispatch();

        //#
        let requiredDataMenuStore = {
            store: store.list.isLoaded ? store.list.data.data.result.store[storeActive].id : null,
            start_date : moment(period.from).add(-1, 'year').format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD'),
            print: false
            // convert: false
        };

        this.setState({
            ...this.state,
            startDateDidMount: moment(period.from).add(-12, 'month').format('YYYY-MM-DD')
        });
        getStoreMenuReportOwnerDispatch(requiredDataMenuStore);
 
    };

    componentDidUpdate(prevProps){
        const { store, vendorState, getStoreMenuReportOwnerDispatch} = this.props;
        const { period, storeActive, idStore, startDateDidMount} = this.state;

        //#Get list store id 
        if(prevProps.store.storelistspecial !== store.storelistspecial){
            if(store.storelistspecial.isLoaded){

                this.setState({
                    ...this.state,
                    storeList: store.storelistspecial,
                    storeIdTab: store.storelistspecial.data.data.result.store[0],
                    
                }, () => {

                    //THIS FUNCTION IS NOT ACTIVE AGAIN 
                    let requiredDataMenuStore = {
                        store: store.storelistspecial.data.data.result.store[0].id,
                        start_date : moment(period.to).format('YYYY-MM-DD'),
                        // start_date : startDateDidMount.length != null ? startDateDidMount : moment(period.to).format('YYYY-MM-DD'),
                        // start_date : moment(period.to).format('YYYY-MM-DD') ? moment(period.to).format('YYYY-MM-DD') : startDateDidMount,
                        end_date : moment(period.to).format('YYYY-MM-DD'),
                        print: false
                        // convert: false
                    };
                  
                    // getStoreMenuReportOwnerDispatch(requiredDataMenuStore);
                });
            }
        };

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

        //GET STORE MENU REPORT OWNER TRANSACTION DETAIL
        if(prevProps.vendorState.reportDetailStoreMenuOwner !== vendorState.reportDetailStoreMenuOwner){
            if(vendorState.reportDetailStoreMenuOwner.isLoaded){

                this.setState({
                    ...this.state,
                    menuDetailList: vendorState.reportDetailStoreMenuOwner.data.result.store
                }, () => {
                    this.populateTableData();
                })
            };   
        }
    }

    //#
	toggleTab = (tabIndex, store) => {
        const {period, storeIdTab} = this.state;
        const {getStoreMenuReportOwnerDispatch } = this.props;

        let requiredDataMenuStore = {
            store: store.id,
            start_date : moment(period.to).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD'),
            print: false
            // convert: false
        }
        getStoreMenuReportOwnerDispatch(requiredDataMenuStore);

        this.setState({
            activeTab: tabIndex,
            storeIdTab: store
		});
    }

    //#
    handlePeriodChange = (type, date) => {
    	const { period } = this.state;
    	period[type] = date;
        this.forceUpdate();
    }

    populateTableData = () => {

        const {vendorState} = this.props;
        const { dailyOrdered, menuDetailList, period } = this.state;
        
        const columns = [
        {
            title: 'Tanggal',
            accessor: 'date',
            align: 'left'
        },
        {
            title: 'Nama Item',
            accessor: 'name',
            align: 'left'
        },
        {
            title: 'Deskripsi Produk',
            accessor: 'description',
            align: 'left'
        },
        {
            title: 'Item Terjual',
            accessor: 'quantity',
            align: 'left'
        }

    ]

        const rows = [];
        if(vendorState.reportDetailStoreMenuOwner.isLoaded){
            vendorState.reportDetailStoreMenuOwner.data.result.store.forEach((value) => {

                let row = {
                    date:moment(value.date).format('DD MMM YYYY'),
                    name: value.menu.name,
                    description: value.menu.description,
                    quantity:value.quantity
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

    handlePrint(e, period){
        e.preventDefault();

        const { idStore } = this.state;
        const { store, getStoreMenuReportOwnerWithPrintDispatch } = this.props;
      
        let requiredDataMenuStorePrint = {
            store: idStore.id,
            start_date : moment(period.to).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD'),
            print: true
            // convert: false
        }
        getStoreMenuReportOwnerWithPrintDispatch(requiredDataMenuStorePrint);
    };

    handleConvertExcell(e){

        e.preventDefault();
        const {period, storeIdTab} = this.state;
        const { store, getStoreMenuReportOwnerConvertExcellDispatch } = this.props;

        let requiredDataMenuStore = {
            store: storeIdTab.id,
            start_date : moment(period.to).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD'),
            print: false
            // convert: false
        };
        // console.log(requiredDataMenuStore);
        getStoreMenuReportOwnerConvertExcellDispatch(requiredDataMenuStore);
    }

    //#
    handleShow = (e) => {

        e.preventDefault();
        const {period, storeIdTab} = this.state;
        const { store, getStoreMenuReportOwnerDispatch } = this.props;

        let requiredDataMenuStore = {
            store: storeIdTab.id,
            start_date : moment(period.to).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD'),
            print: false
            // convert: false
        }

        getStoreMenuReportOwnerDispatch(requiredDataMenuStore);
    };

    render(){

        const { store } = this.props;
        const { activeTab } = this.state;
        
        const renderTabContent = () => {

            if(store.list.isLoaded){
                if(store.list.data.data.result.store.length){
                    return store.list.data.data.result.store.map((store, i) => {
                        return (
                            <TabContent activeTab={activeTab} tabIndex={i}>            
                                <PropsRoute
                                    {...this.props}
                                    {...this.state}
                                    component={AdminStoresReportMenuView}
                                    toggleTab={this.toggleTab}
                                    handlePeriodChange= {this.handlePeriodChange}
                                    handleShow={this.handleShow}
                                    handlePrint= {this.handlePrint}
                                    handleConvertExcell={this.handleConvertExcell}
                                
                                    />
                            </TabContent>
                        )
                    })
                }
            }
        }

        return(
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

                {/* RENDER CONTENT BASED ON ID STORE */}
                {renderTabContent()}
            </div>
        )
    }
}

export default connect( mapStateToProps, mapDispatchToProps)(AdminStoresReportMenu);