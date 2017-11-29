import React, { Component } from 'react';
import { PageBlock } from '../Page';
import { Card, CardList, CardHeading, CardBody } from '../Card';
import Currency from '../Currency';

class ReportSalesList extends Component {
	constructor() {
		super();
		this.renderSummaryCard = this.renderSummaryCard.bind(this);
	}

	renderSummaryCard = () => {
		const {
			report,
			reportSales
		} = this.props;

		let cards = [];

		for(const key of Object.keys(reportSales)) {
			cards.push(
				<div className="column-6 margin-bottom-3">
					<Card theme="secondary" className="clr-dark">
						<CardHeading>
							<h6 className="fw-semibold">{key}</h6>
						</CardHeading>
						<CardBody className="flex flex-column align-items--center">
							<h4 className="fw-semibold">
								<Currency value={reportSales[key].total} />
							</h4>
						</CardBody>
					</Card>
				</div>
			)
		}

		return cards;
	}

	render() {
		return (
			<PageBlock>

				<CardList>
					{this.renderSummaryCard()}
				</CardList>
			</PageBlock>
		);
	}

}

export default ReportSalesList;
