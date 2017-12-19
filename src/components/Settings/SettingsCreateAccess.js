import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { ModalContent, ModalHeader, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { InputGroup, InputAddon, Label, Input, InputSwitch } from '../Input';
import { ListGroup, ListGroupItem } from '../List/index';
import { Row } from '../Grid/index';
import { Button } from '../Button/index';

class SettingsCreateAccess extends Component {
    render () {
        const {
            isModalOpen,
            toggleModal,
            moduleList,
            newAccess,
            selectedAccess,
            handleInputChange,
            handleModuleChange,
            handleCreateAccessSubmit
        } = this.props;
        
        const renderAccessList = () => {
            const checkModule = (module) => {
                if(newAccess.module) {
                    return newAccess.module.some((item) => {
                        return module.id == item.id
                    })

                }
            }
            
            if(moduleList.isFetching) {
                return <p>Sedang memuat seluruh modul. Tunggu sebentar...</p>
            }
            
            if(moduleList.isLoaded) {
                return moduleList.data.map((item, i) => {
                    return (
                        <div className="column-6" key={i}>
                            <ListGroupItem className="flex justify-content--space-between">
                                <Label className="fw-semibold">{item.name}</Label>
                                <InputSwitch
                                    onChange={(e) => handleModuleChange(newAccess, item, e)}
                                    value={checkModule(item)}
                                />
                            </ListGroupItem>
                        </div>
                    )
                })    
            }
        }
        
        return (
            <Modal
                isOpen={isModalOpen.createAccess}
                toggle={() => toggleModal('createAccess')}>
                <ModalHeader align="center">
                    <h6 className="fw-semibold">Buat Level Akses Baru</h6>
                </ModalHeader>
                <Form onSubmit={handleCreateAccessSubmit}>
                    <ModalContent>
                        <FormGroup>
                            <Label className="fw-semibold">Nama</Label>
                            <InputGroup>
                                <InputAddon>
                                    <i className="ion-person"></i>
                                </InputAddon>
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Masukkan nama akses level"
                                    onChange={(e) => handleInputChange(newAccess, e)}
                                    value={newAccess.name}
                                    required="true"
                                />
                            </InputGroup>
                        </FormGroup>
                        <ListGroup>
                            <Row>
                                {renderAccessList()}
                            </Row>
                        </ListGroup>
                    </ModalContent>
                    <ModalFooter className="flex justify-content--flex-end">
                        <Button type="button" buttonTheme="danger" className="clr-light" onClick={() => toggleModal('createAccess')}>
                            <small className="fw-semibold tt-uppercase ls-base">Batal</small>
                        </Button>
                        <Button buttonTheme="primary" className="clr-light margin-left-2">
                            <small className="fw-semibold tt-uppercase ls-base">Terapkan</small>
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        )
    }
}

export default SettingsCreateAccess