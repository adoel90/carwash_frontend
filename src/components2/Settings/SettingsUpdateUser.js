import React, { Component } from 'react';

import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, Label } from '../Input';
import { Button } from '../Button';
import { Row } from '../Grid';

class SettingsUpdateUser extends Component {
	render() {
		const {
			selectedUser,
			isModalOpen,
			toggleModal,
			accessList,
			cafeTypes,
			handleInputChange,
			handleUpdateUserSubmit
		} = this.props;

		return (
			<Modal
				isOpen={isModalOpen.updateUser}
				toggle={() => toggleModal('updateUser')}
				className="modal-dialog--large">
				<ModalHeader align="center">
					<h6 className="fw-semibold">Ubah Informasi User: <span>{selectedUser.name}</span></h6>
				</ModalHeader>
				<Form onSubmit={handleUpdateUserSubmit}>
					<ModalContent>
						<Row>
							<div className="column-6">
								<FormGroup>
									<Label className="fw-semibold">Nama</Label>
									<InputGroup>
										<InputAddon>
											<i className="ion-person"></i>
										</InputAddon>
										<Input
											name="name"
											type="text"
											placeholder="e.g: John Doe, Bill Appleseed, dll."
											onChange={(e) => handleInputChange(selectedUser, e)}
											value={selectedUser.name}
											required="true"
										/>
									</InputGroup>
								</FormGroup>
								<FormGroup>
									<Label className="fw-semibold">Username</Label>
									<InputGroup>
										<InputAddon>
											<i className="ion-person"></i>
										</InputAddon>
										<Input
											name="username"
											type="text"
											placeholder="Masukkan username user"
											onChange={(e) => handleInputChange(selectedUser, e)}
											value={selectedUser.username}
											required="true"
										/>
									</InputGroup>
								</FormGroup>
								<FormGroup>
									<Label className="fw-semibold">Kata Sandi</Label>
									<InputGroup>
										<InputAddon>
											<i className="ion-locked"></i>
										</InputAddon>
										<Input
											name="password"
											type="password"
											placeholder="Masukkan kata sandi"
											onChange={(e) => handleInputChange(selectedUser, e)}
										/>
									</InputGroup>
									<small className="clr-passive">Tinggalkan kolom ini jika tidak ingin mengubah kata sandi user.</small>
								</FormGroup>
							</div>
							<div className="column-6">
								<FormGroup>
									<Label className="fw-semibold">Alamat Email</Label>
									<InputGroup>
										<InputAddon>
											<i className="ion-email"></i>
										</InputAddon>
										<Input
											name="email"
											type="text"
											placeholder="Masukkan alamat email"
											onChange={(e) => handleInputChange(selectedUser, e)}
											value={selectedUser.email}
										/>
									</InputGroup>
								</FormGroup>
								<FormGroup>
									<Label className="fw-semibold">Akses Level</Label>
									<Input
										name="level"
										type="select"
										onChange={(e) => handleInputChange(selectedUser, e)}
										value={selectedUser.level}>
										<option disabled="true">Pilih akses level</option>
										{ 
											accessList.isLoaded ? accessList.data.map((item) => {
												if(item.status) {
													return <option value={item.id}>{item.name}</option>

												}
											})
											: null
										}
									</Input>
								</FormGroup>
								<FormGroup>
									<Label className="fw-semibold">Akses Cafe</Label>
									<Input
										name="cafe"
										type="select"
										onChange={(e) => handleInputChange(selectedUser, e)}
										value={selectedUser.cafe}>
										<option value={0}>Semua</option>
										{ 
											cafeTypes.isLoaded ? cafeTypes.data.map((item) => {
												if(item.status) {
													return <option value={item.id}>{item.name}</option>
												}
											}) 
											: null
										}

									</Input>
								</FormGroup>
							</div>
						</Row>
					</ModalContent>
					<ModalFooter className="flex justify-content--flex-end">
						<Button type="button" buttonTheme="danger" className="clr-light" onClick={() => toggleModal('updateUser')}>
							<small className="fw-semibold tt-uppercase ls-base">Batal</small>
						</Button>
						<Button buttonTheme="primary" className="clr-light margin-left-2">
							<small className="fw-semibold tt-uppercase ls-base">Ubah</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}
}

export default SettingsUpdateUser;