import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VendorReportView } from '../VendorReport';
import { getVendorReportList } from '../../../actions/vendor.report.action';
import NumberFormat from 'react-number-format';

import moment from 'moment';

function mapStateToProps(state) {
    
    return {

        vendorReportState : state.vendorReportState
    };
}

function mapDispatchToProps(dispatch) {

    return {
        getVendorReportState: (object) => dispatch(getVendorReportList(object))
    }
}

class VendorReport extends Component {

    constructor(){
        
        super();
        this.getVendorReportList = this.getVendorReportList.bind(this);
        // this.getGraphStatisticsMonth = this.getGraphStatisticsMonth.bind(this);
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
        // this.handleClick = this.handleClick.bind(this);
        // this.renderSummaryCards = this.renderSummaryCards.bind(this);
        this.populateData = this.populateData.bind(this);
        this.handleShow = this.handleShow.bind(this);
    
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
                start_date:'',
                end_date:'',
                
            }
        }
    }

    componentDidMount = () => {
        const {requiredData } = this.state;
        this.getVendorReportList(requiredData);

    }

    getVendorReportList = (object) => {

        const { getVendorReportState } = this.props;
        
        const {period, requiredData} = this.state;

        let requiredDataMonth = {
            type: 'month',
    		start_date: period.from.format('YYYY-MM-DD'),
    		end_date: period.to.format('YYYY-MM-DD'),
            // company: companyVal
        }

        getVendorReportState(requiredDataMonth);

    }

    //#
    componentDidUpdate = (prevProps) => {
        const { vendorReportState } = this.props;
        
        if(prevProps.vendorReportState.summary !== vendorReportState.summary) {

            this.setState({
                ...this.state,
                vendorReportList: vendorReportState.summary
            }, () => {
                this.populateData();
            });
        }         
    }

    populateData = () => {

        const {
            vendorReportList
        } = this.state;

        // console.log(this.state.vendorReportList);
        const vendorReportListResults = []; 

        if(vendorReportList.isLoaded) {
            vendorReportList.data.data.result.map((data, i)=>{

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
        // console.log(this.state);
    }

    handleShow = () => {
        // console.log(this.props);
        // console.log(this.state);

        const {period,vendorReportList} = this.state;


        const requiredDataMonth = {
            type: 'month',
    		start_date: period.from.format('YYYY-MM-DD'),
    		end_date: period.to.format('YYYY-MM-DD'),
            // company: companyVal
        }        
        // this.setState({
        //     ...this.state,
        //     requiredData:{
    
        //         ...this.state,
        //         dataRequire:requiredDataMonth
        //     }
        // });

        console.log(this.state);
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