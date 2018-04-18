import React, {Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { Button } from '../../../components/Button';

class CashierTopUpPaymentCheckout extends Component{

    render() {

        const { isModalOpen, toggleModal, handleTopupSubmit } = this.props;

        return (
            <Modal
                isOpen={isModalOpen.topUpPaymentCheckout}
                toggle={() => toggleModal('topUpPaymentCheckout')}>
                <ModalBody className="flex justify-content--center align-item--center flex-column align-center">
                    <i className="fas fa-exclamation-circle fa-7x clr-danger"></i>
                    <h4 className="margin-top-large">Konfirmasi Ulang</h4>
                    <h6>Apakah Anda yakin ingin menlanjutkan pembayaran ? </h6> 
                    <p><i>(Pembayaran tidak dapat dibatalkan atau diuangkan kembali)</i></p>
                </ModalBody>
                <ModalFooter className="flex justify-content--center">
                    <Button type="button" buttonTheme="danger" className="clr-light" onClick={() => toggleModal('paymentCheckout')}>
                        <small className="fw-semibold tt-uppercase ls-base">Kembali</small>
                    </Button>
                    <Button type="button" buttonTheme="primary" className="clr-light margin-left-small" onClick={handleTopupSubmit}>
                    <small className="fw-semibold tt-uppercase ls-base">Ya, lanjutkan</small>
                    </Button>
                </ModalFooter>


            </Modal>
        )
    }
}
export default CashierTopUpPaymentCheckout;
