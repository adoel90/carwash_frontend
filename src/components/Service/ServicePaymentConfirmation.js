import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon } from '../Input';
import { Button } from '../Button';
import { Alert } from '../Alert';
import Currency from '../Currency';

import { default as CashierIcon } from '../../assets/icons/Business/cashier.svg';

class ServicePaymentConfirmation extends Component {
    render() {
        const {
            member,
            isModalOpen,
            toggleModal,
            selectedService,
            handleServicePaymentSubmit,
        } = this.props;

        const renderMemberContent = () => {
            if(member.balance >= selectedService.price) {
                return (
                    <ModalContent className="flex flex-column justify-content--center align-items--center ta-center">
                        <img style={{ width: '100px' }} src={CashierIcon} />
                        <h3 className="fw-bold clr-primary"><Currency value={selectedService.price} /></h3>
                        <Alert theme="secondary">
                            <p>Saldo Anda sebesar <span className="fw-semibold"><Currency value={member.balance} /></span> mencukupi untuk pembayaran <span className="fw-semibold">{selectedService.name}</span>. <br /> Silahkan konfirmasi kembali pilihan Anda sebelum melanjutkan.</p>
                        </Alert>
                    </ModalContent>
                )
            }
            else {
                return (
                    <ModalContent className="flex flex-column justify-content--center align-items--center ta-center">
                        <img style={{ width: '100px' }} src={CashierIcon} />
                        <h3 className="fw-bold clr-danger"><Currency value={selectedService.price} /></h3>
                        <p>Maaf, saldo Anda sebesar <span className="fw-semibold"><Currency value={member.balance} /></span> tidak cukup untuk melakukan pembayaran <span className="fw-semibold">{selectedService.name}</span>. Silahkan ke counter kasir untuk mengisi saldo terlebih dahulu.</p>
                        
                    </ModalContent>
                )
            }
        }
        
        return (
            <Modal 
                isOpen={isModalOpen.paymentConfirmation} 
                toggle={() => toggleModal('paymentConfirmation')}>
                <Form onSubmit={handleServicePaymentSubmit}>
                    <ModalHeader align="center">
                        <h6 className="fw-semibold">Konfirmasi Layanan: <span className="fw-bold">{selectedService.name}</span></h6>
                    </ModalHeader>
                    {renderMemberContent()}
                    <ModalFooter className="flex">
                        <Button type="button" buttonTheme="danger" className="clr-light" buttonFull onClick={() => toggleModal('paymentConfirmation')}>
                            <small className="tt-uppercase ls-base fw-semibold">Kembali</small>
                        </Button>
                        {
                            member.balance >= selectedService.price
                            ? <Button type="submit" buttonTheme="primary" className="clr-light margin-left-2" buttonFull>
                                <small className="tt-uppercase ls-base fw-semibold">Bayar</small>
                            </Button>
                            : null
                        }
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

export default ServicePaymentConfirmation;