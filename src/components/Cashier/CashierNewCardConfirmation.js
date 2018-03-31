import React, { Component } from 'react'
// import { Modal } from 'reactstrap';
import { ModalFooter, ModalContent, ModalHeader, Modal, ModalBody} from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, Label } from '../Input';
import { Alert } from '../Alert';
import { Button } from '../Button';
import { Row, Column } from '../../layouts/Grid';
import {FormField} from '../../layouts/Form';

class CashierNewCardConfirmation extends Component {

	render () {
		const{
			card,
			newCardData,
			cardTypes,
			paymentMethod,
			toggleModal,
			isModalOpen,
			selectedCardType,
			handleNewCardConfirmationSubmit
		} = this.props;

		let selectedCardName;
		let selectedPaymentMethod;

		if(card.types.isLoaded) {
			card.types.data.data.result.forEach((type) => {
				if(type.id == newCardData.card.id) {
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

		const renderMemberInformation = () => {
			if(!selectedCardType.refund) {
				return (
					<Column md={6}>
					
						<FormField label="Nama Lengkap">
							<InputGroup>
								<InputAddon>
									<i className="far fa-person"></i>
								</InputAddon>
								<Input
									className="input"
									type="text"
									value={newCardData.name}
									readonly="true"
								/>
							</InputGroup>
						</FormField>
						
						<FormField label="Alamat E-mail">
							<InputGroup>	
								<InputAddon>
									<i className="far fa-envelope"></i>
								</InputAddon>
								<Input
									className="input"
									type="text"
									value={newCardData.email}
									readonly="true"
								/>
							</InputGroup>
						</FormField>

						<FormField label="Nomor Telepon">
							<InputGroup>
								<InputAddon>
									<i className="far fa-telephone"></i>
								</InputAddon>
								<Input
									type="text"
									value={newCardData.phone}
									readonly="true"
								/>
							</InputGroup>
						</FormField>
						
						<FormGroup>
							<Label className="fw-semibold">Alamat</Label>
							<Input
								type="textarea"
								value={newCardData.address}
								readonly="true"
							/>
						</FormGroup>
					</Column>
				)
			}
		}

		const renderCardInformation = () => {
			return (
				<Column md={6}>
					<FormGroup>
						<Label className="fw-semibold">Tipe Member Card</Label>
						<Input
							type="text"
							value={newCardData.tipecard}
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
				</Column>
			)
		}

		return (
			<Modal
				isOpen={isModalOpen.newCardConfirmation}
				className="modal-dialog--large">
				<ModalHeader align="center">
					<h6 className="fw-semibold">Konfirmasi Data Member</h6>
				</ModalHeader>
				<Form onSubmit={handleNewCardConfirmationSubmit}>
					<ModalBody>
						<Alert theme="secondary" className="margin-bottom-2">
							<p>Periksa kembali informasi calon member berikut sebelum melanjutkan.</p>
						</Alert>
						<Row>
							{ renderMemberInformation() }
							{ renderCardInformation() }
						</Row>
					</ModalBody>
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

export default CashierNewCardConfirmation;