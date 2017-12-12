import React, { Component } from 'react';

import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../Input';
import { Button } from '../Button';

class SettingsUpdateService extends Component {
    render() {
        const {
			selectedService,
			handleInputChange,
			handleServiceUpdateSubmit,
			toggleModal,
			isModalOpen
		} = this.props;

		return (
			<Modal
				name="editService"
				isOpen={isModalOpen.editService}
				toggle={() => toggleModal('editService')}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Perubahan Service: <span className="fw-bold">{selectedService.name}</span></h6>
				</ModalHeader>
				<Form onSubmit={handleServiceUpdateSubmit}>
					<ModalContent>
						<FormGroup row>
							<Label htmlFor="name" className="fw-semibold">Nama Service</Label>
							<Input
								name="name"
								type="text"
								placeholder="Masukkan nama service"
								value={selectedService.name}
								onChange={(e) => handleInputChange(selectedService, e)}
							/>
						</FormGroup>
						<FormGroup row>
							<Label htmlFor="price" className="fw-semibold">Harga Service</Label>
							<InputGroup>
								<InputAddon>
									<small className="fw-semibold tt-uppercase ls-base">Rp</small>
								</InputAddon>
								<InputCurrency
									name="price"
									type="text"
									placeholder="Masukkan harga service"
									thousandSeparator={true}
									value={selectedService.price}
									onChange={(e) => handleInputChange(selectedService, e)}
								/>
							</InputGroup>
						</FormGroup>
						<FormGroup row>
							<Label htmlFor="description" className="fw-semibold">Deskripsi</Label>
							<Input
								name="description"
								type="textarea"
								placeholder="Masukkan deskripsi service"
								value={selectedService.description}
								onChange={(e) => handleInputChange(selectedService, e)}
							/>
						</FormGroup>
					</ModalContent>
					<ModalFooter className="flex justify-content--flex-end">
						<Button type="button" buttonTheme="danger" className="clr-light margin-right-2" onClick={() => toggleModal('editService')}>
							<small className="fw-semibold tt-uppercase ls-base">Batalkan</small>
						</Button>
						<Button type="submit" buttonTheme="primary" className="clr-light">
							<small className="fw-semibold tt-uppercase ls-base">Terapkan</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
    }
}

export default SettingsUpdateService;