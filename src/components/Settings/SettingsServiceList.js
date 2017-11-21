import React, { Component } from 'react';
import { TableSet } from '../Table';

class SettingsServiceList extends Component {
	constructor() {
		super();
		this.state = {
			table: {
				columns: [
					{ accessor: 'name', title: 'Name' },
					{ accessor: 'price', title: 'Price', isCurrency: true }
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


		return (
			<TableSet
				columns={table.columns}
				rows={serviceList}
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
