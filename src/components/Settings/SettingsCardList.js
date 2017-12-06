import React, { Component } from 'react';
import { TableSet } from '../Table';
import { PageBlock } from '../Page';

class SettingsCardList extends Component {
	constructor() {
		super();
		this.state = {
			table: {
				columns: [
					{ accessor: 'name', title: 'Name' },
					{ accessor: 'min', title: 'Minimum', isCurrency: true },
					{ accessor: 'bonus', title: 'Bonus', isCurrency: true },
					// { accessor: 'status', title: 'Status', isStatus: true }
				]
			}
		}
	}

	render() {
		const {
			table
		} = this.state;

		const {
			cardTypes,
			handleCardTypeUpdate,
			handleCardTypeDelete,
			handleChangeCardTypeStatus
		} = this.props;

		return (
			<TableSet
				columns={table.columns}
				rows={cardTypes}
				isStriped
				isHoverable
				hasPagination
				hasSearchBar
				placeholder="Cari tipe kartu..."
				onUpdate={handleCardTypeUpdate}
				onChangeStatus={handleChangeCardTypeStatus}
				// onDelete={handleCardTypeDelete}
				{...this.props}
			/>
		)
	}

}

export default SettingsCardList;
