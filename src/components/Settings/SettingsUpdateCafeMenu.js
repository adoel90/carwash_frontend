import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../Input';
import { Row } from '../Grid';
import { Button } from '../Button';

class SettingsUpdateCafeMenu extends Component {
    render() {
        const {
			isModalOpen,
			toggleModal,
			selectedCafeMenu,
			handleInputChange,
			handleCafeMenuUpdateSubmit
		} = this.props;

		return (
			<Modal
				isOpen={isModalOpen.cafeMenuUpdate}
				toggle={() => toggleModal('cafeMenuUpdate')}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Ubah Cafe Menu: <span className="fw-bold">{selectedCafeMenu.name}</span></h6>
				</ModalHeader>
				<Form onSubmit={handleCafeMenuUpdateSubmit}>
					<ModalContent>
						<FormGroup row>
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
						<FormGroup row>
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
						<FormGroup row>
							<Label htmlFor="description" className="fw-semibold">Deskripsi</Label>
							<Input
								name="description"
								type="textarea"
								value={selectedCafeMenu.description}
								placeholder="Masukkan deskripsi menu"
								onChange={(e) => handleInputChange(selectedCafeMenu, e)}
							/>
						</FormGroup>
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