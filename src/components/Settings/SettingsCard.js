import React, { Component } from 'react';
import { SettingsCardList } from '../Settings';
import { Modal, ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, Label } from '../Input';
import { PageBlock, PageBlockGroup } from '../Page';
import { Button } from '../Button';

class SettingsCard extends Component {
	constructor() {
		super();
		this.renderNewCardTypeModal = this.renderNewCardTypeModal.bind(this);
	}

	renderNewCardTypeModal = () => {
		const {
			isModalOpen,
			toggleModal,
			newCardType,
			handleInputChange
		} = this.props;

		return (
			<Modal
				isOpen={isModalOpen.newCardType}
				toggle={toggleModal('newCardType')}>
				<ModalHeader align="center">
					<h6 className="fw-semibold tt-uppercase ls-base">
						Buat Tipe Kartu Baru
					</h6>
				</ModalHeader>
				<Form>
					<ModalContent>
						<FormGroup>
							<Label htmlFor="name">Nama Tipe Kartu</Label>
							<Input
								name="name"
								type="text"
								placeholder="Nama tipe kartu baru"
								onChange={(e) => handleInputChange(newCardType, e)}
								autoFocus="true"
							/>
						</FormGroup>
						<FormGroup>
							<Label htmlFor="minimum">Minimum Saldo</Label>
							<InputGroup>
								<InputAddon>
									<small className="fw-semibold tt-uppercase ls-base">Rp</small>
								</InputAddon>
								<Input
									name="minimum"
									type="text"
									placeholder="Masukkan minimum pengisian saldo untuk menerapkan bonus"
									onChange={(e) => handleInputChange(newCardType, e)}
									autoFocus="true"
								/>
							</InputGroup>
						</FormGroup>
						<FormGroup>
							<Label htmlFor="minimum">Minimum Saldo</Label>
							<InputGroup>
								<InputAddon>
									<small className="fw-semibold tt-uppercase ls-base">Rp</small>
								</InputAddon>
								<Input
									name="bonus"
									type="text"
									placeholder="Masukkan bonus dari pengisian saldo"
									onChange={(e) => handleInputChange(newCardType, e)}
									autoFocus="true"
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

	render = () => {
		const {
			card,
			cardList
		} = this.props;

		return (
			<div className="inner-view">
				<div className="padding-bottom-2">
					<h5 className="fw-semibold">Daftar Kartu</h5>
				</div>
				<PageBlockGroup>
					{ card.isLoaded ? <SettingsCardList {...this.props} /> : null }
					<PageBlock className="flex justify-content--flex-end" extension>
						<Button type="button" buttonTheme="primary" className="clr-light">
							<small className="fw-semibold tt-uppercase ls-base">Buat Tipe Kartu Baru</small>
						</Button>
					</PageBlock>
				</PageBlockGroup>

			</div>
		)
	}
}

export default SettingsCard;
