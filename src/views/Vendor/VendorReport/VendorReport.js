import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VendorReportView } from '../VendorReport';
import { getStoreReportList } from '../../../actions/vendor.report.action';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { getStoreList } from '../../../actions/vendor.action';

function mapStateToProps(state) {
    return {

        vendorReportState : state.vendorReportState
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
            storeReportMonth: {}
        }
    }

    componentDidMount = () => {
        const {requiredData } = this.state;
        this.getStoreReportList(requiredData);
        this.getStoreList();

        // console.log(this.state);
    }

    getStoreReportList = (object) => {

        const { getStoreReportDispatch } = this.props;
        const {period, requiredData} = this.state;

        let requiredDataMonth = {
            type: 'month',
    		start_date: period.from.format('YYYY-MM-DD'),
    		end_date: period.to.format('YYYY-MM-DD')
        }

        getStoreReportDispatch(requiredDataMonth);

    }

    //Get Store List
    getStoreList = ()=> {
        const { getStoreListDispatch } = this.props;
        getStoreListDispatch();
    }

    //#
    componentDidUpdate = (prevProps) => {
        const { vendorReportState } = this.props;
        
        if(prevProps.vendorReportState.summary !== vendorReportState.summary) {

            console.log(this.state);
            
            this.setState({
                ...this.state,
                storeReportMonth: vendorReportState.summary
            }, () => {
                this.populateData();
            });
        }         
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

        const {period,storeReportMonth} = this.state;
        const { getStoreReportDispatch } = this.props;

        const requiredDataMonth = {

            type: 'month',
    		start_date: period.from.format('YYYY-MM-DD'),
    		end_date: period.to.format('YYYY-MM-DD')
        }

        console.log(requiredDataMonth);
        // FIRE dispatch in here !!!
        getStoreReportDispatch(requiredDataMonth).then(()=> {
            console.log("Hai hai ");
            
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