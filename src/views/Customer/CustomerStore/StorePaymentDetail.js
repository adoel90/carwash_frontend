import React, { Component } from 'react';
import { Button } from '../../../components/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { Form, FormGroup } from '../../../components/Form';
import { Input, Label, InputAddon, InputGroup } from '../../../components/Input'
import { Container, Row, Column } from '../../../layouts/Grid';
import { TableSetOld } from '../../../components/Table';
import { Alert } from '../../../components/Alert';
import Currency from '../../../components/Currency';
import { default as CashierIcon } from '../../../assets/icons/Business/cashier.svg';

class StorePaymentDetail extends Component {
	constructor() {
		super();
		this.state = {
			table: {
				columns: [
					{ id: 1, accessor: 'name', title: 'Nama Menu' },
					{ id: 2, accessor: 'price', title: 'Harga (per satuan)', isCurrency: true },
					{ id: 3, accessor: 'quantity', title: 'Jumlah', size: 'small', isEditable: true },
					{ id: 4, accessor: 'totalPrice', title: 'Total Harga', isCurrency: true }
				]
			}
		}

		this.renderMemberContent = this.renderMemberContent.bind(this);
	}

	renderMemberContent = () => {
		const {
			memberData,
			selectedMenuList
		} = this.props;

		let price = selectedMenuList[0] ? selectedMenuList[0].price : 0;
		let name = selectedMenuList[0] ? selectedMenuList[0].name : 0;

		if(memberData.balance > price) {
			return (
				<div className="flex flex-column justify-content--center align-items--center">
					<img style={{ width: '100px' }} src={CashierIcon} />
					<h3 className="currency currency-extra-large fw-bold clr-primary margin-top-base"><Currency value={price} /></h3>
					<Alert className="margin-top-base" theme="secondary">
						<p>Saldo Anda sebesar <span className="fw-semibold"><Currency value={memberData.balance} /></span> mencukupi untuk pembayaran <span className="fw-semibold">{name}</span>. <br /> Silahkan konfirmasi kembali pilihan Anda sebelum melanjutkan.</p>
					</Alert>
				</div>
			)
		} else {
			return (
				<div className="flex flex-column justify-content--center align-items--center">
					<img style={{ width: '100px' }} src={CashierIcon} />
					<h3 className="currency currency-extra-large fw-bold clr-primary margin-top-base"><Currency value={price} /></h3>
					<Alert className="margin-top-base" theme="warning">
						<p>Maaf, saldo Anda sebesar <span className="fw-semibold"><Currency value={memberData.balance} /></span> tidak cukup untuk melakukan pembayaran <span className="fw-semibold">{name}</span>. Silahkan ke counter kasir untuk mengisi saldo terlebih dahulu.</p>
					</Alert>
				</div>
			)
		}
	}

	render() {
		const { table } = this.state;
		const {
			isModalOpen,
			toggleModal,
			handlePaymentCheckout,
			handlePaymentCheckoutSubmit,
			selectedMenuList,
			grandTotal,
			store,
			memberData
		} = this.props;

		let discountLenght = store.discount.isLoaded ? store.discount.data.data.result.promo.length : null;
		let discount = discountLenght > 0 ? store.discount.data.data.result.promo[0].price : 0;
		let dataDiscount = selectedMenuList.length > 0 ? selectedMenuList[0].trueDiscount : null;

		let nameService = selectedMenuList[0] ? selectedMenuList[0].name : null;
		let price = selectedMenuList[0] ? selectedMenuList[0].price : null;

		return (
			<Modal
				className="modal-dialog--large"
				isOpen={isModalOpen.paymentConfirmation}
				toggle={() => toggleModal('paymentConfirmation')}>
				<ModalHeader className="align-center">
					<h5 className="flex justify-content--center fw-semibold">Konfirmasi Layanan: <h5 className="margin-left-small fw-bold">{nameService}</h5></h5>
				</ModalHeader>
				<Form onSubmit={handlePaymentCheckoutSubmit}>
					<ModalBody>
						<div className="payment-detail">
							{ this.renderMemberContent() }
						</div>
					</ModalBody>
					<ModalFooter className="flex justify-content--center">
						<Button type="button" theme="danger" className="clr-light margin-right-small" onClick={() => toggleModal('paymentConfirmation')} size="large" block>
							<small className="fw-semibold tt-uppercase ls-base">Kembali</small>
						</Button>
						{
							memberData.balance > price ?
								<Button type="submit" theme="primary" className="clr-light" size="large" block>
									<small className="fw-semibold tt-uppercase ls-base">Bayar</small>
								</Button>
							: null
						}
					</ModalFooter>
				</Form>
			</Modal>
		);
	}

}

export default StorePaymentDetail;