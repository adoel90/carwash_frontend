import React, { Component } from 'react';
import { PageBlock } from '../Page';
import { Card, CardList, CardHeading, CardBody } from '../Card';
import { Chart } from '../Chart';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon } from '../Input';
import { Button } from '../Button';
import { Container, Row } from '../Grid';
import Currency from '../Currency';

class ReportSalesList extends Component {
	render() {
		const {
			report,
			period,
			salesData,
			chartData,
			chartOptions,
			handleSearchSalesSubmit,
			handleDateChange
		} = this.props;

		const renderDatePicker = () => {
			return (
				<Form onSubmit={handleSearchSalesSubmit}>
					<div className="flex">
						<FormGroup className="margin-right-2">
							<InputGroup>
								<InputAddon>
									<small className="fw-semibold tt-uppercase ls-base">Dari</small>
								</InputAddon>
								<Input
									type="date"
									name="start"
									placeholder="Dari"
									className="margin-right-2"
									selected={period.start}
									dateFormat="DD/MM/YYYY"
									onChange={(date) => handleDateChange('start', date)}
								/>
							</InputGroup>
						</FormGroup>
						<FormGroup className="margin-right-2">
							<InputGroup>
								<InputAddon>
									<small className="fw-semibold tt-uppercase ls-base">Sampai</small>
								</InputAddon>
								<Input
									type="date"
									name="end"
									placeholder="Sampai"
									className="margin-right-2"
									selected={period.end}
									dateFormat="DD/MM/YYYY"
									onChange={(date) => handleDateChange('end', date)}
								/>
							</InputGroup>
						</FormGroup>
						<FormGroup>
							<Button buttonTheme="secondary">
								<small className="fw-semibold tt-uppercase ls-base">Cari</small>
							</Button>
						</FormGroup>
					</div>
				</Form>
			)
		}
		
		const renderSalesLineChart = () => {
			if(salesData.isFetching) {
				return <p>Tunggu sebentar...</p>
			}
			
			return <Chart type="line" chartData={chartData} options={chartOptions} width="600" height="250" />
		}

		const renderSummaryCard = () => {
			if(salesData.isFetching) {
				return null
			}
			
			return (
				<Card theme="secondary">
					<CardHeading className="ta-left">
						<h6>
							<i className="ion-bag margin-right-2"></i>
							Total Penjualan
						</h6>
					</CardHeading>
					<CardBody>
						{ salesData.isLoaded ? <h3><Currency value={salesData.data.Overall.total} /></h3> : <p>Tunggu sebentar...</p> }
					</CardBody>
				</Card>
			)

		}
		
		return (
			<PageBlock>
				{ renderDatePicker() }
				<Row>
					<div className="column-4">
						{ renderSummaryCard() }
					</div>
				</Row>
				{ renderSalesLineChart() }
			</PageBlock>
		);
	}

}

export default ReportSalesList;


// renderSummaryCard = () => {
// 	const {
// 		report,
// 		reportSales
// 	} = this.props;

// 	let cards = [];

// 	for(const key of Object.keys(reportSales)) {
// 		cards.push(
// 			<div className="column-6 margin-bottom-3">
// 				<Card theme="secondary" className="clr-dark">
// 					<CardHeading>
// 						<h6 className="fw-semibold">{key}</h6>
// 					</CardHeading>
// 					<CardBody className="flex flex-column align-items--center">
// 						<h4 className="fw-semibold">
// 							<Currency value={reportSales[key].total} />
// 						</h4>
// 					</CardBody>
// 				</Card>
// 			</div>
// 		)
// 	}

// 	return cards;
// }
