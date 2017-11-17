import React, { Component } from 'react';
import { TableSet } from '../Table';

class SettingsCafeMenuList extends Component {
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
			cafeList,
			handleCafeMenuUpdate,
			handleCafeMenuDelete
		} = this.props;

		const {
			table
		} = this.state;

		return (
			<TableSet
				columns={table.columns}
				rows={cafeList}
				isStriped
				isHoverable
				hasPagination
				onUpdate={handleCafeMenuUpdate}
				onDelete={handleCafeMenuDelete}
			/>
		);
	}

}

export default SettingsCafeMenuList;
