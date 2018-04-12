import React, {Component } from 'react';

import { Modal, ModalHeader, ModalBody, ModalFooter } from '../Modal';


class CashierTopUpPaymentCheckout extends Component{

    

    render() {

        const { isModalOpen, toggleModal, } = this.props;

        return (
            <Modal
                isOpen={isModalOpen.topUpPaymentCheckout}
                toggle={() => toggleModal('topUpPaymentCheckout')}>

                <ModalBody className="flex justify-content--center align-item--center flex-column align-center">
                    <i className="fas fa-exclamation-circle fa-7x clr-danger"></i>
                    <h4 className="margin-top-large">Konfirmasi Ulang</h4>
                    <p>Apakah Anda yakin atas pilihan Anda? (Pembayaran tidak dapat dibatalkan atau diuangkan kembali)</p>
                </ModalBody>
            </Modal>
        )
    }
}

export default CashierTopUpPaymentCheckout;