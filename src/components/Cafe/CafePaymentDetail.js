import React, { Component } from 'react';
import { TableSet } from '../Table';

class CafePaymentDetail extends Component {
	constructor() {
		super();
		this.state = {
			table: {
				columns: [
					{ id: 1, accessor: 'name', title: 'Nama Menu' },
					{ id: 2, accessor: 'price', title: 'Harga (per satuan)', isCurrency: true },
					{ id: 3, accessor: 'quantity', title: 'Jumlah', size: 'small', isEditable: true },
					{ id: 4, accessor: 'totalPrice', title: 'Total Harga', isCurrency: true }
				]
			}
		}
	}

	render() {
		const { table } = this.state;
		const {
			selectedMenuList,
			grandTotalPrice
		} = this.props;

		return (
			<div className="payment-detail">
				<TableSet
					columns={table.columns}
					rows={selectedMenuList}
					isStriped
					isHoverable
					{...this.props}
				/>
				<h5>{grandTotalPrice}</h5>
			</div>
		);
	}

}

export default CafePaymentDetail;
