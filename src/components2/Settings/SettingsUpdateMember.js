import React, { Component } from 'react'
import { Modal } from 'reactstrap';
import { PageBlock } from '../Page';
import { Row } from '../Grid';
import { ModalHeader, ModalContent, ModalFooter, ModalDialog } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputAddon, InputGroup, InputCurrency, Label } from '../Input';
import { Button } from '../Button';
import { Alert } from '../Alert';

class SettingsUpdateMember extends Component {
    render () {
        const {
			member,
			selectedMember,
			isModalOpen,
			toggleModal,
			handleInputChange,
			handleUpdateMemberSubmit,
		} = this.props;

		if(member.item.isLoaded) {
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

		return null;
    }
}

export default SettingsUpdateMember