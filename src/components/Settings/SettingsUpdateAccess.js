import React, { Component } from 'react'
import { Modal } from 'reactstrap';
import { ModalContent, ModalHeader, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { InputGroup, InputAddon, Label, Input, InputSwitch } from '../Input';
import { ListGroup, ListGroupItem } from '../List/index';
import { Row } from '../Grid/index';

class SettingsUpdateAccess extends Component {
    render () {
        const {
            isModalOpen,
            toggleModal,
            selectedAccess,
            moduleList,
            handleInputChange,
            handleUpdateAccessSubmit
        } = this.props;

        const renderAccessList = () => {
            if(moduleList.isFetching) {
                return <p>Sedang memuat modul-modul yang ada. Tunggu sebentar...</p>
            }
            
            if(moduleList.isLoaded) {
                return moduleList.data.map((item) => (
                    <div className="column-6">
                        <ListGroupItem className="flex justify-content--space-between">
                            <Label className="fw-semibold">{item.name}</Label>
                            <InputSwitch
                            />
                        </ListGroupItem>
                    </div>
                ))    
            }
        }
        
        return (
            <Modal
                isOpen={isModalOpen.updateAccess}
                toggle={() => toggleModal('updateAccess')}>
                <ModalHeader align="center">
                    <h6 className="fw-semibold">Ubah Pengaturan Akses: <span className="fw-bold">{selectedAccess.name}</span></h6>
                </ModalHeader>
                <Form onSubmit={handleUpdateAccessSubmit}>
                    <ModalContent>
                        <FormGroup>
                            <Label className="fw-semibold">Nama</Label>
                            <InputGroup>
                                <InputAddon>
                                    <i className="ion-person"></i>
                                </InputAddon>
                                <Input
                                    type="text"
                                    placeholder="Masukkan nama akses level"
                                    onChange={(e) => handleInputChange(selectedAccess, e)}
                                />
                            </InputGroup>
                        </FormGroup>
                        <ListGroup>
                            <Row>
                                {renderAccessList()}
                            </Row>
                        </ListGroup>
                    </ModalContent>
                    <ModalFooter>

                    </ModalFooter>
                </Form>
            </Modal>
        )
    }
}

export default SettingsUpdateAccess