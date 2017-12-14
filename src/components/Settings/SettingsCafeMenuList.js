import React, { Component } from 'react';
import { TableSet } from '../Table';

class SettingsCafeMenuList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			table: {
				columns: [
					{ accessor: 'name', title: 'Name' },
					{ accessor: 'price', title: 'Price', isCurrency: true },
				],
				settings: [
					{ name: 'Ubah', theme: 'primary', action: props.handleCafeMenuUpdate },
					{ isStatus: true, activeText: 'Aktif', inactiveText: 'Non Aktif', action: props.handleChangeCafeMenuStatus }
				]
			}
		}
	}

	render() {
		const {
			cafeList,
			handleCafeMenuUpdate,
			handleChangeCafeMenuStatus,
			handleCafeMenuDelete
		} = this.props;

		const {
			table
		} = this.state;

		return (
			<TableSet
				columns={table.columns}
				rows={cafeList}
				settings={table.settings}
				placeholder="Cari menu..."
				isStriped
				isHoverable
				hasPagination
				hasSearchBar
				{...this.props}
			/>
		);
	}

}

export default SettingsCafeMenuList;
