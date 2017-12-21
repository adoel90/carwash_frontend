import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { ModalContent, ModalHeader, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { InputGroup, InputAddon, Label, Input, InputSwitch } from '../Input';
import { ListGroup, ListGroupItem } from '../List';
import { Row } from '../Grid';
import { Button } from '../Button';
import { Alert } from '../Alert';

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
                                <Label>{item.name}</Label>
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

        const renderAlert = () => {
        	if(newAccess.isError) {
        		return (
        			<Alert theme="danger" className="flex clr-light margin-bottom-2">
        				<i className="ion-alert-circled margin-right-2"></i>
        				<p>{newAccess.error.message}</p>
        			</Alert>
        		)
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
                    	{ renderAlert() }
                        <FormGroup>
                            <Label className="fw-semibold h6">Nama Akses Level</Label>
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
                        	<h6>Pilih Modul</h6>
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