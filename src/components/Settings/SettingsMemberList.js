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

	// renderTableRows = (member, i) => {
	// 	const {
	// 		toggleModal,
	// 		handleUpdateMember,
	// 		handleDeleteMember
	// 	} = this.props;
	//
	// 	return (
	// 		<tr>
	// 			<td>{member.id}</td>
	// 			<td>{member.name}</td>
	// 			<td>{member.email}</td>
	// 			<td>{member.address}</td>
	// 			<td>{member.phone}</td>
	// 			<td className="td--fixed">
	// 				<ButtonGroup>
	// 					<Button type="button" buttonTheme="secondary" buttonSize="small" className="clr-dark" onClick={() => handleUpdateMember(member)}>
	// 						<i className="fi flaticon-edit icon margin-right-2"></i>
	// 						<small className="fw-semibold tt-uppercase ls-base">Ubah</small>
	// 					</Button>
	// 					<Button type="button" buttonTheme="danger" buttonSize="small" className="clr-light" onClick={handleDeleteMember}>
	// 						<small className="fw-semibold tt-uppercase ls-base">Hapus</small>
	// 					</Button>
	// 				</ButtonGroup>
	// 			</td>
	// 		</tr>
	// 	)
	// }

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
				onUpdate={handleUpdateMember}
				onDelete={handleDeleteMember}
			/>
		);
	}

}

export default SettingsMemberList;
