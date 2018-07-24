import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { Button } from '../../../components/Button';

class AdminStoreCashierKartuBaruDoubleModal extends Component {
    
    render (){

        const { isModalOpen, doubleSeriKartuConfirmation, handleCancelModal} = this.props; 

        return (
            <Modal isOpen={isModalOpen.doubleSeriKartuConfirmation}>
                <ModalHeader align="center">
                    <h6 className="fw-semibold">INFO :</h6>
                </ModalHeader>
                <ModalBody>
                    <Panel theme="danger">
                        <PanelHeader >
                            <h4 className="fw-semibold" > Nomor Kartu DOUBLE !</h4>
                            <p>Nomor kartu ini telah di gunakan, silahkan 'Tulis Kartu Baru' !</p>
                        </PanelHeader>
                    </Panel>
                </ModalBody>
                <ModalFooter className="flex justify-content--flex-end">
                    <Button className="margin-right-small" onClick={(e) => handleCancelModal(e)}> OK Mengerti </Button>
                </ModalFooter>
            </Modal>
        )
    }
};

export default AdminStoreCashierKartuBaruDoubleModal;

