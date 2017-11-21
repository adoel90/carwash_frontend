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
				hasSearchBar
				onUpdate={handleCardTypeUpdate}
				onDelete={handleCardTypeDelete}
				{...this.props}
			/>
		)
	}

}

export default SettingsCardList;
