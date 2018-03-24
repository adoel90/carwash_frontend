
import React, { Component } from 'react';
import { Button } from '../../components/Button';
// import { Modal } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../components/Modal';
import { Form, FormGroup } from '../../components/Form';
import { Input, Label, InputAddon, InputGroup } from '../Input'
import { Row } from '../../layouts/Grid';
import { TableSet, row, TableSetCustomer} from '../Table';
import { Alert } from '../../components/Alert';
import Currency from '../Currency';

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
	}

	render() {

		const { table } = this.state;
		const {
			isModalOpen,
			toggleModal,
			handlePaymentCheckout, //LOM KE PAKE || GA KE PAKE KALI 
			handleServicePaymentSubmit,
			selectedMenuList,
			grandTotal
        } = this.props;
        
		// console.log(this.props.selectedMenuList);
		
		const renderStorePaymentDetailModal = () => {

			return (
				<Modal
					className="modal-dialog--large"
					isOpen={isModalOpen.paymentConfirmation}
					toggle={() => toggleModal('paymentConfirmation')}>
					<ModalHeader align="center">
						<h6 className="fw-semibold">Konfirmasi Pembayaran</h6>
					</ModalHeader>


					{/* <Form onSubmit={handlePaymentCheckout}> */}
					<Form onSubmit={handleServicePaymentSubmit}>
						<ModalBody>
							<div className="payment-detail">
							<Alert theme="secondary" className="flex align-items--center justify-content--center margin-bottom-2">
								<i className="ion-alert-circled icon icon--base margin-right-2"></i>
								<p>Silahkan periksa terlebih dahulu pesanan customer sebelum checkout!</p>
							</Alert>
							<TableSetCustomer
								columns={table.columns}
								rows={selectedMenuList}
								isStriped
								isHoverable
								{...this.props}
							/>

							<div className="flex flex-column align-items--flex-end padding-top-3">
								<small className="tt-uppercase ls-base fw-bold">Total yang harus dibayar</small>
								<h4 className="clr-primary"><Currency value={grandTotal} /></h4>
							</div>
						</div>
						</ModalBody>
						<ModalFooter className="flex justify-content--center">
							<Button type="button" buttonTheme="danger" className="clr-light margin-right-2" onClick={() => toggleModal('paymentConfirmation')}>
								<small className="fw-semibold tt-uppercase ls-base">Kembali</small>
							</Button>
							<Button type="submit" buttonTheme="primary" className="clr-light">
								<small className="fw-semibold tt-uppercase ls-base">Selanjutnya</small>
							</Button>
						</ModalFooter>					
					</Form>
				</Modal>
			)

		}
        
		return (
			<div>
				{renderStorePaymentDetailModal()}
			</div>
		);
	}
}

export default StorePaymentDetail;