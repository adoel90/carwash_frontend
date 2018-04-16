import React, { Component } from 'react';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import moment from 'moment';

import { TabContent } from '../../../components/Tab';
import { PropsRoute } from '../../../components/Route';
import { Nav, NavItem, NavLink, NavTabLink} from '../../../components/Nav';
import { AdminStoresReportView } from '../AdminStoresReport';
import { getStoreList } from '../../../actions/vendor.action';
import { getStoreReportList } from '../../../actions/vendor.report.action';



function mapStateToProps(state) {
    return {
        vendorReportState : state.vendorReportState,
        store : state.store
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getStoreReportDispatch: (data) => dispatch(getStoreReportList(data)),
        getStoreListDispatch: () => dispatch(getStoreList())
    }
}

class AdminStoresReport extends Component {
    constructor(){
        super();
        // this.getStoreReportList = this.getStoreReportList.bind(this);
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
        this.populateData = this.populateData.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.getStoreList = this.getStoreList.bind(this);

        this.toggleTab = this.toggleTab.bind(this);

        this.state = {

            vendorReport : {},
            vendorReportList : {},
            table: {
                vendorReportListResults: [],
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
            storeIdTab: {}
        }
    }

    componentDidMount = () => {
        const {requiredData } = this.state;
        this.getStoreList();
    }

    //#
    componentDidUpdate = (prevProps) => {
        const { vendorReportState, store, getStoreReportDispatch} = this.props;
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
                    storeList: store.list.data.data
                }, () => {

                    let requiredDataMonth = {
                        type: 'month',
                        start_date: period.from.format('YYYY-MM-DD'),
                        end_date: period.to.format('YYYY-MM-DD'),
                        storeid : store.list.data.data.result.store[storeActive]
                    }
                    getStoreReportDispatch(requiredDataMonth);
                }) 
            }
        }
    }

    //#
    // getStoreReportList = () => {
    //     /* Only declare this function so that NOT ERROR */
    // }

    //#Get Store List
    getStoreList = ()=> {
        const { getStoreListDispatch } = this.props;
        getStoreListDispatch();
    }
    
    //#
	toggleTab = (tabIndex, store) => {

        // console.log(store);
        // const { getMenuStoreListDispatch, action } = this.props;
        // let data = { id : type.id }

        // action.getMenuStoreList(data);
        this.setState({
            activeTab: tabIndex,
            storeIdTab: store
		}, () => {   
            console.log(this.state);
            // this.populateTableData();
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
    handleShow = () => {

        const {period,storeReportMonth, storeActive, storeList} = this.state;
        const { getStoreReportDispatch, vendorState } = this.props;

        const requiredDataMonth = {
            type: 'month',
            start_date: period.from.format('YYYY-MM-DD'),
            end_date: period.to.format('YYYY-MM-DD'),
            storeid: storeList.result.store[storeActive]
        }

        
        // FIRE dispatch in here !!!
        getStoreReportDispatch(requiredDataMonth).then(()=> {
            console.log("Get report ");
            
        });
    }


    
    render() {
        const { activeTab, storeList} = this.state;
        const { store } = this.props;

        const renderTabContent = () => {

            if(store.list.isLoaded){
                // if(store.list.data.data.result.store.length){
                    return store.list.data.data.result.store.map((type, i) => {
                    // return storeList.map((type, i) => {
                        // console.log(type);
                        return (
                            <TabContent activeTab={activeTab} tabIndex={i}>            
                                <PropsRoute
                                    component={AdminStoresReportView}
                                    type={type}
                                    {...this.props}
                                    {...this.state}
                                    // toggleModal={this.toggleModal}
                                    // handleInputChange={this.handleInputChange}
                                    // handleUpdateSubmitVendorEmployee={this.handleUpdateSubmitVendorEmployee}
                                    // handleCancelModal= {this.handleCancelModal}
                                    toggleTab={this.toggleTab}
                                />
                            </TabContent>
                        )
                    })
                // }
            }
        }

        return (
                <div>
                    <Nav tabs className="flex justify-content--space-between">
                        { store.list.isLoaded ? store.list.data.data.result.store.map((store, i) => {                           
                            <NavItem>
                                <NavTabLink active= {activeTab === i} onClick={() => this.toggleTab(i, store)}>
                                    <h4>{store.name}</h4>
                                </NavTabLink>
                            </NavItem>
                        }) : null}

                        <h1>Hai</h1>
                    </Nav>

                    {/* RENDER CONTENT BASED ON ID STORE */}
                    {renderTabContent()}
                </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminStoresReport);