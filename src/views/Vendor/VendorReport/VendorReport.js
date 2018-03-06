import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VendorReportView } from '../VendorReport';
import { getVendorReportList } from '../../../actions/vendor.report.action';


import {
	Container, Row, Col,
	Card, CardBody, CardTitle, CardText, CardSubtitle, CardDeck, CardFooter,
	Form, FormGroup, Input, InputGroup, InputGroupAddon, Button,
	Table
} from 'reactstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,LineChart, Line } from 'recharts';
import NumberFormat from 'react-number-format';

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
                this.renderSummaryCards();
            });
        }   
    }

    renderSummaryCards = () => {

        const {
            vendorReportState,

        } = this.props;

        // const priceFormatter = function (data) {
        //     return `$ ${parseFloat(data).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        // };

        const dataMonth = {};

        if(vendorReportState.summary.isLoaded) {

            let reportMonth = vendorReportState.summary.data.data.result;
            
            // Object.keys(reportMonth).map((month, i)=> {
            // console.log(month);
            //     dataMonth.push(month);
            // })

            // console.log(reportMonth);

            this.setState({
                ...this.state,
                // results: reportMonth
                vendorReportList: {
                    ...this.state.vendorReportList,
                        data:{
                            ...this.state.vendorReportList.data,
                            data:{
                                ...this.state.vendorReportList.data.data
                            }
                        }
                }
            })
            console.log(this.state.vendorReportList);
        }

        return(
			<CardBody>
				<CardTitle className="font-weight-bold mb-2">Month</CardTitle>
				<ResponsiveContainer width='100%' aspect={7.0/3.0}>
					<BarChart
						// data={dashboard.graph.dataMonth}
						data={vendorReportState.summary.data.data}
						margin={{top: 5, right: 30, left: 20, bottom: 5}}
					>
						<XAxis dataKey="name"/>
						<YAxis
							type="number"
							// tickFormatter={priceFormatter}
							allowDecimal={true}
							width={100}
						/>
						<CartesianGrid strokeDasharray="3 3"/>
						{/* <Tooltip formatter={priceFormatter}/> */}
						<Legend />
						<Bar dataKey="transaction" fill="#52c467" />
						
					</BarChart>
				</ResponsiveContainer>
			</CardBody>
		)
    }

   

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