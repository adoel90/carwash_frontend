import React, { Component } from 'react'
import { Modal } from 'reactstrap';
import { ModalFooter, ModalContent, ModalHeader } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, Label } from '../Input';
import { Alert } from '../Alert';
import { Button } from '../Button';
import { Row } from '../Grid';

class CashierNewCardConfirmation extends Component {
	render () {
		const{
			newCardData,
			cardTypes,
			paymentMethod,
			toggleModal,
			isModalOpen,
			handleNewCardConfirmationSubmit
		} = this.props;

		let selectedCardName;
		let selectedPaymentMethod;
		
		if(cardTypes.length) {
			cardTypes.forEach((type) => {
				if(type.id == newCardData.card) {
					return selectedCardName = type.name;
				}
			})
		}

		if(paymentMethod.length) {
			paymentMethod.forEach((method) => {
				if(method.id == newCardData.payment) {
					return selectedPaymentMethod = method.name;
				}
			})
		}

		return (
			<Modal
				isOpen={isModalOpen.newCardConfirmation}
				className="modal-dialog--large">
				<ModalHeader align="center">
					<h6 className="fw-semibold">Konfirmasi Data Member</h6>
				</ModalHeader>
				<Form onSubmit={handleNewCardConfirmationSubmit}>
					<ModalContent>
						<Alert theme="secondary" className="margin-bottom-2">
							<p>Periksa kembali informasi calon member berikut sebelum melanjutkan.</p>
						</Alert>
						<Row>
							<div className="column-6">
								<FormGroup>
									<Label className="fw-semibold">Nama Lengkap</Label>
									<InputGroup>
										<InputAddon>
											<i className="ion-person"></i>
										</InputAddon>
										<Input
											type="text"
											value={newCardData.name}
											readonly="true"
										/>
									</InputGroup>
								</FormGroup>
								<FormGroup>
									<Label className="fw-semibold">Alamat E-mail</Label>
									<InputGroup>	
										<InputAddon>
											<i className="ion-email"></i>
										</InputAddon>
										<Input
											type="text"
											value={newCardData.email}
											readonly="true"
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
											type="text"
											value={newCardData.phone}
											readonly="true"
										/>
									</InputGroup>
								</FormGroup>
								<FormGroup>
									<Label className="fw-semibold">Alamat</Label>
									<Input
										type="textarea"
										value={newCardData.address}
										readonly="true"
									/>
								</FormGroup>
							</div>
							<div className="column-6">
								<FormGroup>
									<Label className="fw-semibold">Tipe Member</Label>
									<Input
										type="text"
										value={selectedCardName}
										readonly="true"
									/>
								</FormGroup>
								<FormGroup>
									<Label className="fw-semibold">Metode Pembayaran</Label>
									<Input
										type="text"
										value={selectedPaymentMethod}
										readonly="true"
									/>
								</FormGroup>
							</div>
						</Row>
					</ModalContent>
					<ModalFooter className="flex justify-content--center">
						<Button type="button" buttonTheme="danger" className="clr-light" onClick={() => toggleModal('newCardConfirmation')}>
							<small className="fw-semibold tt-uppercase ls-base">Batal</small>
						</Button>
						<Button type="submit" buttonTheme="primary" className="clr-light margin-left-2">
							<small className="fw-semibold tt-uppercase ls-base">Lanjutkan</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}
}

export default CashierNewCardConfirmation