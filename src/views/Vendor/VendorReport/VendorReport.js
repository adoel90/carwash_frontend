import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VendorReportView } from '../VendorReport';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { getStoreList } from '../../../actions/vendor.action';
import { getStoreReportList } from '../../../actions/vendor.report.action';

function mapStateToProps(state) {
    return {
        vendorReportState : state.vendorReportState,
        storeState : state.storeState
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getStoreReportDispatch: (data) => dispatch(getStoreReportList(data)),
        getStoreListDispatch: () => dispatch(getStoreList())
    }
}

class VendorReport extends Component {

    constructor(){
        
        super();
        this.getStoreReportList = this.getStoreReportList.bind(this);
        // this.getGraphStatisticsMonth = this.getGraphStatisticsMonth.bind(this);
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
        // this.handleClick = this.handleClick.bind(this);
        // this.renderSummaryCards = this.renderSummaryCards.bind(this);
        this.populateData = this.populateData.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.getStoreList = this.getStoreList.bind(this);

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
            storeList: {}
        }
    }

    componentDidMount = () => {
        const {requiredData } = this.state;
        // this.getStoreReportList(requiredData);
        this.getStoreList();
    }



    //#
    componentDidUpdate = (prevProps) => {
        const { vendorReportState, storeState, getStoreReportDispatch} = this.props;
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
        if(prevProps.storeState.store !== storeState.store) {
            if (storeState.store.isLoaded) {

             

                this.setState({
                    ...this.state,
                    storeList: storeState.store.data.data
                }, () => {

                    let requiredDataMonth = {
                        type: 'month',
                        start_date: period.from.format('YYYY-MM-DD'),
                        end_date: period.to.format('YYYY-MM-DD'),
                        storeid : storeState.store.data.data.result.store[storeActive]
                    }
                    getStoreReportDispatch(requiredDataMonth);
                    // console.log(this.state);
                    
                })

                
            }
           
        }
    }

    //#
    getStoreReportList = () => {

        // const { getStoreReportDispatch } = this.props;
        // const {period, requiredData, storeList, storeActive} = this.state;

    
        // let requiredDataMonth = {
        //     type: 'month',
        //     start_date: period.from.format('YYYY-MM-DD'),
        //     end_date: period.to.format('YYYY-MM-DD'),
        //     // storeId : storeList.result.store[storeActive]
        //  }

        // getStoreReportDispatch(requiredDataMonth);
    }

    //#Get Store List
    getStoreList = ()=> {
        const { getStoreListDispatch } = this.props;
        getStoreListDispatch();
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

        const {period,storeReportMonth, storeActive} = this.state;
        const { getStoreReportDispatch, vendorState } = this.props;

        const dataStoresId = [];

        vendorState.store.data.data.result.store.map((data)=>{

            let dataStoreId = {
                id: data.id
            }

            dataStoresId.push(dataStoreId);
        })
        
        const requiredDataMonth = {
            type: 'month',
            start_date: period.from.format('YYYY-MM-DD'),
            end_date: period.to.format('YYYY-MM-DD')
        }

        // FIRE dispatch in here !!!
        getStoreReportDispatch(requiredDataMonth).then(()=> {
            console.log("Get report ");
            
        });
    }

    render() {
        
        return <VendorReportView 
                    {...this.state} 
                    {...this.props} 
                    handlePeriodChange={this.handlePeriodChange}
                    // handleClick={this.handleClick}
                    // renderSummaryCards={this.renderSummaryCards}
                    populateData={this.populateData}
                    handleShow = {this.handleShow}
                
                />
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VendorReport);