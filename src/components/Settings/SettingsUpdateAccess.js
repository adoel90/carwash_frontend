import React, { Component } from 'react'
import { Modal } from 'reactstrap';
import { ModalContent, ModalHeader, ModalFooter } from '../Modal';
import { Form } from '../Form';

class SettingsUpdateAccess extends Component {
    render () {
        const {
            isModalOpen,
            toggleModal,
            selectedAccess
        } = this.props;
        
        return (
            <Modal
                isOpen={isModalOpen.updateAccess}
                toggle={() => toggleModal('updateAccess')}>
                <ModalHeader align="center">
                    <h6 className="fw-semibold">Ubah Pengaturan Akses: <span className="fw-bold">{selectedAccess.name}</span></h6>
                </ModalHeader>
                <Form>
                    <ModalContent>

                    </ModalContent>
                    <ModalFooter>

                    </ModalFooter>
                </Form>
            </Modal>
        )
    }
}

export default SettingsUpdateAccess