import React, { Component } from 'react';
import { TableSet } from '../Table';
import Currency from '../Currency';

class CafePaymentDetail extends Component {
	constructor() {
		super();
		this.state = {
			table: {
				columns: [
					{ accessor: 'name', title: 'Nama Menu' },
					{ accessor: 'quantity', title: 'Jumlah', editable: true },
					{ accessor: 'price', title: 'Price (per item)' },
					{ accessor: 'totalPrice', title: 'Total Price' }
				]
			}
		}

		this.calculateGrandTotal = this.calculateGrandTotal.bind(this);
	}

	calculateGrandTotal = () => {
		const {
			selectedMenus
		} = this.props;

		let priceArray = [];

		selectedMenus.map((menu, i) => {
			priceArray.push(menu.totalPrice);
		})

		let sum = priceArray.reduce((a, b) => {
			return a + b;
		})

		return sum;
	}

	render() {
		const {
			selectedMenus
		} = this.props;

		const {
			table
		} = this.state;

		return (
			<div>
				<TableSet
					columns={table.columns}
					rows={selectedMenus}
					isStriped
					isHoverable
					{...this.props}
				/>
				<div className="flex flex-column align-items--flex-end">
					<small className="fw-semibold tt-uppercase ls-base clr-passive">Total yang harus dibayar</small>
					<h4 className="fw-semibold clr-primary">
						<Currency
							value={this.calculateGrandTotal()}
						/>
					</h4>
				</div>
			</div>
		);
	}

}

export default CafePaymentDetail;
