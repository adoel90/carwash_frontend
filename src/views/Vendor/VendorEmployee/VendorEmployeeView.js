import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, Switch, InputAddon } from '../../../components/Input';
// import { Button } from '../../../components/Button';
import { ButtonDewek } from '../../../components/ButtonDewek';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

const VendorEmployeeView = props => {


    const {
        isModalOpen, 
        table, 
        vendorEmployeeList, 
        toggleModal, 
        handleInputChange, 
        updateVendorEmployee, 
        selectedVendorEmployee,
        handleUpdateSubmitVendorEmployee,
        handleCancelModal } = props;

    const renderVendorEmployeeModal = () => {

        if(selectedVendorEmployee){
            //#
            const userLoginNow = localStorage.getItem('userData') ? localStorage.getItem('userData') : null;
            const dataVendorLoginNow = JSON.parse(userLoginNow);

            return(
                <Modal
                    isOpen={isModalOpen.updateVendorEmployee}
                    toggle={() => toggleModal('updateVendorEmployee')}>

                    <ModalHeader>
                        <h5>Ubah Informasi Store</h5>
                    </ModalHeader>
                
                    <Form onSubmit={handleUpdateSubmitVendorEmployee}>
                        <ModalBody>
                            <Row>
                                {/* <Column>
                                    <FormField label="Id Karyawan ">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-shopping-cart"></i>
                                            </InputAddon>
                                            <Input name="id" placeholder={selectedVendorEmployee.id} defaultValue={selectedVendorEmployee.id} onChange={(e) => handleInputChange('selectedVendorEmployee', e)} />
                                        </InputGroup>
                                    </FormField>
                                </Column> */}
                             
                                <Column>
                                    <FormField label="Ubah Nama Karyawan">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-user"></i>
                                            </InputAddon>
                                            <Input name="name" placeholder={selectedVendorEmployee.name} defaultValue={selectedVendorEmployee.name} onChange={(e) => handleInputChange('selectedVendorEmployee', e)} />
                                        </InputGroup>
                                    </FormField>
                                </Column>
                                <Column>
                                    <FormField label="Ubah Username Log-in">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-user-circle"></i>
                                            </InputAddon>
                                            <Input name="username" placeholder={dataVendorLoginNow.username} defaultValue={dataVendorLoginNow.username} onChange={(e) => handleInputChange('selectedVendorEmployee', e)} />
                                        </InputGroup>
                                    </FormField>
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                    <FormField label="Ubah Email Karyawan">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-envelope"></i>
                                            </InputAddon>
                                            <Input name="email" placeholder={selectedVendorEmployee.email} defaultValue={selectedVendorEmployee.email} onChange={(e) => handleInputChange('selectedVendorEmployee', e)} />
                                        </InputGroup>
                                    </FormField>
                                </Column>
                                <Column>
                                    <FormField label="Akses Level Karyawan">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-shopping-cart"></i>
                                            </InputAddon>
                                            <Input type='number' name="access" placeholder="Only Number" defaultValue={selectedVendorEmployee.level} onChange={(e) => handleInputChange('selectedVendorEmployee', e)} />
                                        </InputGroup>
                                    </FormField>
                                </Column>
                            </Row>

                            <Row>
                                <Column>
                                    <FormField label="Ubah Password">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-key"></i>
                                            </InputAddon>
                                            <Input name="password" placeholder="Ketik Password" defaultValue={selectedVendorEmployee.password} onChange={(e) => handleInputChange('selectedVendorEmployee', e)} />
                                        </InputGroup>
                                    </FormField>
                                </Column>
                                <Column>
                                    <FormField label="Confirm Password">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-key"></i>
                                            </InputAddon>
                                            <Input name="passwordConfirm" placeholder="Ketik Ulang Password" defaultValue={selectedVendorEmployee.passwordConfirm} onChange={(e) => handleInputChange('selectedVendorEmployee', e)} />
                                        </InputGroup>
                                    </FormField>
                                </Column>
                            </Row>
                        </ModalBody>
                        <ModalFooter className="flex justify-content--flex-end">
                            <ButtonDewek onClick={(e) => handleCancelModal(e)}>Cancel</ButtonDewek>
                            <ButtonDewek variant="raised" type="submit">Simpan</ButtonDewek>
                        </ModalFooter>
                    </Form>
                </Modal>
            )
        }
    }

    return (
        <div>

            <div className="admin-user">
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Manajemen Karyawan</h4>
                        {/* <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6> */}
                        
                    </PanelHeader>
                    <PanelBody>
                        <div className="admin-user__content">
                            <TableSet
                                loading={vendorEmployeeList.isFetching}
                                loaded={vendorEmployeeList.isLoaded}
                                columns={table.columns}
                                rows={table.rows}
                                striped 
                                fullWidth
                                pagination
                            />
                        </div>

                        {/* <h1>Hai</h1> */}
                    </PanelBody>
                </Panel>
            { renderVendorEmployeeModal() }
            </div>
        </div>
    )
};

VendorEmployeeView.propTypes = {
    
};

export default VendorEmployeeView;