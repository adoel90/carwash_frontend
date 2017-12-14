import React, { Component } from 'react';

import { TableSet } from '../Table';
import { Button, ButtonGroup } from '../Button';

class SettingsMemberList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			table: {
				columns: [
					{ accessor: 'name', title: 'Nama' },
					{ accessor: 'email', title: 'Alamat Email' },
					{ accessor: 'cardType', title: 'Tipe Member', size: 'auto' }
				],
				settings: [
					{ name: 'Ubah', theme: 'primary', action: props.handleUpdateMember },
					{ isStatus: true, activeText: 'Aktif', inactiveText: 'Non Aktif', action: props.handleChangeMemberStatus }
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
			table
		} = this.state;

		return (
			<TableSet
				columns={table.columns}
				rows={memberList}
				settings={table.settings}
				onRowClick={handleViewMemberDetail}
				placeholder="Cari member yang terdaftar..."
				isStriped
				isHoverable
				hasPagination
				hasSearchBar
				{...this.props}
			/>
		);
	}

}

export default SettingsMemberList;
