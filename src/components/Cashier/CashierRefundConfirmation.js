import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
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
            selectedMember,
            handleRefundSubmit
        } = this.props;
        
        return (
            <Modal
                isOpen={isModalOpen.refundConfirmation}>
                <ModalHeader align="center">
                    <h6 className="fw-semibold">Konfirmasi Refund</h6>
                </ModalHeader>
                <Form onSubmit={(e) => handleRefundSubmit(e)}>
                    <ModalContent className="flex flex-column justify-content--center">
                        <Alert theme="secondary" className="flex align-items--center margin-bottom-2">
                            <i className="ion-alert-circled icon icon--base margin-right-2"></i>
                            <p>Silahkan konfirmasi terlebih dahulu informasi member yang tercantum sebelum melanjutkan proses refund.</p>                            
                        </Alert>
                        <div className="flex flex-column align-items--center justify-content--center ta-center">
                            <img src={CardIcon} style={{ width: '100px' }} />
                            <div className="flex-column">
                                <h5 className="clr-primary">{selectedMember.name}</h5>
                                <h6 className="fw-semibold">
                                    {selectedMember.card ? selectedMember.card.id : null}
                                    
                                </h6>
                                <p>Sisa Saldo: <Currency value={selectedMember.balance}/></p>
                            </div>
                            <Badge theme="secondary">
                                <small className="fw-semibold tt-uppercase ls-base">{selectedMember.card ? selectedMember.card.type.name: null}</small>
                            </Badge>
                        </div>
                    </ModalContent>
                    <ModalFooter className="flex justify-content--center">
                        <Button type="button" buttonTheme="danger" className="clr-light" onClick={() => toggleModal('refundConfirmation')}>
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