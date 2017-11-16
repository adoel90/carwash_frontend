import React, { Component } from 'react';
import { TableSet } from '../Table';

class SettingsServiceList extends Component {
	constructor() {
		super();
		this.state = {
			table: {
				columns: [
					{ accessor: 'name', title: 'Name' },
					{ accessor: 'price', title: 'Price' },
					{ accessor: 'description', title: 'Description' },
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
				onUpdate={handleServiceUpdate}
				onDelete={handleServiceDelete}
			/>
		);
	}

}

export default SettingsServiceList;
