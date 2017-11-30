import React, { Component } from 'react';
import { PageBlock } from '../Page';
import { TableSet } from '../Table';
import { Row } from '../Grid';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, Label } from '../Input';
import { Button } from '../Button';

class ReportTransactionList extends Component {
	constructor() {
		super();
		this.renderTransactionList = this.renderTransactionList.bind(this);
		this.state = {
			table: {
				columns: [
					{ accessor: 'menuName', title: 'Nama Menu' },
					{ accessor: 'transactionDate', title: 'Tanggal Transaksi' },
					{ accessor: 'memberName', title: 'Pembeli' },
					{ accessor: 'price', title: 'Total Harga', isCurrency: true },
					{ accessor: 'quantity', title: 'Jumlah', size: 'sm' }
				]
			}
		}
	}

	renderTransactionList = () => {
		const { table } = this.state;
		const {
			transactionList
		} = this.props;

		console.log(transactionList);

		return (
			<TableSet
				columns={table.columns}
				rows={transactionList}
				isStriped
				isHoverable
				hasPagination
				// hasSearchBar
				// onUpdate={handleServiceUpdate}
				// onDelete={handleServiceDelete}
				{...this.props}
			/>
		)
	}

	render() {
		const {
			report,
			period,
			transactionList
		} = this.props;

		console.log(transactionList);

		if(transactionList.length) {
			return (
				<PageBlock>
					<Form>
						<Row>
							<FormGroup className="margin-right-2">
								<InputGroup>
									<InputAddon>
										<small className="fw-semibold tt-uppercase ls-base">Dari</small>
									</InputAddon>
									<Input
										type="date"
										placeholder="Dari"
										className="margin-right-2"
										selected={period.start}
										dateFormat="DD/MM/YYYY"
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
										placeholder="Sampai"
										className="margin-right-2"
										selected={period.end}
										dateFormat="DD/MM/YYYY"
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup>
								<Button buttonTheme="secondary">
									<small className="fw-semibold tt-uppercase ls-base">Cari</small>
								</Button>
							</FormGroup>
						</Row>
					</Form>
					{this.renderTransactionList()}
				</PageBlock>
			);
		}

		return null;
	}
}

export default ReportTransactionList;
