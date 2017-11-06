import React from 'react';

import { connect } from 'react-redux';
import { getMemberList } from '../../actions/member.action';

import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, Label } from '../Input';
import SearchBar from '../SearchBar';
import Button from '../Button';

import { PageBlock } from '../Page';
import { Table } from 'reactstrap';

class SettingsMember extends React.Component {
	constructor() {
		super();
		this.state = {
			tableHeadings: [
				{ id: 1, name: 'Nama Customer' },
				{ id: 2, name: 'Alamat E-mail' },
				{ id: 3, name: 'Alamat' },
				{ id: 4, name: 'No. Telepon' },
				{ id: 5, name: 'Tipe Member' },
				{ id: 6, name: 'Action' }
			],
			selectedMember: {
				name: '',
				email: '',
				phone: '',
				address: ''
			},
			searchVal: '',
			isActionModalOpen: false
		}

		this.renderTableHeadings = this.renderTableHeadings.bind(this);
		this.renderMemberList = this.renderMemberList.bind(this);
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.renderActionModal = this.renderActionModal.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange = (e) => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checkbox : target.value;
		const name = target.name;

		this.setState({
			selectedMember: {
				...this.state.selectedMember,
				[name]: e.target.values
			}
		})
	}

	toggleActionModal = (data) => {
		const { isActionModalOpen } = this.state;

		this.setState({
			selectedMember: {
				name: data ? data.name : '',
				email: data ? data.email : '',
				phone: data ? data.phone : '',
				address: data ? data.address : ''
			}
		});


		this.setState({
			isActionModalOpen: !isActionModalOpen
		})
	}

	handleSearchChange = (e) => {
		this.setState({
			searchVal: e.target.value
		})
	}

	handleSearchSubmit = (e) => {
		e.preventDefault();

		const requiredData = {
			member: this.state.searchVal,
			limit: 10,
			offset: 0
		}
	}

	renderMemberList = (member, i) => {
		return (
			<tr key={i}>
				<td>{member.name}</td>
				<td>{member.email}</td>
				<td>{member.address}</td>
				<td>{member.phone}</td>
				<td>{member.card.type.name}</td>
				<td>
					<Button type="button" buttonTheme="secondary" buttonSize="small" onClick={this.toggleActionModal.bind(this, member)}>
						<small className="fw-semibold tt-uppercase ls-base">Ubah</small>
					</Button>
				</td>
			</tr>
		)
	}

	renderTableHeadings = (heading, i) => {
		return (
			<th>{heading.name}</th>
		)
	}

	renderActionModal = () => {
		const { selectedMember } = this.state;

		return (
			<Modal isOpen={this.state.isActionModalOpen} toggle={this.toggleActionModal}>
				<ModalHeader>
					<h6 className="fw-semibold">Ubah Data Member</h6>
				</ModalHeader>
				<ModalContent>
					<Form onSubmit={this.handleActionSubmit}>
						<FormGroup>
							<Label>
								<p className="fw-semibold">Nama Customer</p>
							</Label>
							<Input name="name" type="text" placeholder="Masukkan Nama Customer" defaultValue={selectedMember.name} onChange={this.handleChange} selectOnFocus autofocus="true" />
						</FormGroup>
						<FormGroup>
							<Label>
								<p className="fw-semibold">Alamat Email</p>
							</Label>
							<Input name="email" type="text" placeholder="Masukkan Alamat Email" defaultValue={selectedMember.email} onChange={this.handleChange} selectOnFocus />
						</FormGroup>
						<FormGroup>
							<Label>
								<p className="fw-semibold">Nomor Telepon</p>
							</Label>
							<Input name="phone" type="text" placeholder="Masukkan Nomor Telepon" defaultValue={selectedMember.phone} onChange={this.handleChange} selectOnFocus />
						</FormGroup>
						<FormGroup>
							<Label>
								<p className="fw-semibold">Alamat</p>
							</Label>
							<Input name="address" type="textarea" row="4" placeholder="Masukkan Alamat" defaultValue={selectedMember.address} onChange={this.handleChange} selectOnFocus />
						</FormGroup>
					</Form>
				</ModalContent>
				<ModalFooter>
					<Button buttonTheme="primary" buttonSize="small" buttonFull>
						<small className="fw-semibold tt-uppercase ls-base">Ubah</small>
					</Button>
				</ModalFooter>
			</Modal>
		)
	}

	render() {
		const { member } = this.props;
		const { searchVal, selectedMember } = this.state;

		return (
			<div className="inner-view">
				<div className="padding-bottom-2">
					<h5 className="fw-semibold">Daftar Member</h5>
					{/* <p className="clr-passive">Masukkan data customer baru dengan benar dan lengkap. Seluruh kolom harus diisi.</p> */}
				</div>
				<div className="padding-bottom-2">
					<SearchBar
						onSubmit={this.handleSearchSubmit}
						onChange={this.handleSearchChange}
						placeholder="Cari member..."
						value={searchVal}
					/>
				</div>
				<Table>
					<thead>
						<tr>
							{ this.state.tableHeadings.map(this.renderTableHeadings) }
						</tr>
					</thead>
					<tbody>
						{ member.memberList ? member.memberList.member.map(this.renderMemberList) : <p>Sedang dimuat...</p> }
					</tbody>
				</Table>
				{ selectedMember ? this.renderActionModal() : null }
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		member: state.member
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const { accessToken } = ownProps;
	const requiredData = {
		limit: 10,
		offset: 0
	}

	return {
		getMemberList: dispatch(getMemberList(requiredData, accessToken))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsMember);
