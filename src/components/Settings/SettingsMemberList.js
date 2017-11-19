import React, { Component } from 'react';

import { TableSet } from '../Table';
import { Button, ButtonGroup } from '../Button';

class SettingsMemberList extends Component {
	constructor() {
		super();
		this.state = {
			memberListTable: {
				data: [
					{ accessor: 'id', title: 'ID' },
					{ accessor: 'name', title: 'Nama Customer' },
					{ accessor: 'email', title: 'Alamat Email' },
					{ accessor: 'address', title: 'Alamat' },
					{ accessor: 'phone', title: 'Phone' }
				]
			}
		}
	}

	render() {
		const {
			memberList,
			handleUpdateMember,
			handleDeleteMember
		} = this.props;

		const {
			memberListTable
		} = this.state;

		return (
			<TableSet
				columns={memberListTable.data}
				rows={memberList}
				isStriped
				isHoverable
				hasPagination
				hasSearchBar
				onUpdate={handleUpdateMember}
				onDelete={handleDeleteMember}
				{...this.props}
			/>
		);
	}

}

export default SettingsMemberList;
