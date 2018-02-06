import React, { Component } from 'react';
import { TableSet } from '../Table';

class SettingsMemberTransactionDetail extends Component {
	constructor() {
		super();
		this.state = {
			table: {
				columns: [
					{ accessor: 'date', title: 'Date' },
					{ accessor: 'type', title: 'Tipe Transaksi' }
				]
			}
		}
	}

	render() {
		const {
			table
		} = this.state;

		const {
			member,
			selectedMember
		} = this.props;

		if(selectedMember.transaction.length) {
			return (
				<TableSet
					columns={table.columns}
					rows={selectedMember.transaction}
					isStriped
					isHoverable
					hasPagination
					{...this.props}
				/>
			)
		}
		else {
			return <p style={{padding: '15px'}} className="ta-center clr-passive">Member ini belum pernah melakukan transaksi apapun.</p>
		}
	}
}

export default SettingsMemberTransactionDetail;
