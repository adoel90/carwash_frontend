import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Section } from '../../../layouts/Section';
import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, Switch } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

const AdminVendorView = props => {

    const {
        isModalOpen, 
        table, 
        adminVendorList, 
        toggleModal, 
        handleInputChange, 
        updateAdminVendor, 
        selectedAdminVendor } = props;

        
    const renderAdminVendorDetailModal = () => {

        if(selectedAdminVendor){

            return(
                <Modal
                    isOpen={isModalOpen.updateAdminVendor}
                    toggle={() => toggleModal('updateVendor')}>

                    <ModalHeader>
                        <h5>Ubah Informasi Vendor</h5>
                    </ModalHeader>
                
                    <Form onSubmit={updateAdminVendor}>
                        <ModalBody>
                            <Row>
                                <Column>
                                    <FormField label="Nama Vendor">
                                        <Input name="username" placeholder={selectedAdminVendor.name} defaultValue={selectedAdminVendor.name} onChange={(e) => handleInputChange('selectedAdminVendor', e)} />
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
            <div className="admin-vendor">    
            </div>

            <div className="admin-user">
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Daftar Admin Vendor</h4>
                        <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6>
                        
                    </PanelHeader>
                    <PanelBody>
                        <div className="admin-user__content">
                            <TableSet
                                loading={adminVendorList.isFetching}
                                loaded={adminVendorList.isLoaded}
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
            { renderAdminVendorDetailModal() }
            </div>
        </div>
    );
};

AdminVendorView.propTypes = {
    
};

export default AdminVendorView;