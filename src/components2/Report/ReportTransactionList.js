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
		this.renderDatePicker = this.renderDatePicker.bind(this);
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

	renderDatePicker = () => {
		const {
			period,
			handleDateChange,
			handleDateChangeRaw,
			handleSearchTransactionSubmit
		} = this.props;

		return (
			<Form onSubmit={handleSearchTransactionSubmit}>
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

	renderTransactionList = () => {
		const { table } = this.state;
		const {
			report,
			transactionList
		} = this.props;

		if(report.transaction.isFetching) {
			return <p>Tunggu sebentar, data sedang dimuat...</p>
		}

		if(report.transaction.isLoaded) {
			return (
				<TableSet
					columns={table.columns}
					rows={transactionList}
					isStriped
					isHoverable
					hasPagination
					{...this.props}
				/>
			)
		}
	}

	render() {
		const {
			report,
			period,
			transactionList
		} = this.props;

		return (
			<PageBlock>
				{this.renderDatePicker()}
				{this.renderTransactionList()}
			</PageBlock>
		);
	}
}

export default ReportTransactionList;
