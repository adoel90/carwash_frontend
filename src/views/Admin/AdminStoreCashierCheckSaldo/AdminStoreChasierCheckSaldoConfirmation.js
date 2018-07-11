import React, {Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { Form } from '../../../components/Form';
import { Alert } from '../../../components/Alert/index';
import { Badge } from '../../../components/Badge';
import { default as CardIcon } from '../../../assets/icons/Business/credit-card-3.svg';
import Currency from '../../../components/Currency';
import NumberFormat from 'react-number-format';

class AdminStoreChasierCheckSaldoConfirmation extends Component{

    render (){

        const { isModalOpen, saldoConfirmation, selectedMember, toggleModal }= this.props;

        const currencyStyle = {
            'font-size': '27px'
        }

        return (

            <Modal
                isOpen={isModalOpen.saldoConfirmation}>
                <ModalHeader align="center">
                    <h6 className="fw-semibold">Saldo Customer : {selectedMember.name} </h6>
                </ModalHeader>
                <Form>
					<ModalBody className="flex flex-column justify-content--center">
						<Alert theme="secondary" className="flex align-items--center margin-bottom-small">
							<i className="ion-alert-circled icon icon--base margin-right-small"></i>
							<p><b>Setelah Cek saldo berhasil, jangan lupa mengembalikan kartu kepada customer.</b></p>
						</Alert>
						<div className="flex flex-column align-items--center justify-content--center ta-center">
							<img src={CardIcon} style={{ width: '100px' }} />
							<div className="flex-column margin-bottom-small">
								<h4 className="clr-primary">{selectedMember.name}</h4>
								<Badge theme="secondary">
									<small className="fw-semibold tt-uppercase ls-base">{selectedMember.card ? selectedMember.card.type.name: null}</small>
								</Badge>
								<p><b>Sisa saldo Anda : <Currency style={currencyStyle} value={selectedMember.balance}/></b></p>
							</div>
						</div>
					</ModalBody>
					<ModalFooter className="flex justify-content--center">
						<Button type="button" buttonTheme="danger" className="clr-light" onClick={() => toggleModal('saldoConfirmation')}>
							<small className="fw-semibold tt-uppercase ls-base">Kembali</small>
						</Button>
					
					</ModalFooter>
				</Form>
            </Modal>
        )
    }

}

export default AdminStoreChasierCheckSaldoConfirmation;