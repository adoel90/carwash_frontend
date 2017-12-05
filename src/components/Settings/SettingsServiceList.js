import React, { Component } from 'react';
import { TableSet } from '../Table';

class SettingsServiceList extends Component {
	constructor() {
		super();
		this.state = {
			table: {
				columns: [
					{ accessor: 'name', title: 'Nama' },
					{ accessor: 'price', title: 'Harga', isCurrency: true },
					{ accessor: 'status', title: 'Status', isStatus: true }
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
				placeholder="Cari service..."
				isStriped
				isHoverable
				hasPagination
				hasSearchBar
				onUpdate={handleServiceUpdate}
				onChangeStatus={handleChangeServiceStatus}
				// onDelete={handleServiceDelete}
				{...this.props}
			/>
		);
	}

}

export default SettingsServiceList;
