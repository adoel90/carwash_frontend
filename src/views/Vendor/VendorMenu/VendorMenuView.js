import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, Switch } from '../../../components/Input';
// import { Button } from '../../../components/Button';
import { ButtonDewek } from '../../../components/ButtonDewek';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

const VendorMenuView = props => {

    const {
        isModalOpen, 
        table, 
        menuVendorList, 
        toggleModal, 
        handleInputChange, 
        updateMenuVendor, 
        selectedMenuVendor,
        handleUpdateSubmitVendorMenu } = props;

    const renderMenuVendorModal = () => {

        if(selectedMenuVendor){

            return(
                <Modal
                    isOpen={isModalOpen.updateMenuVendor}
                    toggle={() => toggleModal('updateMenuVendor')}>

                    <ModalHeader>
                        <h5>Ubah Informasi Store</h5>
                    </ModalHeader>
                
                    {/* <Form onSubmit={updateMenuVendor}> */}
                    <Form onSubmit={handleUpdateSubmitVendorMenu}>
                        <ModalBody>
                            <Row>
                                <Column>
                                    <FormField label="Ubah Nama Produk">
                                        <Input name="name" placeholder={selectedMenuVendor.name} defaultValue={selectedMenuVendor.name} onChange={(e) => handleInputChange('selectedMenuVendor', e)} />
                                    </FormField>
                                </Column>
                                <Column>
                                    <FormField label="Ubah Produk Description">
                                        <Input name="description" placeholder={selectedMenuVendor.description} defaultValue={selectedMenuVendor.description} onChange={(e) => handleInputChange('selectedMenuVendor', e)} />
                                    </FormField>
                                </Column>
                                <Column>
                                    <FormField label="Ubah Price">
                                        <Input name="price" placeholder={selectedMenuVendor.price} defaultValue={selectedMenuVendor.price} onChange={(e) => handleInputChange('selectedMenuVendor', e)} />
                                    </FormField>
                                </Column>
                            </Row>
                        </ModalBody>
                        <ModalFooter className="flex justify-content--flex-end">
                            <ButtonDewek>Cancel</ButtonDewek>
                            <ButtonDewek variant="raised" type="submit">Simpan</ButtonDewek>
                            
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
                        <h4 className="heading-title">Daftar Produk</h4>
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

                    </PanelBody>
                </Panel>
            { renderMenuVendorModal() }
            </div>
        </div>
    )
};

VendorMenuView.propTypes = {
    
};

export default VendorMenuView;