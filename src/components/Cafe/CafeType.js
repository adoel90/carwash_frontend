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
		this.renderPaymentDetailModal = this.renderPaymentDetailModal.bind(this);
		this.renderPaymentProcessModal = this.renderPaymentProcessModal.bind(this);
		this.renderMemberInformation = this.renderPaymentInformation.bind(this);
	}

	renderPaymentInformation = () => {
		const {
			member
		} = this.props;

		if(member.isLoaded) {
			return (
				<div>
					<img src={CardIcon} style={{ width: '150px' }} />
					<h5>{member.data.name}</h5>
					<h5 className="fw-semibold clr-primary">
						<NumberFormat
							displayType={'text'}
							format="#### #### #### ####"
							value={member.data.card.id}
						/>
					</h5>
					<p>Saldo member sebesar <span className="clr-primary fw-semibold"><Currency value={member.data.balance} /></span> cukup untuk melakukan pembayaran.</p>
				</div>
			)
		}
	}

	renderPaymentProcessModal = () => {
		const {
			member,
			isModalOpen,
			toggleModal,
			paymentProcess,
			handleInputChange,
			handlePaymentProcessSubmit,
			handlePaymentMemberAuthentication
		} = this.props;

		return (
			<Modal
				isOpen={isModalOpen.paymentProcess}
				toggle={() => toggleModal('paymentProcess')}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Proses Pembayaran</h6>
				</ModalHeader>
				<Form onSubmit={handlePaymentProcessSubmit}>
					<ModalContent className="ta-center">
						<div className="padding-bottom-2">
							<p>Silahkan gesek kartu member pada kolom dibawah untuk mendapatkan informasi member.</p>
						</div>
						<Form onSubmit={handlePaymentMemberAuthentication}>
							<Input
								name="card"
								type="number"
								className="form-control--large ta-center"
								onChange={(e) => handleInputChange(paymentProcess, e)}
								autoFocus
								selectOnFocus
							/>
						</Form>
						{ this.renderMemberInformation() }
					</ModalContent>
					<ModalFooter className="flex justify-content--center">
						<Button type="button" buttonTheme="danger" className="clr-light margin-right-2" onClick={() => toggleModal('paymentProcess')}>
							<small className="fw-semibold tt-uppercase ls-base">Kembali</small>
						</Button>
						<Button buttonTheme="primary" className="clr-light" disabled={!member.isLoaded}>
							<small className="fw-semibold tt-uppercase ls-base">Bayar</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}

	renderPaymentDetailModal = () => {
		const {
			isModalOpen,
			toggleModal,
			handlePaymentDetailSubmit
		} = this.props;

		return (
			<Modal
				className="modal-dialog--large"
				isOpen={isModalOpen.paymentDetail}
				toggle={() => toggleModal('paymentDetail')}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Detil Pembayaran</h6>
				</ModalHeader>
				<Form onSubmit={handlePaymentDetailSubmit}>
					<ModalContent>
						<div className="padding-bottom-2">
							<p className="clr-passive">Berikut merupakan daftar menu yang telah dipilih. Silahkan cek kembali pesanan dari customer sebelum melanjutkan.</p>
						</div>
						<CafePaymentDetail {...this.props} />
					</ModalContent>
					<ModalFooter className="flex justify-content--center">
						<Button type="button" buttonTheme="secondary" className="clr-dark margin-right-2" onClick={() => toggleModal('paymentDetail')}>
							<small className="fw-semibold tt-uppercase ls-base">Tambah Menu Lain</small>
						</Button>
						<Button buttonTheme="primary" className="clr-light">
							<small className="fw-semibold tt-uppercase ls-base">Selanjutnya</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}

	renderCafeMenuList = () => {
		const {
			cafe,
			cafeMenuList,
			type
		} = this.props;

		if(cafe.isLoaded) {
			return <CafeMenuList {...this.props} />
		}
	}

	render() {
		const {
			type,
			cafe,
			cafeMenuList
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
				{ this.renderPaymentDetailModal() }
				{ this.renderPaymentProcessModal() }
			</div>
		);
	}
}

export default CafeType;
