import React, { Component } from 'react';
import { Button } from '../../../components/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { Form, FormGroup } from '../../../components/Form';
import { Input, Label, InputAddon, InputGroup, SwitchSquare } from '../../../components/Input'
import { Container, Row, Column } from '../../../layouts/Grid';
import { TableSetOld } from '../../../components/Table';
import { Alert } from '../../../components/Alert';
import Currency from '../../../components/Currency';

class AdminTransactionDetail extends Component {
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
	}

	render() {
		const { table } = this.state;
		const {
			isModalOpen,
			toggleModal,
			handlePaymentCheckout,
			selectedMenuItem,
			grandTotal,
			handleInputChange,
			dataTransaction,
			store,
			handlePrintMenuSelected,
			isDisabledButton
		} = this.props;

		const renderPrintMenuList = () => {
			console.log("Wew");

		}

		return (
			<Modal
				className="modal-dialog--large"
				isOpen={isModalOpen.paymentConfirmation}
				toggle={() => toggleModal('paymentConfirmation')}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Konfirmasi Pembayaran</h6>
				</ModalHeader>
				<Form onSubmit={handlePaymentCheckout}>
					<ModalBody>
						<div className="payment-detail">
						<Alert theme="secondary" className="flex align-items--center justify-content--center margin-bottom-2">
							<i className="ion-alert-circled icon icon--base margin-right-2"></i>
							<p>Silahkan periksa terlebih dahulu pesanan Anda sebelum checkout!</p>
						</Alert>
						<TableSetOld
							className="margin-top-base"
							columns={table.columns}
							rows={selectedMenuItem}
							striped
							hoverable
							fullWidth
							{...this.props}
						/>

						{/* Diskon and Markup Feature */}
						<Row className="flex justify-content--space-between padding-top-small">
							<Column md={10}>
								<small className="tt-uppercase ls-base fw-bold">Diskon %</small>
							</Column>
							<Column md={2}>
								<Input name="discount" type="number" onChange={(e) => handleInputChange(dataTransaction, e)} placeholder="%" />
							</Column>
						</Row>
						<Row className="flex justify-content--space-between padding-top-small">
							<Column md={10}>
								<small className="tt-uppercase ls-base fw-bold">Mark Up %</small>
							</Column>
							<Column md={2}>
								<Input name="markup" type="number" onChange={(e) => handleInputChange(dataTransaction, e)} placeholder="%" />
							</Column>
						</Row>
						<Row className="flex justify-content--space-between padding-top-small">
							<Column md={10}>
								<small className="tt-uppercase ls-base fw-bold">Total yang harus dibayar</small>
							</Column>
							<Column md={2}>
								<h4 className="clr-primary align-right"><Currency value={grandTotal} /></h4>
							</Column>
						</Row>
					</div>
					</ModalBody>
					<ModalFooter className="flex justify-content--center">
						<Button type="button" theme="danger" className="clr-light margin-right-small" onClick={() => toggleModal('paymentConfirmation')}>
							<small className="fw-semibold tt-uppercase ls-base">Kembali</small>
						</Button>
						{/* <Button onClick={() => toggleModal('paymentConfirmation')} type="submit" theme="warning" className="clr-light"> */}
						<Button onClick={handlePrintMenuSelected} type="submit" theme="warning" className="clr-light margin-right-small">
							<small className="fw-semibold tt-uppercase ls-base">Print</small>
						</Button>
						<Button disabled={isDisabledButton === true ? true : false} type="submit" theme="primary" className="clr-light margin-right-small">
							<small className="fw-semibold tt-uppercase ls-base">Bayar Sekarang</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		);
	}

}

export default AdminTransactionDetail;