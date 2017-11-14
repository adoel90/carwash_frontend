import React, { Component } from 'react';

import { TableSet } from '../Table';
import { Button, ButtonGroup } from '../Button';

class SettingsMemberList extends Component {
	constructor() {
		super();
		this.state = {
			memberListTableData: [
				{ accessor: 'id', title: 'ID' },
				{ accessor: 'name', title: 'Nama Customer' },
				{ accessor: 'phone', title: 'Phone' },
				{ accessor: 'email', title: 'Alamat Email' },
				{ accessor: 'address', title: 'Alamat' }
			]
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
			memberList
		} = this.props;

		const {
			memberListTableData
		} = this.state;

		console.log(memberList);

		return (
			<TableSet
				columns={memberListTableData}
				rows={memberList}
				isStriped
				isHoverable
				hasPagination
			/>
		);
	}

}

export default SettingsMemberList;
