import React from 'react';

import { Modal } from 'reactstrap';
import { PageBlock } from '../Page';
import { Row } from '../Grid';
import { ModalHeader, ModalContent, ModalFooter, ModalDialog } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputAddon, InputGroup, InputCurrency, Label } from '../Input';
import { Button } from '../Button';
import { Alert } from '../Alert';

import { SettingsMemberList } from '../Settings';

class SettingsMember extends React.Component {
	constructor() {
		super();
		this.renderViewMemberDetailModal = this.renderViewMemberDetailModal.bind(this);
		this.renderEditMemberModal = this.renderEditMemberModal.bind(this);
	}

	renderViewMemberDetailModal = () => {
		const {
			isModalOpen,
			toggleModal,
			selectedMember
		} = this.props;

		return (
			<Modal
				name="viewMemberModal"
				className="modal-dialog--large"
				isOpen={isModalOpen.viewMemberDetail}
				toggle={() => toggleModal('viewMemberDetail')}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Lihat Informasi Member</h6>
				</ModalHeader>
				<ModalContent>
					<Form>
						{/* <h6 className="fw-semibold padding-bottom-2">Informasi Member</h6> */}
						<Row>
							<div className="column-6">
								<FormGroup>
									<Label className="fw-semibold">Nama Member</Label>
									<InputGroup>
										<InputAddon>
											<i className="ion-person"></i>
										</InputAddon>
										<Input
											placeholder="Nama lengkap member"
											value={selectedMember.name}
											readOnly
										/>
									</InputGroup>
								</FormGroup>
								<FormGroup>
									<Label className="fw-semibold">Alamat Email</Label>
									<InputGroup>
										<InputAddon>
											<i className="ion-email"></i>
										</InputAddon>
										<Input
											placeholder="Alamat email member"
											value={selectedMember.email}
											readOnly
										/>
									</InputGroup>
								</FormGroup>
								<FormGroup>
									<Label className="fw-semibold">Nomor Telepon</Label>
									<InputGroup>
										<InputAddon>
											<i className="ion-ios-telephone"></i>
										</InputAddon>
										<Input
											placeholder="Nomor kontak member yang bisa dihubungi"
											value={selectedMember.phone}
											readOnly
										/>
									</InputGroup>
								</FormGroup>
								<FormGroup>
									<Label className="fw-semibold">Alamat</Label>
									<Input
										type="textarea"
										value={selectedMember.address}
										readOnly
									/>
								</FormGroup>
							</div>
							<div className="column-6">
								<FormGroup>
									<Label className="fw-semibold">Saldo Saat Ini</Label>
									<InputGroup>
										<InputAddon>
											<small className="tt-uppercase ls-base fw-semibold">RP</small>
										</InputAddon>
										<InputCurrency
											placeholder="Saldo yang dimiliki member saat ini"
											value={selectedMember.balance}
											readOnly
										/>
									</InputGroup>
								</FormGroup>
								<FormGroup>
									<Label className="fw-semibold">Nomor Kartu</Label>

									<InputGroup>
										<InputAddon>
											<i className="ion-card"></i>
										</InputAddon>
										<Input
											placeholder="Nomor kartu member"
											value={selectedMember.cardId}
											readOnly
										/>
									</InputGroup>
								</FormGroup>
								<FormGroup>
									<Label className="fw-semibold">Tipe Kartu</Label>
									<InputGroup>
										<InputAddon>
											<i className="ion-card"></i>
										</InputAddon>
										<Input
											placeholder="Nama lengkap member"
											value={selectedMember.cardType}
											readOnly
										/>
									</InputGroup>
								</FormGroup>
							</div>
						</Row>
					</Form>
				</ModalContent>
				<ModalFooter className="flex justify-content--flex-end">
					<Button buttonTheme="danger" className="clr-light" onClick={() => toggleModal('viewMemberDetail')}>
						<small className="fw-semibold tt-uppercase ls-base">Tutup</small>
					</Button>
				</ModalFooter>
			</Modal>
		)
	}

