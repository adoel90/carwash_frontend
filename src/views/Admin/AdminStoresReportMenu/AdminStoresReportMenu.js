import React, { Component } from 'react';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import moment from 'moment';

import { AdminStoresReportMenuView } from '../AdminStoresReportMenu';
import { Nav, NavItem, NavLink, NavTabLink} from '../../../components/Nav';
import { TabContent } from '../../../components/Tab';
import { PropsRoute } from '../../../components/Route';
import { Button } from '../../../components/Button';

import { getStoreList, getStoreMenuReportOwner, getStoreMenuReportOwnerWithPrint} from '../../../actions/vendor.action';
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
        getStoreMenuReportOwnerWithPrintDispatch: (data) => dispatch(getStoreMenuReportOwnerWithPrint(data))
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

        this.state = {

            table: {
                // vendorReportListResults: [],
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
        }
    }

    componentDidMount(){
        const { getStoreListDispatch, getStoreMenuReportOwnerDispatch, store } = this.props;
        const {period, storeActive, idStore } = this.state;

        //#
        getStoreListDispatch();
        
        //#
        let requiredDataMenuStore = {
            store: idStore.id,
            // store: store.list.data.data.result.store.length > 1 ? store.list.data.data.result.store[1].id || store.list.data.data.result.store[2].id :  store.list.data.data.result.store[storeActive].id,
            start_date : moment(period.to).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD'),
            print: false
            // convert: false
        }
        getStoreMenuReportOwnerDispatch(requiredDataMenuStore);
    };

    componentDidUpdate(prevProps){
        const { store, vendorState } = this.props;
        const { storeActive } = this.state;

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
            }   
        }
    }

    //#
	toggleTab = (tabIndex, store) => {

        this.setState({
            activeTab: tabIndex,
            storeIdTab: store
		}, () => {   
            const {period, storeActive, idStore} = this.state;
            const { store, getStoreMenuReportOwnerDispatch } = this.props;
    
            let requiredDataMenuStore = {
                // store: idStore.id,
                store: store.list.data.data.result.store.length > 1 ? store.list.data.data.result.store[1].id || store.list.data.data.result.store[2].id :  store.list.data.data.result.store[storeActive].id,
                start_date : moment(period.to).format('YYYY-MM-DD'),
                end_date : moment(period.to).format('YYYY-MM-DD'),
                print: false
                // convert: false
            }
            getStoreMenuReportOwnerDispatch(requiredDataMenuStore);
        })
    }

    //#
    handlePeriodChange = (type, date) => {
    	const { period } = this.state;
    	period[type] = date;
        this.forceUpdate();
    }

    populateTableData = () => {

        const {vendorState} = this.props;
        const { dailyOrdered, menuDetailList } = this.state;
        
        const columns = [{
            title: 'Nama Produk',
            accessor: 'name',
            align: 'left'
        }, {
            title: 'Deskripsi Produk',
            accessor: 'description',
            align: 'left'
        },
        {
            title: 'Harga',
            accessor: 'price',
            align: 'left',
            isCurrency: true
        }]

        const rows = [];
        if(vendorState.reportDetailStoreMenuOwner.isLoaded){
            vendorState.reportDetailStoreMenuOwner.data.result.store.forEach((value) => {
                let row = {
                    name: value.menu.name,
                    description: value.menu.description,
                    price: value.menu.price
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
    }

    //#
    handleShow = (e) => {

        e.preventDefault();
        const {period, idStore, storeActive} = this.state;
        const { store, getStoreMenuReportOwnerDispatch } = this.props;

        let requiredDataMenuStore = {
            store: idStore.id,
            // store: store.list.data.data.result.store.length > 1 ? store.list.data.data.result.store[1].id || store.list.data.data.result.store[2].id :  store.list.data.data.result.store[storeActive].id,
            start_date : moment(period.to).format('YYYY-MM-DD'),
            end_date : moment(period.to).format('YYYY-MM-DD'),
            print: false
            // convert: false
        }
        getStoreMenuReportOwnerDispatch(requiredDataMenuStore);
    }

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
                                    <h4>{store.name}</h4>
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