import React, { Component } from 'react';

import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, Label } from '../Input';

class SettingsUpdateUser extends Component {
	render() {
		const {
			selectedUser,
			isModalOpen,
			toggleModal,
			handleInputChange,
			handleUpdateUserSubmit
		} = this.props;

		return (
			<Modal
				isOpen={isModalOpen.updateUser}
				toggle={() => toggleModal('updateUser')}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Perbarui Data User</h6>
				</ModalHeader>
				<Form onSubmit={handleUpdateUserSubmit}>
					<ModalContent>
						<FormGroup row>
							<Label htmlFor="name" className="fw-semibold">Nama</Label>
							<Input
								name="name"
								type="text"
								placeholder="Masukkan nama user"
								onChange={(e) => handleInputChange(selectedUser, e)}
								value={selectedUser.name}
							/>
						</FormGroup>
						<FormGroup row>
							<Label htmlFor="username" className="fw-semibold">Username</Label>
							<InputGroup>
								<InputAddon>
									<i className="ion-person"></i>
								</InputAddon>
								<Input
									name="username"
									type="text"
									placeholder="Masukkan username yang diubah"
									onChange={(e) => handleInputChange(selectedUser, e)}
									value={selectedUser.username}
								/>
							</InputGroup>
						</FormGroup>
						<FormGroup row>
							<Label htmlFor="password" className="fw-semibold">Password</Label>
							<InputGroup>
								<InputAddon>
									<i className="ion-person"></i>
								</InputAddon>
								<Input
									name="password"
									type="password"
									placeholder="Masukkan kata sandi"
									onChange={(e) => handleInputChange(selectedUser, e)}
									value={selectedUser.password}
								/>
							</InputGroup>
						</FormGroup>
					</ModalContent>
					<ModalFooter>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}
}

export default SettingsUpdateUser;