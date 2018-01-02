import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../Input';
import { Row } from '../Grid';
import { Button } from '../Button';

class SettingsUpdateCafeMenu extends Component {
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
			isModalOpen,
			toggleModal,
			selectedCafeMenu,
			handleImageChange,
			handleInputChange,
			handleCafeMenuUpdateSubmit
		} = this.props;

		const renderPhotoPreview = () => {
			if(!selectedCafeMenu.image) {
			    return <i className="fi flaticon-picture icon icon--gigant clr-primary" onClick={this.triggerFileChange}></i>
			}
			else {
			    return <img src={selectedCafeMenu.imagePreview || selectedCafeMenu.image} style={{ width: '100%' }} onClick={this.triggerFileChange} />
			}
		}

		return (
			<Modal
				isOpen={isModalOpen.cafeMenuUpdate}
				toggle={() => toggleModal('cafeMenuUpdate')}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Ubah Cafe Menu: <span className="fw-bold">{selectedCafeMenu.name}</span></h6>
				</ModalHeader>
				<Form onSubmit={handleCafeMenuUpdateSubmit}>
					<ModalContent>
						<Row>
							<div className="column-4 flex flex-column align-items--center justify-content--center">
								{ renderPhotoPreview() }
								<Input
								    name="image"
								    type="file"
								    accept="image/*"
								    ref={(input) => this.fileInput = input }
								    onChange={(e) => handleImageChange(selectedCafeMenu, e)}
								    style={{display: 'none'}}
								    readOnly
								/>
								<p className="fw-semibold clr-primary">{selectedCafeMenu.image || selectedCafeMenu.imagePreview ? 'Ubah Foto' : 'Tambahkan Foto'}</p>
							</div>
							<div className="column-8">
								<FormGroup>
									<Label htmlFor="name" className="fw-semibold">Nama Menu</Label>
									<Input
										name="name"
										type="text"
										placeholder="Masukkan nama menu"
										value={selectedCafeMenu.name}
										onChange={(e) => handleInputChange(selectedCafeMenu, e)}
										required="true"
										autoFocus
									/>
								</FormGroup>
								<FormGroup>
									<Label htmlFor="price" className="fw-semibold">Harga Menu</Label>
									<InputGroup>
										<InputAddon>
											<small className="fw-semibold">Rp</small>
										</InputAddon>
										<InputCurrency
											name="price"
											type="text"
											value={selectedCafeMenu.price}
											placeholder="Masukkan harga menu"
											thousandSeparator={true}
											onChange={(e) => handleInputChange(selectedCafeMenu, e)}
											required="true"
										/>
									</InputGroup>
								</FormGroup>
								<FormGroup>
									<Label htmlFor="description" className="fw-semibold">Deskripsi</Label>
									<Input
										name="description"
										type="textarea"
										value={selectedCafeMenu.description}
										placeholder="Masukkan deskripsi menu"
										onChange={(e) => handleInputChange(selectedCafeMenu, e)}
									/>
								</FormGroup>
							</div>
						</Row>
					</ModalContent>
					<ModalFooter className="flex justify-content--flex-end">
						<Button type="button" buttonTheme="danger" className="clr-light margin-right-2" onClick={() => toggleModal('cafeMenuUpdate')}>
							<small className="tt-uppercase ls-base fw-semibold">Batal</small>
						</Button>
						<Button buttonTheme="primary" className="clr-light">
							<small className="tt-uppercase ls-base fw-semibold">Terapkan</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
    }
}

export default SettingsUpdateCafeMenu;