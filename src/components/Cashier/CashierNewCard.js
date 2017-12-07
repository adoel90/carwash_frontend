import React, { Component } from 'react';

import { PageBlock } from '../Page';
import { CashierNewCardForm } from '../Cashier';
import { Button } from '../Button';
import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, Label } from '../Input';
import NumberFormat from 'react-number-format';

class CashierNewCard extends Component {
	constructor() {
		super();
		this.renderNewCardInstructionModal = this.renderNewCardInstructionModal.bind(this);
	}

	renderNewCardInstructionModal = () => {
		const {
			member,
			isModalOpen,
			toggleModal,
			newMember,
			handleNewCardInstructionSubmit
		} = this.props;

		return (
			<Modal
				isOpen={isModalOpen.newCardInstruction}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Instruksi Pembuatan Kartu Baru</h6>
				</ModalHeader>
				<Form onSubmit={handleNewCardInstructionSubmit}>
					<ModalContent>
						<FormGroup>
							<Input
								type="text"
								className="form-control--large ta-center"
								value={member.item.data.card.id}
								readOnly
								selectOnFocus
							/>
						</FormGroup>
						<h6 className="fw-semibold">Ikuti instruksi berikut untuk membuat kartu member baru.</h6>
						<p>1. Salin (Copy) ID Member yang telah dihasilkan pada kolom diatas.</p>
						<p>2. Buka software MSR605x yang telah diinstalasi.</p>
						<p>3. Tempel (Paste) ID Member yang sudah tersalin pada kolom pertama yang tersedia.</p>
						<p>4. Tekan tombol 'Write Card' hingga jendela kecil berwarna merah keluar.</p>
						<p>5. Gesek kartu magnetic card kosong pada mesin card writer yang ada, tunggu hingga angka pada jendela kecil yang terbuka berubah menjadi angka 2, lalu tutup.</p>
					</ModalContent>
					<ModalFooter className="flex justify-content--flex-end">
						<Button buttonTheme="secondary">
							<small className="fw-semibold tt-uppercase ls-base">Tutup</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}

	render() {
		const {
			member
		} = this.props

		return (
			<div className="inner-view">
				<div className="padding-bottom-2">
					<h5 className="fw-semibold">Pendaftaran Kartu Baru</h5>
					<p className="clr-passive">Masukkan data customer baru dengan benar dan lengkap. Seluruh kolom harus diisi.</p>
				</div>
				<PageBlock className="margin-bottom-5">
					<CashierNewCardForm {...this.props} />
				</PageBlock>
				{member.item.isCreated ? this.renderNewCardInstructionModal() : null}
			</div>
		);
	}
		
}

export default CashierNewCard;
