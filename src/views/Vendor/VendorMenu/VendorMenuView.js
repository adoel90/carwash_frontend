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
        storeMenuList,
        toggleModal, 
        handleInputChange, 
        updateMenuVendor, 
        selectedMenuStore,
        handleUpdateSubmitVendorMenu,
        handleCancelModal } = props;

    const renderMenuVendorModal = () => {

        if(selectedMenuStore){

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
                                        <Input name="name" placeholder={selectedMenuStore.name} defaultValue={selectedMenuStore.name} onChange={(e) => handleInputChange('selectedMenuStore', e)} />
                                    </FormField>
                                </Column>
                                <Column>
                                    <FormField label="Ubah Produk Description">
                                        <Input name="description" placeholder={selectedMenuStore.description} defaultValue={selectedMenuStore.description} onChange={(e) => handleInputChange('selectedMenuStore', e)} />
                                    </FormField>
                                </Column>
                                <Column>
                                    <FormField label="Ubah Price">
                                        <Input name="price" placeholder={selectedMenuStore.price} defaultValue={selectedMenuStore.price} onChange={(e) => handleInputChange('selectedMenuStore', e)} />
                                    </FormField>
                                </Column>
                            </Row>
                        </ModalBody>
                        <ModalFooter className="flex justify-content--flex-end">
                            <ButtonDewek onClick={(e) => handleCancelModal(e)} >Cancel</ButtonDewek>
                            {/* <ButtonDewek onClick={handleCancelModal} variant="raised" type="submit">Simpan</ButtonDewek> */}
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
                        {/* <h6 className="heading-subtitle">Lorem Ipsum.</h6> */}
                        
                    </PanelHeader>
                    <PanelBody>
                        <div className="admin-user__content">
                            <TableSet
                                loading={storeMenuList.isFetching}
                                loaded={storeMenuList}
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