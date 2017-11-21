import React, { Component } from 'react';
import { SettingsCardList } from '../Settings';
import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputCurrency, InputAddon, Label } from '../Input';
import { PageBlock, PageBlockGroup } from '../Page';
import { Button } from '../Button';

class SettingsCard extends Component {
	constructor() {
		super();
		this.renderNewCardTypeModal = this.renderNewCardTypeModal.bind(this);
		this.renderUpdateCardTypeModal = this.renderUpdateCardTypeModal.bind(this);
	}

	renderNewCardTypeModal = () => {
		const {
			isModalOpen,
			toggleModal,
			newCardType,
			handleInputChange,
			handleNewCardTypeSubmit
		} = this.props;

		return (
			<Modal
				name="newCardType"
				isOpen={isModalOpen.newCardType}
				toggle={() => toggleModal('newCardType')}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Buat Tipe Kartu Baru</h6>
				</ModalHeader>
				<Form onSubmit={handleNewCardTypeSubmit}>
					<ModalContent>
						<FormGroup row>
							<Label htmlFor="name" className="fw-semibold">Nama Tipe Kartu</Label>
							<Input
								name="name"
								type="text"
								placeholder="Nama tipe kartu baru"
								onChange={(e) => handleInputChange(newCardType, e)}
								required="true"
								autoFocus
							/>
						</FormGroup>
						<FormGroup row>
							<Label htmlFor="minimum" className="fw-semibold">Minimum Saldo</Label>
							<InputGroup>
								<InputAddon>
									<small className="fw-semibold tt-uppercase ls-base">Rp</small>
								</InputAddon>
								<Input
									name="minimum"
									type="text"
									placeholder="Masukkan minimum pengisian saldo untuk bonus"
									onChange={(e) => handleInputChange(newCardType, e)}
									required="true"
								/>
							</InputGroup>
						</FormGroup>
						<FormGroup row>
							<Label htmlFor="minimum" className="fw-semibold">Minimum Saldo</Label>
							<InputGroup>
								<InputAddon>
									<small className="fw-semibold tt-uppercase ls-base">Rp</small>
								</InputAddon>
								<Input
									name="bonus"
									type="text"
									placeholder="Masukkan bonus dari pengisian saldo"
									onChange={(e) => handleInputChange(newCardType, e)}
									required="true"
								/>
							</InputGroup>
						</FormGroup>
					</ModalContent>
					<ModalFooter className="flex justify-content--flex-end">
						<Button type="button" buttonTheme="danger" className="clr-light margin-right-2" onClick={() => toggleModal('newCardType')}>
							<small className="fw-semibold tt-uppercase ls-base">Batal</small>
						</Button>
						<Button buttonTheme="primary" className="clr-light">
							<small className="fw-semibold tt-uppercase ls-base">Buat</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}

	renderUpdateCardTypeModal = () => {
		const {
			isModalOpen,
			toggleModal,
			selectedCardType,
			handleInputChange,
			handleCardTypeUpdateSubmit
		} = this.props;

		return (
			<Modal
				isOpen={isModalOpen.updateCardType}
				toggle={() => toggleModal('updateCardType')}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Ubah Tipe Kartu: <span className="fw-bold clr-primary">{selectedCardType.name}</span></h6>
				</ModalHeader>
				<Form onSubmit={handleCardTypeUpdateSubmit}>
					<ModalContent>
						<FormGroup row>
							<Label htmlFor="name" className="fw-semibold">Nama Kartu</Label>
							<Input
								type="text"
								name="name"
								value={selectedCardType.name}
								placeholder="Masukkan nama tipe kartu"
								onChange={(e) => handleInputChange(selectedCardType, e)}
								autoFocus
								required="true"
							/>
						</FormGroup>
						<FormGroup row>
							<Label htmlFor="minimum" className="fw-semibold">Minimum Saldo</Label>
							<InputGroup>
								<InputAddon>
									<small className="fw-semibold tt-uppercase ls-base">Rp</small>
								</InputAddon>
								<InputCurrency
									name="minimum"
									value={selectedCardType.minimum}
									placeholder="Masukkan minimum saldo"
									onChange={(e) => handleInputChange(selectedCardType, e)}
									required="true"
									thousandSeparator={true}
								/>
							</InputGroup>
						</FormGroup>
						<FormGroup row>
							<Label htmlFor="bonus" className="fw-semibold">Bonus Saldo</Label>
							<InputGroup>
								<InputAddon>
									<small className="fw-semibold tt-uppercase ls-base">Rp</small>
								</InputAddon>
								<InputCurrency
									type="text"
									name="bonus"
									value={selectedCardType.bonus}
									placeholder="Masukkan bonus saldo"
									onChange={(e) => handleInputChange(selectedCardType, e)}
									thousandSeparator={true}
									required="true"
								/>
							</InputGroup>
						</FormGroup>
						<FormGroup row>
							<Label htmlFor="refundable" className="fw-semibold">Dapat direfund?</Label>
							<Input
								type="select"
								name="refunable"
								value={selectedCardType.refunable}
								onChange={(e) => handleInputChange(selectedCardType, e)}>
								<option value={true}>Bisa direfund</option>
								<option value={false}>Tidak dapat direfund</option>
							</Input>
						</FormGroup>
					</ModalContent>
					<ModalFooter className="flex justify-content--flex-end">
						<Button type="button" buttonTheme="danger" className="clr-light margin-right-2" onClick={() => toggleModal('updateCardType')}>
							<small className="fw-semibold tt-uppercase ls-base">Batalkan</small>
						</Button>
						<Button buttonTheme="primary" className="clr-light">
							<small className="fw-semibold tt-uppercase ls-base">Terapkan</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}

	render() {
		const {
			card,
			cardList,
			handleNewCardType
		} = this.props;

		return (
			<div className="inner-view">
				<div className="padding-bottom-2">
					<h5 className="fw-semibold">Daftar Tipe Kartu</h5>
					<p className="clr-passive">Berikut merupakan daftar tipe kartu yang aktif dalam layanan.</p>
				</div>
				<PageBlockGroup>
					{ card.isLoaded ? <SettingsCardList {...this.props} /> : null }
					<PageBlock className="flex justify-content--flex-end" extension>
						<Button type="button" buttonTheme="primary" className="clr-light" onClick={handleNewCardType}>
							<small className="fw-semibold tt-uppercase ls-base">Buat Tipe Kartu Baru</small>
						</Button>
					</PageBlock>
				</PageBlockGroup>
				{this.renderNewCardTypeModal()}
				{this.renderUpdateCardTypeModal()}
			</div>
		)
	}
}

export default SettingsCard;
