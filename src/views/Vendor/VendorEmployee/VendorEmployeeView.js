import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, Switch } from '../../../components/Input';
import { Button } from '../../../components/Button';
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
        handleUpdateSubmitVendorEmployee } = props;

   

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
                        <h5>Ubah Informasi Vendor</h5>
                    </ModalHeader>
                
                    <Form onSubmit={handleUpdateSubmitVendorEmployee}>
                        <ModalBody>
                            <Row>
                                <Column>
                                    <FormField label="Id Karyawan ">
                                        <Input name="id" placeholder={selectedVendorEmployee.id} defaultValue={selectedVendorEmployee.id} onChange={(e) => handleInputChange('selectedVendorEmployee', e)} />
                                    </FormField>
                                </Column>
                             
                                <Column>
                                    <FormField label="Ubah Nama Karyawan">
                                        <Input name="name" placeholder={selectedVendorEmployee.name} defaultValue={selectedVendorEmployee.name} onChange={(e) => handleInputChange('selectedVendorEmployee', e)} />
                                    </FormField>
                                </Column>
                                <Column>
                                    <FormField label="Ubah Email Karyawan">
                                        <Input name="email" placeholder={selectedVendorEmployee.email} defaultValue={selectedVendorEmployee.email} onChange={(e) => handleInputChange('selectedVendorEmployee', e)} />
                                    </FormField>
                                </Column>
                                <Column>
                                    <FormField label="Akses Level Karyawan">
                                        <Input type='number' name="access" placeholder="Only Number" defaultValue={selectedVendorEmployee.access} onChange={(e) => handleInputChange('selectedVendorEmployee', e)} />
                                    </FormField>
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                    <FormField label="Id Vendor">
                                        <Input name="vendor" placeholder={dataVendorLoginNow.vendor} defaultValue={dataVendorLoginNow.vendor} onChange={(e) => handleInputChange('selectedVendorEmployee', e)} />
                                    </FormField>
                                </Column>
                                <Column>
                                    <FormField label="Username Vendor">
                                        <Input name="username" placeholder={dataVendorLoginNow.username} defaultValue={dataVendorLoginNow.username} onChange={(e) => handleInputChange('selectedVendorEmployee', e)} />
                                    </FormField>
                                </Column>
                            </Row>

                            {/* ROW-02 */}
                            <Row>
                                <Column>
                                    <FormField label="Ubah Password">
                                        <Input name="id" placeholder="Ketik Password" defaultValue={selectedVendorEmployee.password} onChange={(e) => handleInputChange('selectedVendorEmployee', e)} />
                                    </FormField>
                                </Column>
                                <Column>
                                    <FormField label="Confirm Password">
                                        <Input name="id" placeholder="Ketik Ulang Password" defaultValue={selectedVendorEmployee.passwordConfirm} onChange={(e) => handleInputChange('selectedVendorEmployee', e)} />
                                    </FormField>
                                </Column>
                            </Row>
                        </ModalBody>
                        <ModalFooter className="flex justify-content--flex-end">
                            <Button>Simpan</Button>
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
                        <h4 className="heading-title">Employee Management</h4>
                        <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6>
                        
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