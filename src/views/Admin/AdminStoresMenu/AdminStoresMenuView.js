import React from 'react';
import PropTypes from 'prop-types';
import { PropsRoute } from '../../../components/Route';

import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, Switch, InputAddon, Select, InputCurrency, SwitchSquare } from '../../../components/Input';
import { ButtonDewek } from '../../../components/ButtonDewek';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { PageBlock, PageBlockGroup, PageContent, PageHeading} from '../../../components/Page';
import { Nav, NavItem, NavLink, NavTabLink} from '../../../components/Nav';
import { TabContent } from '../../../components/Tab';
import { Button } from '../../../components/Button';

const AdminStoresMenuView = props => {

    const buttonStyle = {
        'margin-left': '570px',
    }

    const {
        isModalOpen, 
        table, 
        menuVendorList, 
        storeMenuList,
        storeActiveList,
        toggleModal, 
        handleInputChange, 
        handleImageChange,
        updateMenuVendor, 
        selectedMenuStore,
        
        handleUpdateSubmitVendorMenu,
        handleCancelModal,

        vendorState,
        storeList,
        activeTab,
        toggleTab,
        search,

        printListMenuStore
    } = props;

    const renderMenuProductModal = () => {

        if(selectedMenuStore){

            return(
                <Modal
                    isOpen={isModalOpen.updateMenuVendor}
                    toggle={() => toggleModal('updateMenuVendor')}>

                    <ModalHeader>
                        <h5>Informasi Produk</h5>
                    </ModalHeader>
                
                    <Form onSubmit={handleUpdateSubmitVendorMenu}>
                        <ModalBody>
                            <Row>
                                <Column>

                                    <FormField label="Nama Produk">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-clipboard-list"></i>
                                            </InputAddon>
                                            <Input  className="input" name="name" placeholder={selectedMenuStore.name} defaultValue={selectedMenuStore.name} onChange={(e) => handleInputChange('selectedMenuStore', e)} />
                                        </InputGroup>
                                    </FormField>
                                
                                    <FormField label="Deskripsi Produk">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-clipboard-list"></i>
                                            </InputAddon>
                                            <Input name="description" placeholder={selectedMenuStore.description} defaultValue={selectedMenuStore.description} onChange={(e) => handleInputChange('selectedMenuStore', e)} />
                                        </InputGroup>
                                    </FormField>
                              
                                    <FormField label="Harga">
                                        <InputGroup>
                                            <InputAddon>
                                                <small className="fw-semibold tt-upercase ls-base">Rp</small>
                                            </InputAddon>
                                            <InputCurrency 
                                                className="input"
                                                name="price" 
                                                type="text" 
                                                placeholder={selectedMenuStore.price} 
                                                defaultValue={selectedMenuStore.price} 
                                                value={selectedMenuStore.price} 
                                                onChange={(e) => handleInputChange('selectedMenuStore', e)} 
                                            />
                                        </InputGroup>    
                                    </FormField>

                                    <FormField label= "Gambar Produk">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-images"></i>
                                            </InputAddon> 
                                            <Input className="input" name="image" type="file"  placeholder="Gambar Produk" onChange={(e) => handleImageChange(selectedMenuStore, e) } />
                                        </InputGroup>
                                    </FormField>
                                    <FormField label="Penawaran Khusus">
                                            <SwitchSquare name="category" value={Boolean(selectedMenuStore.category)} onChange={(e) => handleInputChange('selectedMenuStore', e)} />
                                    </FormField>
                                </Column>
                            </Row>
                        </ModalBody>
                        <ModalFooter className="flex justify-content--flex-end">
                            <Button className="margin-right-small" theme="danger" onClick={(e) => handleCancelModal(e)}> Cancel </Button>
                            <Button type="Submit">Simpan</Button>
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
                        <h4 className="heading-title">Daftar Produk <Button  onClick={(e) => printListMenuStore(e)}  style={buttonStyle} type="submit" theme="light">Print</Button></h4>
                    </PanelHeader>
                    <PanelBody>

                        {/* ******************FINISH****************** */}
                        <div className="admin-user__content">
                            <TableSet
                                loading={storeMenuList.isFetching}
                                loaded={storeMenuList.isLoaded}
                                columns={table.columns}
                                rows={table.rows}
                                striped 
                                fullWidth
                                pagination
                                placeholder="Cari user yang terdaftar"
                                hasSearchBar
                                searchParams={table.searchParams}
                                searchBy={search.searchBy}
                                handleInputChange={handleInputChange}
                                {...props}
                            />
                        </div>
                    </PanelBody>
                </Panel>
                { renderMenuProductModal() }
            </div>
        </div>
    )
};

AdminStoresMenuView.propTypes = {
    
};

export default AdminStoresMenuView;