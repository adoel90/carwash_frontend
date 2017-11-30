import React, { Component } from 'react';
import { TableSet } from '../Table';

class SettingsServiceList extends Component {
	constructor() {
		super();
		this.state = {
			table: {
				columns: [
					{ accessor: 'name', title: 'Nama' },
					{ accessor: 'price', title: 'Harga', isCurrency: true }
				]
			}
		}
	}

	render() {
		const {
			service,
			serviceList,
			handleServiceUpdate,
			handleServiceDelete
		} = this.props;

		const {
			table,
		} = this.state;

		if(service.isFetching) {
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
				onDelete={handleServiceDelete}
				{...this.props}
			/>
		);
	}

}

export default SettingsServiceList;
