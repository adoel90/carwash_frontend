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
	}

	componentDidUpdate = () => {
		const {
			selectedMenus,
			calculateGrandTotal
		} = this.props;

		calculateGrandTotal();
	}

	render() {
		const {
			selectedMenus,
			grandTotal
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
							value={grandTotal}
						/>
					</h4>
				</div>
			</div>
		);
	}

}

export default CafePaymentDetail;
