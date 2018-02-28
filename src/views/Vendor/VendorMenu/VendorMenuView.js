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

const VendorMenuView = props => {

    const {
        isModalOpen, 
        table, 
        menuVendorList, 
        toggleModal, 
        handleInputChange, 
        updateMenuVendor, 
        selectedMenuVendor } = props;

    const renderMenuVendorModal = () => {

        if(selectedMenuVendor){

            return(
                <Modal
                    isOpen={isModalOpen.updateMenuVendor}
                    toggle={() => toggleModal('updateMenuVendor')}>

                    <ModalHeader>
                        <h5>Ubah Informasi Vendor</h5>
                    </ModalHeader>
                
                    <Form onSubmit={updateMenuVendor}>
                        <ModalBody>
                            <Row>
                                <Column>
                                    <FormField label="Nama Menu">
                                        <Input name="username" placeholder={selectedMenuVendor.name} defaultValue={selectedMenuVendor.name} onChange={(e) => handleInputChange('selectedMenuVendor', e)} />
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
                        <h4 className="heading-title">Daftar Menu</h4>
                        <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6>
                        
                    </PanelHeader>
                    <PanelBody>
                        <div className="admin-user__content">
                            <TableSet
                                loading={menuVendorList.isFetching}
                                loaded={menuVendorList.isLoaded}
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
            { renderMenuVendorModal() }
            </div>
        </div>
    )
};

export default VendorMenuView;