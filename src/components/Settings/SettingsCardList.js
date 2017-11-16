import React, { Component } from 'react';
import { TableSet } from '../Table';
import { PageBlock } from '../Page';

class SettingsCardList extends Component {
	constructor() {
		super();
		this.state = {
			table: {
				columns: [
					{ accessor: 'id', title: 'ID' },
					{ accessor: 'name', title: 'Name' },
					{ accessor: 'min', title: 'Minimum (dalam Rp)' },
					{ accessor: 'bonus', title: 'Bonus (dalam Rp)' },
				]
			}
		}
	}

	render() {
		const {
			table
		} = this.state;

		const {
			cardList,
			handleCardTypeUpdate,
			handleCardTypeDelete
		} = this.props;

		return (
			<TableSet
				columns={table.columns}
				rows={cardList}
				isStriped
				isHoverable
				hasPagination
				onUpdate={handleCardTypeUpdate}
				onDelete={handleCardTypeDelete}
			/>
		)
	}

}

export default SettingsCardList;
