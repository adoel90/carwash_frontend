import React, { Component } from 'react';
import { TableSet } from '../Table';

class SettingsServiceList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			table: {
				columns: [
					{ accessor: 'name', title: 'Nama' },
					{ accessor: 'price', title: 'Harga', isCurrency: true }
				],
				settings: [
					{ name: 'Ubah', theme: "primary", action: props.handleServiceUpdate },
					{ isStatus: true, activeText: 'Aktif', inactiveText: 'Non Aktif', action: props.handleChangeServiceStatus }
				]
			}
		}
	}

	render() {
		const {
			service,
			serviceList,
			handleServiceUpdate,
			handleServiceDelete,
			handleChangeServiceStatus
		} = this.props;

		const {
			table,
		} = this.state;

		if(service.list.isFetching) {
			return <p>Sedang memuat. Silahkan tunggu sebentar...</p>
		}

		return (
			<TableSet
				columns={table.columns}
				rows={serviceList}
				settings={table.settings}
				placeholder="Cari service..."
				isStriped
				isHoverable
				hasPagination
				hasSearchBar
				{...this.props}
			/>
		);
	}

}

export default SettingsServiceList;
