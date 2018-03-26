import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VendorReportView } from '../VendorReport';
import { getVendorReportList } from '../../../actions/vendor.report.action';

import moment from 'moment';

function mapStateToProps(state) {
    
    return {

        vendorReportState : state.vendorReportState
    };
}

function mapDispatchToProps(dispatch) {

    return {
        getVendorReportState: () => dispatch(getVendorReportList())
    }
}

class VendorReport extends Component {

    constructor(){
        
        super();
        this.getVendorReportList = this.getVendorReportList.bind(this);
        // this.getGraphStatisticsMonth = this.getGraphStatisticsMonth.bind(this);
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.renderSummaryCards = this.renderSummaryCards.bind(this);
        
        super();
        this.state = {

            vendorReport : {},
            vendorReportList : {},
        	period: {
        		from: moment().add(-1, 'month'),
        		to: moment()
        	},
            type: '',
            company: '',
            scanning: false,
            results: [],
            tableMonth: {

                dataMonth:[]
            }
        }
    }

    componentDidMount = () => {

        this.getVendorReportList();
        // console.log(this.state);
    }

    getVendorReportList = () => {

        // console.log(this.props);
        const { getVendorReportState } = this.props;
        getVendorReportState();
    }

    handlePeriodChange = (type, date) => {
    	const { period } = this.state;

    	period[type] = date;
        this.forceUpdate();
        // console.log(this.state);
    }

    handleClick = (e) => {
        
        e.preventDefault();
  
    }

    //#
    componentDidUpdate = (prevProps) => {
        const { vendorReportState } = this.props;
        // console.log(this.props);
        
        if(prevProps.vendorReportState.summary !== vendorReportState.summary) {

            this.setState({
                ...this.state,
                vendorReportList: vendorReportState.summary
            }, () => {
                this.renderSummaryCards();;
            });
        }   
    }

    renderSummaryCards = () => {

        const {
            vendorReportState,

        } = this.props;

        const dataMonth = [];

        if(vendorReportState.summary.isLoaded) {

            let reportMonth = vendorReportState.summary.data.data.result;
            
            // Object.keys(reportMonth).map((month, i)=> {
            // console.log(month);
            //     dataMonth.push(month);
            // })

            // console.log(reportMonth);

            this.setState({
                ...this.state,
                tableMonth:{
                    ...this.state.tableMonth,
                    dataMonth:reportMonth
                }
            })
            console.log(this.state.tableMonth);

            // console.log(dataMonth);
        }
    }

    // getGraphStatisticsMonth = (data) => {
    //     const {
    //         action
    //     } = this.props;

    // 	let requiredData = {
    //         type: 'month',
    // 		start_date: data.period.from.format('YYYY-MM-DD'),
    // 		end_date: data.period.to.format('YYYY-MM-DD'),
    //         company: data.company
    // 	}

    // 	action.getDashboardGraphMonth(requiredData)
    //         .then(() => {
    //             console.log(this.props);
    //         });
    // }

    render() {
        return <VendorReportView 
                    {...this.state} 
                    {...this.props} 
                    handlePeriodChange={this.handlePeriodChange}
                    handleClick={this.handleClick}
                    // renderSummaryCards={this.renderSummaryCards}
                
                />
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VendorReport);