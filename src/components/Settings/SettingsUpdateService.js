import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../Input';
import { Button } from '../Button';
import { Row } from '../Grid';

class SettingsUpdateService extends Component {
	constructor() {
		super();
		this.triggerFileChange = this.triggerFileChange.bind(this);
	}

	triggerFileChange = () => {
		const fileInput = ReactDOM.findDOMNode(this.fileInput);
		fileInput.click();
	}

    render() {
        const {
			selectedService,
			handleInputChange,
			handleImageChange,
			handleServiceUpdateSubmit,
			toggleModal,
			isModalOpen
		} = this.props;

		const renderPhotoPreview = () => {
			if(!selectedService.image) {
			    return <i className="fi flaticon-picture icon icon--gigant clr-primary" onClick={this.triggerFileChange}></i>
			}
			else {
			    return <img src={selectedService.imagePreview || selectedService.image} style={{ width: '100%' }} onClick={this.triggerFileChange} />
			}
		}

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
						<Row>
							<div className="column-4  flex flex-column align-items--center justify-content--center">
								{ renderPhotoPreview() }
								<Input
								    name="image"
								    type="file"
								    accept="image/*"
								    ref={(input) => this.fileInput = input }
								    onChange={(e) => handleImageChange(selectedService, e)}
								    style={{display: 'none'}}
								    readOnly
								/>
								<p className="fw-semibold clr-primary">{selectedService.image || selectedService.imagePreview ? 'Ubah Foto' : 'Tambahkan Foto'}</p>
							</div>
							<div className="column-8">
								<FormGroup>
									<Label htmlFor="name" className="fw-semibold">Nama Service</Label>
									<Input
										name="name"
										type="text"
										placeholder="Masukkan nama service"
										value={selectedService.name}
										onChange={(e) => handleInputChange(selectedService, e)}
									/>
								</FormGroup>
								<FormGroup>
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
								<FormGroup>
									<Label htmlFor="description" className="fw-semibold">Deskripsi</Label>
									<Input
										name="description"
										type="textarea"
										placeholder="Masukkan deskripsi service"
										value={selectedService.description}
										onChange={(e) => handleInputChange(selectedService, e)}
									/>
								</FormGroup>
							</div>
						</Row>
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