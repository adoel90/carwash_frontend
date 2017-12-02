import React, { Component } from 'react';

import { TableSet } from '../Table';
import { Button, ButtonGroup } from '../Button';

class SettingsMemberList extends Component {
	constructor() {
		super();
		this.state = {
			memberListTable: {
				data: [
					{ accessor: 'name', title: 'Nama' },
					{ accessor: 'phone', title: 'Phone' },
					{ accessor: 'address', title: 'Alamat' },
					{ accessor: 'cardType', title: 'Tipe Member' }
				]
			}
		}
	}

	render() {
		const {
			memberList,
			handleViewMemberDetail,
			handleUpdateMember,
			handleDeleteMember,
			handleChangeMemberStatus
		} = this.props;

		const {
			memberListTable
		} = this.state;

		return (
			<TableSet
				columns={memberListTable.data}
				rows={memberList}
				placeholder="Cari member yang terdaftar..."
				isStriped
				isHoverable
				hasPagination
				hasSearchBar
				onRowClick={handleViewMemberDetail}
				onUpdate={handleUpdateMember}
				onChangeStatus={handleChangeMemberStatus}
				{...this.props}
			/>
		);
	}

}

export default SettingsMemberList;
