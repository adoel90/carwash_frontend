import React, { Component } from 'react';
import { TableSet } from '../Table';

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

	render() {
		const {
			selectedMenus
		} = this.props;

		const {
			table
		} = this.state;

		return (
			<TableSet
				columns={table.columns}
				rows={selectedMenus}
				isStriped
				isHoverable
				{...this.props}
			/>
		);
	}

}

export default CafePaymentDetail;
