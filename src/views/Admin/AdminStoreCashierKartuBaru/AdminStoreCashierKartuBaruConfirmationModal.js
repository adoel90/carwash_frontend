import React, {Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { Alert } from '../../../components/Alert/index';
import { Row, Column } from '../../../layouts/Grid';
import { Badge } from '../../../components/Badge';

import { Form, FormGroup} from '../../../components/Form';
import { FormField } from '../../../layouts/Form';
import { InputCashier, Input, InputGroup, InputAddon, InputCurrency, Label, Select, Textarea } from '../../../components/Input';
import Currency from '../../../components/Currency';

import { default as CardIcon } from '../../../assets/icons/Business/credit-card-3.svg';

import NumberFormat from 'react-number-format';


class AdminStoreCashierKartuBaruConfirmationModal extends Component{

    render(){

        const { isModalOpen, 
                updateMemberNewCardConfirmation, 
                toggleModal, 
                handleToggleUpdate, 
                handleUpdateCreateMember,
                handleInputChange,
                handleInputChangeInModalUpdate,
                selectedMember, 
                newCardData
            } = this.props;

        return(
            <Modal isOpen={isModalOpen.updateMemberNewCardConfirmation}>
                <ModalHeader align="center">
                    <h6 className="fw-semibold">Buat Member Baru</h6>
                </ModalHeader>
                <Form onSubmit={handleUpdateCreateMember}>
                    <ModalBody>
                        <Row className="margin-bottom-small">
                            <Column md={12}>
                                <FormGroup>
                                    <FormField label="Nama Lengkap">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="far fa-user"></i>
                                            </InputAddon>
                                            <Input
                                                name="name"
                                                type="text"
                                                placeholder={selectedMember.name}
                                                defaultValue={selectedMember.name ? selectedMember.name : "Tulis Nama Lengkap"}
                                                onChange={(e) => handleInputChangeInModalUpdate('selectedMember', e)}
                                                required="true"
                                            />
                                        </InputGroup>
                                    </FormField>
                                </FormGroup>
                                <FormGroup>
                                    <FormField label="Alamat E-mail">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="far fa-envelope"></i>
                                            </InputAddon>
                                            <Input
                                                name="email"
                                                type="email"
                                                placeholder= "Tulis Alamat email"
                                                onChange={(e) => handleInputChange(newCardData, e)}
                                            />
                                        </InputGroup>
                                    </FormField>

                                </FormGroup>
                            </Column>
                        </Row>

                        <div className="flex justify-content--center">
                            <Button theme="danger" type="submit" className="margin-right-small">
                                <small className="fw-semibold tt-uppercase ls-base">Cancel</small>
                            </Button>
                            <Button theme="primary" type="submit" className="margin-right-small">
                                <small className="fw-semibold tt-uppercase ls-base">Simpan</small>
                            </Button>
                        </div>
                    </ModalBody>
                </Form>
            </Modal>
        )
    }
}


export default AdminStoreCashierKartuBaruConfirmationModal;