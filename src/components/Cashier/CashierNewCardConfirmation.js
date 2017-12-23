import React, { Component } from 'react'
import { Modal } from 'reactstrap';
import { ModalFooter, ModalContent, ModalHeader } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, Label } from '../Input';
import { Alert } from '../Alert';
import { Button } from '../Button';

class CashierNewCardConfirmation extends Component {
    render () {
        const{
            newCardData,
            cardTypes,
            toggleModal,
            isModalOpen,
            handleNewCardConfirmationSubmit
        } = this.props;

        let selectedCardName;
        
        if(cardTypes.length) {
            cardTypes.forEach((type) => {
                if(type.id == newCardData.card) {
                    return selectedCardName = type.name;
                }
            })
        }

        return (
            <Modal
                isOpen={isModalOpen.newCardConfirmation}>
                <ModalHeader align="center">
                    <h6 className="fw-semibold">Konfirmasi Data Member</h6>
                </ModalHeader>
                <Form onSubmit={handleNewCardConfirmationSubmit}>
                    <ModalContent>
                        <Alert theme="secondary" className="margin-bottom-2">
                            <p>Silahkan konfirmasi terlebih dahulu informasi calon member sebelum melanjutkan.</p>
                        </Alert>
                        <FormGroup row>
                            <Label className="fw-semibold">Nama Member</Label>
                            <Input
                                type="text"
                                value={newCardData.name}
                                readonly="true"
                            />
                        </FormGroup>
                        <FormGroup row>
                            <Label className="fw-semibold">Alamat Email</Label>
                            <Input
                                type="text"
                                value={newCardData.email}
                                readonly="true"
                            />
                        </FormGroup>
                        <FormGroup row>
                            <Label className="fw-semibold">Nomor Telepon</Label>
                            <Input
                                type="text"
                                value={newCardData.phone}
                                readonly="true"
                            />
                        </FormGroup>
                        <FormGroup row>
                            <Label className="fw-semibold">Alamat</Label>
                            <Input
                                type="textarea"
                                value={newCardData.address}
                                readonly="true"
                            />
                        </FormGroup>
                        <FormGroup row>
                            <Label className="fw-semibold">Tipe Member</Label>
                            <Input
                                type="text"
                                value={selectedCardName}
                                readonly="true"
                            />
                        </FormGroup>
                    </ModalContent>
                    <ModalFooter className="flex justify-content--center">
                        <Button type="button" buttonTheme="danger" className="clr-light" onClick={() => toggleModal('newCardConfirmation')}>
                            <small className="fw-semibold tt-uppercase ls-base">Batal</small>
                        </Button>
                        <Button buttonTheme="primary" className="clr-light margin-left-2">
                            <small className="fw-semibold tt-uppercase ls-base">Lanjutkan</small>
                        </Button>
                    </ModalFooter>
                </Form>

            </Modal>
        )
    }
}

export default CashierNewCardConfirmation