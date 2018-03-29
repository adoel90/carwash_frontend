import React, { Component } from 'react';
// import { Modal } from 'reactstrap';
// import { ModalHeader, ModalContent, ModalFooter, Modal } from '../Modal';
import { ModalHeader, ModalContent, ModalFooter, Modal, ModalBody } from '../../components/Modal';
import { Button } from '../Button';
import { Form } from '../Form';
import { Alert } from '../Alert/index';
import { Badge } from '../Badge';
import { default as CardIcon } from '../../assets/icons/Business/credit-card-3.svg';
import Currency from '../Currency';
import NumberFormat from 'react-number-format';

class CashierRefundConfirmation extends Component {
	render() {
		const {
			member,
			isModalOpen,
			toggleModal,
			selectedMemberRefund,
			handleRefundSubmit
		} = this.props;
		
		return (
			<Modal
				isOpen={isModalOpen.refund}>
				<ModalHeader align="center">
					<h3 className="fw-semibold">Konfirmasi Refund</h3>
				</ModalHeader>
				<Form onSubmit={(e) => handleRefundSubmit(e)}>
					{/* <ModalContent className="flex flex-column justify-content--center"> */}
					<ModalBody>
						<Alert theme="secondary" className="flex align-items--center margin-bottom-2">
							<i className="ion-alert-circled icon icon--base margin-right-2"></i>
							<p>Harap periksa kembali informasi berikut sebelum melanjutkan untuk menghindari hal yang tidak diinginkan. Setelah proses refund berhasil, jangan lupa untuk mengambil kartu member.</p>
						</Alert>
						<div className="flex flex-column align-items--center justify-content--center ta-center">
							<img src={CardIcon} style={{ width: '100px' }} />
							<h6 className="fw-semibold">
									{selectedMemberRefund.card ? selectedMemberRefund.card.id : null}
							</h6>
							<div className="flex-column margin-bottom-3">
								<h4 className="clr-primary">{selectedMemberRefund.name}</h4>
								
								<h3><b>SISA SALDO : <Currency value={selectedMemberRefund.balance}/></b></h3><br />
								<Badge theme="secondary">
									<small className="fw-semibold tt-uppercase ls-base">{selectedMemberRefund.card ? selectedMemberRefund.card.type.name: null}</small>
								</Badge>
							</div>
						</div>
					{/* </ModalContent> */}
					</ModalBody>
					<ModalFooter className="flex justify-content--center">
						<Button type="button" buttonTheme="danger" className="margin-right-small" onClick={() => toggleModal('refund')}>
							<small className="fw-semibold tt-uppercase ls-base">Kembali</small>
						</Button>
						<Button type="submit" buttonTheme="primary" className="margin-left-2 clr-light">
							<small className="fw-semibold tt-uppercase ls-base">Proses Refund</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		);   
	}
}

export default CashierRefundConfirmation;