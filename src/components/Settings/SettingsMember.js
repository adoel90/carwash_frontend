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
		this.renderMemberList = this.renderMemberList.bind(this);
		this.renderViewMemberDetailModal = this.renderViewMemberDetailModal.bind(this);
		this.renderEditMemberModal = this.renderEditMemberModal.bind(this);
	}

	renderMemberList = () => {
		const {
			member
		} = this.props;

		if(member.list.isFetching) {
			return <p>Sedang memuat data member. Tunggu sebentar...</p>
		}

		else if(member.list.isLoaded) {
			return <SettingsMemberList {...this.props} />
		}

		else if(member.list.isError) {
			return <p>Maaf, terdapat kesalahan dalam memuat data member.</p>
		}
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
					<h4 className="fw-semibold">Daftar Member</h4>
					{/* <p className="clr-passive">Untuk melihat informasi member, silahkan klik baris member yang diinginkan.</p> */}
				</div>
				<PageBlock>
					{ this.renderMemberList() }
				</PageBlock>
				{ this.renderEditMemberModal() }
				{ this.renderViewMemberDetailModal() }
			</div>
		)
	}
}

export default SettingsMember;
