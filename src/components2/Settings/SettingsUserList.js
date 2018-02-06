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
					{ id: 3, accessor: 'levelName', title: 'Level User' }
				],
				settings: [
					{ name: 'Ubah', theme: 'primary', action: props.handleUpdateUser },
					{ isToggleable: true, activeText: 'Aktif', inactiveText: 'Non Aktif', theme: 'danger', action: props.handleChangeUserStatus },
				],
				searchParams: [
					{ accessor: 'name', name: 'Nama User' },
					{ accessor: 'email', name: 'Alamat Email' },
				]
			}
		}
	}
	
	render() {
		const {
			table
		} = this.state;
		
		const {
			userList,
			search
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
				searchParams={table.searchParams}
				searchBy={search.searchBy}
				{...this.props}
			/>
		);
	}
}

export default SettingsUserList;