import React, { Component } from 'react'
// import { Modal } from 'reactstrap';
import { ModalFooter, ModalContent, ModalHeader, Modal, ModalBody} from '../../../components/Modal';
import { Form, FormGroup } from '../../../components/Form';
import { Input, InputGroup, InputAddon, Label, Textarea } from '../../../components/Input';
import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { Row, Column } from '../../../layouts/Grid';
import {FormField} from '../../../layouts/Form';

class CashierNewCardConfirmation extends Component {

	render () {
		const{
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

		const renderMemberInformation = () => {
			if(!selectedCardType.refund) {
				return (
					<Column md={6}>
						<FormGroup>
							<FormField label="Nama Lengkap">
								<InputGroup>
									<InputAddon>
										<i className="fas fa-user"></i>
									</InputAddon>
									<Input
										type="text"
										value={newCardData.name}
										// placeholder="Tulis Nama Lengkap"
										readonly="true"
									/>
								</InputGroup>
							</FormField>
						</FormGroup>
						<FormGroup>
							<FormField label="Alamat E-mail">
								<InputGroup>	
									<InputAddon>
										<i className="fas fa-envelope"></i>
									</InputAddon>
									<Input
										type="text"
										value={newCardData.email}
										readonly="true"
									/>
								</InputGroup>
							</FormField>
						</FormGroup>
						<FormGroup>
							<FormField label="Nomor Telepon">
								<InputGroup>
									<InputAddon>
										<i className="fas fa-phone"></i>
									</InputAddon>
									<Input
										type="text"
										value={newCardData.phone}
										readonly="true"
									/>
								</InputGroup>
							</FormField>
						</FormGroup>
						<FormGroup>
							<FormField label="Alamat">
								<Textarea
									value={newCardData.address}
									readonly="true"
								/>
							</FormField>
						</FormGroup>
					</Column>
				)
			}
		}

		const renderCardInformation = () => {
			return (
				<Column md={6}>
					<FormGroup>
						<FormField label="Tipe Member">
							<Input
								type="text"
								value={selectedCardName}
								readonly="true"
							/>
						</FormField>
					</FormGroup>
					<FormGroup>
						<FormField label="Metode Pembayaran">
							<Input
								type="text"
								value={selectedPaymentMethod}
								readonly="true"
							/>
						</FormField>
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
						<Alert theme="secondary" className="margin-bottom-small">
							<p>Periksa kembali informasi calon member berikut sebelum melanjutkan.</p>
						</Alert>
						<Row>
							{ renderMemberInformation() }
							{ renderCardInformation() }
						</Row>
					</ModalBody>
					<ModalFooter className="flex justify-content--center">
						<Button type="button" theme="danger" className="clr-light" onClick={() => toggleModal('newCardConfirmation')}>
							<small className="fw-semibold tt-uppercase ls-base">Batal</small>
						</Button>
						<Button type="submit" theme="primary" className="clr-light margin-left-small">
							<small className="fw-semibold tt-uppercase ls-base">Lanjutkan</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}
}

export default CashierNewCardConfirmation;