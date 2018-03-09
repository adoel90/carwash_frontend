import React from 'react';
import classNames from 'classnames';
import {
	Container, Row, Col,
	Card, CardBody, CardTitle, CardText, CardSubtitle, CardDeck, CardFooter,
	Form, FormGroup, Input, InputGroup, InputGroupAddon, Button,
	Table
} from 'reactstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import NumberFormat from 'react-number-format';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class Dashboard extends React.Component {
	constructor() {
		super();
		this.renderSummaryCards = this.renderSummaryCards.bind(this);
		// this.renderGraphCardsMonth = this.renderGraphCardsMonth.bind(this);
		// this.renderGraphCards = this.renderGraphCards.bind(this);

	}

	renderSummaryCards = () => {
		const {
			// dashboard,
			vendorReportList,
			vendorReportState
			// company,
			// handleClickCompany
		} = this.props;

		// let companyVal = company ? company : null;

		// if(dashboard.summary.isLoaded) {
		// if(vendorReportState.summary.isLoaded) {

		// 	console.log(vendorReportState);
			
		// 	let summary = dashboard.summary.data;

		// 	return Object.keys(summary).map((summaryName, i) => {
		// 		return (
		// 			<Card color="white">
		// 				<CardBody>
		// 					<CardTitle
		// 						className={ companyVal === summary[summaryName].id ? `bg-green text-white rounded p-3` : `bg-sky-blue text-white rounded p-3` }
		// 						onClick={() => handleClickCompany(summary[summaryName].id)}
		// 					>
		// 						{summaryName}
		// 					</CardTitle>
		// 					<CardText>
		// 						<Row className="py-2">
		// 							<Col>Transaction</Col>
		// 							<Col className="font-weight-bold text-right">
		// 								$ { parseFloat(summary[summaryName].revenue).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }
		// 							</Col>
		// 						</Row>
								
		// 					</CardText>
		// 				</CardBody>
		// 			</Card>
		// 		)
		// 	})

		// }
	}

	renderGraphCards = () => {
		return (
			<div className="w-100">
				<Card className="mt-4">
					{ this.renderGraphCardsMonth() }
				</Card>
			</div>
		)
	}

	

	renderGraphCardsMonth = () => {
		const {
			dashboard,
			vendorReportState,
			vendorReportList
		} = this.props;

		// console.log(this.props);

		// const priceFormatter = function (data) {
        //     return `$ ${parseFloat(data).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        // };

		// return(
		// 	<CardBody>
		// 		<CardTitle className="font-weight-bold mb-2">Month</CardTitle>
		// 		<ResponsiveContainer width='100%' aspect={7.0/3.0}>
		// 			<BarChart
		// 				data={vendorReportState.summary}
		// 				// data={vendorReportList.data.data.result}
		// 				margin={{top: 5, right: 30, left: 20, bottom: 5}}
		// 			>
		// 				<XAxis dataKey="name"/>
		// 				<YAxis
		// 					type="number"
		// 					tickFormatter={priceFormatter}
		// 					allowDecimal={true}
		// 					width={100}
		// 				/>
		// 				<CartesianGrid strokeDasharray="3 3"/>
		// 				<Tooltip formatter={priceFormatter}/>
		// 				<Legend />
		// 				<Bar dataKey="transaction" fill="#52c467" />
	
		// 			</BarChart>
		// 		</ResponsiveContainer>
		// 	</CardBody>
		// )
	}


	render() {
		const {
			period,
			vendorReportList,
			vendorReportState,
			// dashboard,
			handlePeriodChange,
			handleShow
		} = this.props;

		return (
			<Container className="my-4">
				<Row className="my-4">
					<Form inline>
						<p className="font-weight-bold pr-4">Period Range</p>
						<FormGroup>
							<DatePicker
								className="form-control"
								dateFormat="DD MMM YYYY"
								textPlaceholder="Start Date"
								selected={period.from}
								onChange={(date) => handlePeriodChange('from', date)}
							/>
						</FormGroup>
						<p className="px-2">to</p>
						<FormGroup>
							<DatePicker
								className="form-control"
								dateFormat="DD MMM YYYY"
								textPlaceholder="End Date"
								minDate={period.from}
								selected={period.to}
								onChange={(date) => handlePeriodChange('to', date)}
							/>
						</FormGroup>
						<FormGroup>
							<Button
		                        className="btn-sky-blue btn-size ml-3"
		                        color="info"
								onClick={handleShow}
		                    >
		                        Show
		                    </Button>
						</FormGroup>

					</Form>
				</Row>
				<CardDeck className="mt-4">
					{/* { dashboard.summary.isLoaded ? this.renderSummaryCards() : null } */}
					{/* { vendorReportState.summary.isLoaded ? this.renderSummaryCards() : null } */}
				</CardDeck>

				<CardDeck>
					{ this.renderGraphCards() }
				</CardDeck>
			</Container>
		)
	}
}

export default Dashboard;