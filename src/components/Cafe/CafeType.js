import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

import { CafeMenuList, CafePaymentDetail } from '../Cafe';
import SearchBar from '../SearchBar';
import { Button } from '../Button';
import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, Label, InputAddon, InputGroup } from '../Input'
import { Row } from '../Grid';
import { default as CardIcon } from '../../assets/icons/Business/credit-card-3.svg';
import Currency from '../Currency';

class CafeType extends Component {
	constructor() {
		super();
		this.renderCafeMenuList = this.renderCafeMenuList.bind(this);
		this.renderPaymentConfirmationModal = this.renderPaymentConfirmationModal.bind(this);
	}

	// renderPaymentProcessModal = () => {
	// 	const {
	// 		member,
	// 		isModalOpen,
	// 		toggleModal,
	// 		paymentProcess,
	// 		grandTotal,
	// 		handleInputChange,
	// 		handlePaymentProcessSubmit,
	// 		handlePaymentMemberAuthentication
	// 	} = this.props;
	//
	// 	return (
	// 		<Modal
	// 			isOpen={isModalOpen.paymentProcess}
	// 			toggle={() => toggleModal('paymentProcess')}>
	// 			<ModalHeader align="center">
	// 				<h6 className="fw-semibold">Proses Pembayaran</h6>
	// 			</ModalHeader>
	// 			<Form onSubmit={handlePaymentMemberAuthentication}>
	// 				<ModalContent className="ta-center">
	// 					<div className="padding-bottom-2">
	// 						<p>Silahkan gesek kartu member pada kolom dibawah untuk mendapatkan informasi member.</p>
	// 					</div>
	// 					<Input
	// 						name="card"
	// 						type="number"
	// 						className="form-control--large ta-center"
	// 						onChange={(e) => handleInputChange(paymentProcess, e)}
	// 						autoFocus
	// 						selectOnFocus
	// 					/>
	// 					{ this.renderMemberInformation() }
	// 				</ModalContent>
	// 			</Form>
	// 			<Form onSubmit={handlePaymentProcessSubmit}>
	// 				<ModalFooter className="flex justify-content--center">
	// 					<Button type="button" buttonTheme="danger" className="clr-light margin-right-2" onClick={() => toggleModal('paymentProcess')}>
	// 						<small className="fw-semibold tt-uppercase ls-base">Kembali</small>
	// 					</Button>
	// 					<Button buttonTheme="primary" className="clr-light" disabled={!member.isLoaded || member.data.balance < grandTotal}>
	// 						<small className="fw-semibold tt-uppercase ls-base">Bayar</small>
	// 					</Button>
	// 				</ModalFooter>
	// 			</Form>
	// 		</Modal>
	// 	)
	// }

	renderPaymentConfirmationModal = () => {
		const {
			isModalOpen,
			toggleModal
		} = this.props;

		return (
			<Modal
				className="modal-dialog--large"
				isOpen={isModalOpen.paymentConfirmation}
				toggle={() => toggleModal('paymentConfirmation')}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Konfirmasi Pembayaran</h6>
				</ModalHeader>
				<Form>
					<ModalContent>
						<CafePaymentDetail {...this.props} />
					</ModalContent>
					<ModalFooter>

					</ModalFooter>
				</Form>
			</Modal>
		)
	}

	renderCafeMenuList = () => {
		const {
			cafe,
			cafeList,
			type
		} = this.props;

		if(cafe.list.isFetching) {
			return <p>Sedang memuat daftar menu. Silahkan tunggu sebentar...</p>
		}

		if(cafe.list.isLoaded) {
			return <CafeMenuList {...this.props} />
		}
	}

	render() {
		const {
			type,
			cafe,
			cafeList
		} = this.props;

		return (
			<div className="inner-view">
				<Row>
					<div className="column-8">
						<div className="heading padding-bottom-2">
							<h5 className="fw-semibold">Daftar Menu {type.name}</h5>
							<p className="clr-passive">Pilih menu dari daftar berikut sesuai dengan yang diinginkan customer.</p>
						</div>
					</div>
				</Row>
				{ this.renderCafeMenuList() }
				{ this.renderPaymentConfirmationModal() }
			</div>
		);
	}
}

export default CafeType;
