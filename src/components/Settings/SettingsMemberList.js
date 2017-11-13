import React, { Component } from 'react';

import { Table, TableHeading, TableBody } from '../Table';
import { Button, ButtonGroup } from '../Button';

class SettingsMemberList extends Component {
	constructor() {
		super();
		this.renderTableRows = this.renderTableRows.bind(this);
	}

	handleUpdateMember = (data) => {
		console.log(data);
	}

	renderTableRows = (member, i) => {
		const {
			toggleModal,
			handleUpdateMember,
			handleDeleteMember
		} = this.props;

		return (
			<tr>
				<td>{member.id}</td>
				<td>{member.name}</td>
				<td>{member.email}</td>
				<td>{member.address}</td>
				<td>{member.phone}</td>
				<td className="td--fixed">
					<ButtonGroup>
						<Button type="button" buttonTheme="secondary" buttonSize="small" className="clr-dark" onClick={() => handleUpdateMember(member)}>
							<i className="fi flaticon-edit icon margin-right-2"></i>
							<small className="fw-semibold tt-uppercase ls-base">Ubah</small>
						</Button>
						<Button type="button" buttonTheme="danger" buttonSize="small" className="clr-light" onClick={handleDeleteMember}>
							<small className="fw-semibold tt-uppercase ls-base">Hapus</small>
						</Button>
					</ButtonGroup>
				</td>
			</tr>
		)
	}

	render = () => {
		const {
			member,
			memberList
		} = this.props;

		return (
			<Table striped>
				<TableHeading theme="primary">
					<tr>
						<th className="th--auto">ID</th>
						<th className="th--large">Nama Member</th>
						<th>Alamat E-mail</th>
						<th className="th--large">Alamat</th>
						<th>Nomor Telepon</th>
						<th>Action</th>
					</tr>
				</TableHeading>
				<TableBody>
					{ memberList.map(this.renderTableRows) }
				</TableBody>
			</Table>
		);
	}

}

export default SettingsMemberList;
