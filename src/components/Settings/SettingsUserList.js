import React, { Component } from 'react';

import { TableSet } from '../Table';

class SettingsUserList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			table: {
				columns: [
					{ id: 1, accessor: 'name', title: 'Nama' },
					{ id: 2, accessor: 'email', title: 'Alamat Email' },
					{ id: 3, accessor: 'levelName', title: 'Level Akses' }
				],
				settings: [
					{ name: 'Ubah', theme: 'primary', action: props.handleUpdateUser },
					{ isStatus: true, activeText: 'Aktif', inactiveText: 'Non Aktif', theme: 'danger', action: props.handleDeleteUser },
				],
				searchBy: 'name'
			}
		}
	}
	
	render() {
		const {
			table
		} = this.state;
		
		const {
			userList
		} = this.props;
		
		return (
			<TableSet
				columns={table.columns}
				rows={userList.data}
				settings={table.settings}
				placeholder="Cari member yang terdaftar..."
				isStriped
				isHoverable
				hasPagination
				hasSearchBar
				searchBy={table.searchBy}
				{...this.props}
			/>
		);
	}
}

export default SettingsUserList;