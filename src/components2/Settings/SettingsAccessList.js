import React, { Component } from 'react'
import { TableSet } from '../Table/index';

class SettingsAccessList extends Component {
    constructor(props) {
		super(props);
		this.state = {
			table: {
				columns: [
					{ accessor: 'name', title: 'Nama' },
				],
				settings: [
					{ name: 'Ubah', theme: 'primary', action: props.handleUpdateAccess },
					{ name: 'Status', isToggleable: true, activeText: 'Aktif', inactiveText: 'Non Aktif', action: props.handleChangeAccessStatus }
				],
				searchParams: [
					{ accessor: 'name', name: 'Nama Akses' }
				]
			}
		}
	}
    
    render () {
        const {
            table
        } = this.state;

        const {
            accessList,
            search
        } = this.props;
        
        return (
            <TableSet
                columns={table.columns}
                rows={accessList.data}
                settings={table.settings}
                placeholder="Cari akses level..."
                isStriped
                isHoverable
                hasPagination
                hasSearchBar
                searchParams={table.searchParams}
                searchBy={search.searchBy}
                {...this.props}
            />
        )
    }
}

export default SettingsAccessList