	renderEditMemberModal = () => {
		const {
			member,
			selectedMember,
			isModalOpen,
			toggleModal,
			handleInputChange,
			handleUpdateMemberSubmit,
		} = this.props;

		return (
			<Modal
				name="editMember"
				isOpen={isModalOpen.editMember}
				toggle={() => toggleModal('editMember')}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Ubah Informasi Member</h6>
				</ModalHeader>
				<Form onSubmit={handleUpdateMemberSubmit}>
					<ModalContent>
						<FormGroup row>
							<Label className="fw-semibold">Nama Member</Label>
							<Input
								type="text"
								name="name"
								placeholder="Masukkan nama lengkap member"
								value={selectedMember.name}
								onChange={(e) => handleInputChange(selectedMember, e)}
								required="true"
								autoFocus="true"
							/>
						</FormGroup>
						<FormGroup row>
							<Label className="fw-semibold">Alamat Email</Label>
							<Input
								type="text"
								name="email"
								placeholder="Masukkan alamat email member"
								value={selectedMember.email}
								onChange={(e) => handleInputChange(selectedMember, e)}
								required="true"
							/>
						</FormGroup>
						<FormGroup row>
							<Label className="fw-semibold">No. Telepon</Label>
							<Input
								type="phone"
								name="phone"
								placeholder="Masukkan nomor telepon/handphone member"
								value={selectedMember.phone}
								onChange={(e) => handleInputChange(selectedMember, e)}
								required="true"
							/>
						</FormGroup>
						<FormGroup row>
							<Label className="fw-semibold">Alamat</Label>
							<Input
								type="textarea"
								name="address"
								placeholder="Masukkan alamat member"
								value={selectedMember.address}
								onChange={(e) => handleInputChange(selectedMember, e)}
							/>
						</FormGroup>
					</ModalContent>
					<ModalFooter className="flex justify-content--flex-end">
						<Button type="button" buttonTheme="danger" buttonSize="small" className="clr-light margin-right-2" onClick={() => toggleModal('editMember')}>
							<small className="tt-uppercase ls-base fw-semibold">Batal</small>
						</Button>
						<Button buttonTheme="primary" buttonSize="small" className="clr-light">
							<small className="tt-uppercase ls-base fw-semibold">Terapkan</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}

	render = () => {
		const {
			member
		} = this.props;

		return (
			<div className="inner-view">
				<div className="padding-bottom-2">
					<h5 className="fw-semibold">Daftar Member</h5>
					<p className="clr-passive">Untuk melihat informasi member, silahkan klik baris member yang diinginkan.</p>
				</div>
				{ member.isLoaded ? <SettingsMemberList {...this.props} /> : null }
				{ this.renderEditMemberModal() }
				{ this.renderViewMemberDetailModal() }
			</div>
		)
	}
}

export default SettingsMember;








// constructor() {
// 	super();
// 	this.state = {
// 		tableHeadings: [
// 			{ id: 1, name: 'Nama Customer' },
// 			{ id: 2, name: 'Alamat E-mail' },
// 			{ id: 3, name: 'Alamat' },
// 			{ id: 4, name: 'No. Telepon' },
// 			{ id: 5, name: 'Tipe Member' },
// 			{ id: 6, name: 'Action' }
// 		]
// 	}
//
// 	this.renderTableHeadings = this.renderTableHeadings.bind(this);
// 	this.renderMemberList = this.renderMemberList.bind(this);
// 	this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
// 	this.handleSearchChange = this.handleSearchChange.bind(this);
// 	this.renderActionModal = this.renderActionModal.bind(this);
// 	this.handleChange = this.handleChange.bind(this);
// }
//
// handleChange = (e) => {
// 	const target = e.target;
// 	const value = target.type === 'checkbox' ? target.checkbox : target.value;
// 	const name = target.name;
//
// 	this.setState({
// 		selectedMember: {
// 			...this.state.selectedMember,
// 			[name]: e.target.values
// 		}
// 	})
// }
//
// toggleActionModal = (data) => {
// 	const { isActionModalOpen } = this.state;
//
// 	this.setState({
// 		selectedMember: {
// 			name: data ? data.name : '',
// 			email: data ? data.email : '',
// 			phone: data ? data.phone : '',
// 			address: data ? data.address : ''
// 		}
// 	});
//
//
// 	this.setState({
// 		isActionModalOpen: !isActionModalOpen
// 	})
// }
//
// handleSearchChange = (e) => {
// 	this.setState({
// 		searchVal: e.target.value
// 	})
// }
//
// handleSearchSubmit = (e) => {
// 	e.preventDefault();
//
// 	const requiredData = {
// 		member: this.state.searchVal,
// 		limit: 10,
// 		offset: 0
// 	}
// }
//
// renderMemberList = (member, i) => {
// 	return (
// 		<tr key={i}>
// 			<td>{member.name}</td>
// 			<td>{member.email}</td>
// 			<td>{member.address}</td>
// 			<td>{member.phone}</td>
// 			<td>{member.card.type.name}</td>
// 			<td>
// 				<Button type="button" buttonTheme="secondary" buttonSize="small" onClick={this.toggleActionModal.bind(this, member)}>
// 					<small className="fw-semibold tt-uppercase ls-base">Ubah</small>
// 				</Button>
// 			</td>
// 		</tr>
// 	)
// }
//
// renderTableHeadings = (heading, i) => {
// 	return (
// 		<th>{heading.name}</th>
// 	)
// }
//
// renderActionModal = () => {
// 	const { selectedMember } = this.state;
//
// 	return (
// 		<Modal isOpen={this.state.isActionModalOpen} toggle={this.toggleActionModal}>
// 			<ModalHeader>
// 				<h6 className="fw-semibold">Ubah Data Member</h6>
// 			</ModalHeader>
// 			<ModalContent>
// 				<Form onSubmit={this.handleActionSubmit}>
// 					<FormGroup>
// 						<Label>
// 							<p className="fw-semibold">Nama Customer</p>
// 						</Label>
// 						<Input name="name" type="text" placeholder="Masukkan Nama Customer" defaultValue={selectedMember.name} onChange={this.handleChange} selectOnFocus autofocus="true" />
// 					</FormGroup>
// 					<FormGroup>
// 						<Label>
// 							<p className="fw-semibold">Alamat Email</p>
// 						</Label>
// 						<Input name="email" type="text" placeholder="Masukkan Alamat Email" defaultValue={selectedMember.email} onChange={this.handleChange} selectOnFocus />
// 					</FormGroup>
// 					<FormGroup>
// 						<Label>
// 							<p className="fw-semibold">Nomor Telepon</p>
// 						</Label>
// 						<Input name="phone" type="text" placeholder="Masukkan Nomor Telepon" defaultValue={selectedMember.phone} onChange={this.handleChange} selectOnFocus />
// 					</FormGroup>
// 					<FormGroup>
// 						<Label>
// 							<p className="fw-semibold">Alamat</p>
// 						</Label>
// 						<Input name="address" type="textarea" row="4" placeholder="Masukkan Alamat" defaultValue={selectedMember.address} onChange={this.handleChange} selectOnFocus />
// 					</FormGroup>
// 				</Form>
// 			</ModalContent>
// 			<ModalFooter>
// 				<Button buttonTheme="primary" buttonSize="small" buttonFull>
// 					<small className="fw-semibold tt-uppercase ls-base clr-dark">Ubah</small>
// 				</Button>
// 			</ModalFooter>
// 		</Modal>
// 	)
// }
//
// render() {
// 	const { member } = this.props;
// 	const { searchVal, selectedMember } = this.state;
//
// 	return (
// 		<div className="inner-view">
// 			<div className="padding-bottom-2">
// 				<h5 className="fw-semibold">Daftar Member</h5>
// 				{/* <p className="clr-passive">Masukkan data customer baru dengan benar dan lengkap. Seluruh kolom harus diisi.</p> */}
// 			</div>
// 			<div className="padding-bottom-2">
// 				<SearchBar
// 					onSubmit={this.handleSearchSubmit}
// 					onChange={this.handleSearchChange}
// 					placeholder="Cari member..."
// 					value={searchVal}
// 				/>
// 			</div>
// 			<Table>
// 				<thead className="thead--primary">
// 					<tr>
// 						{ this.state.tableHeadings.map(this.renderTableHeadings) }
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{ member.list.member ? member.list.member.map(this.renderMemberList) : <p>Sedang dimuat...</p> }
// 				</tbody>
// 			</Table>
// 			{ selectedMember ? this.renderActionModal() : null }
// 		</div>
// 	);
// }
// }
//
// const mapStateToProps = (state) => {
// return {
// 	member: state.member
// }
// }
//
// const mapDispatchToProps = (dispatch, ownProps) => {
// const { accessToken } = ownProps;
// const requiredData = {
// 	limit: 10,
// 	offset: 0
// }
//
// return {
// 	getMemberList: dispatch(getMemberList(requiredData, accessToken))
// }
// }
