import React, { Component } from 'react'
import { Modal } from 'reactstrap';
import { ModalContent, ModalHeader, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { InputGroup, InputAddon, Label, Input, InputSwitch } from '../Input';
import { ListGroup, ListGroupItem } from '../List';
import { Row } from '../Grid';
import { Button } from '../Button';
import { Alert } from '../Alert';

class SettingsUpdateAccess extends Component {
    render () {
        const {
            isModalOpen,
            toggleModal,
            selectedAccess,
            moduleList,
            handleInputChange,
            handleModuleChange,
            handleUpdateAccessSubmit
        } = this.props;
        

        const renderAccessList = () => {
            const checkModule = (module) => {
                if(selectedAccess.module) {
                    return selectedAccess.module.some((item) => {
                        return module.id == item.id
                    })

                }
            }
            
            if(moduleList.isFetching) {
                return <p>Sedang memuat seluruh modul. Tunggu sebentar...</p>
            }
            
            if(moduleList.isLoaded) {
                return moduleList.data.map((item) => {
                    // console.log(selectedAccess.module ? selectedAccess.module.includes(item): null);
                    return (
                        <div className="column-6">
                            <ListGroupItem className="flex justify-content--space-between">
                                <Label className="fw-semibold">{item.name}</Label>
                                <InputSwitch
                                    onChange={(e) => handleModuleChange(selectedAccess, item, e)}
                                    value={checkModule(item)}
                                />
                            </ListGroupItem>
                        </div>
                    )
                })    
            }
        }

        const renderAlert = () => {
        	if(selectedAccess.isError) {
        		return (
        			<Alert theme="danger" className="flex clr-light margin-bottom-2">
        				<i className="ion-alert-circled margin-right-2"></i>
        				<p>{selectedAccess.error.message}</p>
        			</Alert>
    			)
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
                    	{ renderAlert() }
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
                                    onChange={(e) => handleInputChange(selectedAccess, e)}
                                    value={selectedAccess.name}
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
                        <Button type="button" buttonTheme="danger" className="clr-light" onClick={() => toggleModal('updateAccess')}>
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

export default SettingsUpdateAccess