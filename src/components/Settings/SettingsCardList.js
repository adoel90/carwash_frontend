import React, { Component } from 'react';
import { TableSet } from '../Table';
import { PageBlock } from '../Page';

class SettingsCardList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			table: {
				columns: [
					{ accessor: 'name', title: 'Name' },
					{ accessor: 'min', title: 'Minimum', isCurrency: true },
					{ accessor: 'bonus', title: 'Bonus', isCurrency: true },
				],
				settings: [
					{ name: 'Ubah', theme: 'primary', action: props.handleCardTypeUpdate },
					{ isStatus: true, activeText: 'Aktif', inactiveText: 'Non Aktif', action: props.handleChangeCardTypeStatus }
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
				settings={table.settings}
				isStriped
				isHoverable
				hasPagination
				hasSearchBar
				placeholder="Cari tipe kartu..."
				{...this.props}
			/>
		)
	}

}

export default SettingsCardList;
