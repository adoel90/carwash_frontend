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
        selectedVendorEmployee } = props;


    const renderVendorEmployeeModal = () => {

        if(selectedVendorEmployee){

            return(
                <Modal
                    isOpen={isModalOpen.updateVendorEmployee}
                    toggle={() => toggleModal('updateVendorEmployee')}>

                    <ModalHeader>
                        <h5>Ubah Informasi Employee</h5>
                    </ModalHeader>
                
                    <Form onSubmit={updateVendorEmployee}>
                        <ModalBody>
                            <Row>
                                <Column>
                                    <FormField label="Nama Menu">
                                        <Input name="name" placeholder={selectedVendorEmployee.name} defaultValue={selectedVendorEmployee.name} onChange={(e) => handleInputChange('selectedVendorEmployee', e)} />
                                    </FormField>
                                </Column>
                                <Column>

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
            <div className="vendor-menu">    
            </div>

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

}

export default VendorEmployeeView;