import React from 'react';
import PropTypes from 'prop-types';
import { PropsRoute } from '../../../components/Route';

import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, Switch, InputAddon, Select, InputCurrency, SwitchSquare } from '../../../components/Input';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { PageBlock, PageBlockGroup, PageContent, PageHeading} from '../../../components/Page';
import { Nav, NavItem, NavLink, NavTabLink} from '../../../components/Nav';
import { TabContent } from '../../../components/Tab';
import { Button } from '../../../components/Button';

import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table';

const AdminStoresMenuView = props => {

    const buttonStyle = {
        'marginLeft': '840px',
        'marginTop' : '5px',
        // 'marginBottom':'30px',
        // 'marginBottom': '10px',
        // 'top': '0px',
        // 'left': '0px',
        // 'bottom' : '0px',
        'zIndex': 1,
        'position': 'absolute',
        'display': 'inline-block',
        'box-sizing': 'border-box',
    };

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
        printListMenuStore,
        optionsPagination,
        openMenuVendorModal,
        changeMenuStatus,
        handleClickChange
    } = props;

    const componentButtonUpdate = (datarow) => {
        return (
            <div>
                <Button className="margin-right-small" type="button" onClick={() => openMenuVendorModal(datarow )}>Ubah</Button>
                <Button type="button" theme={datarow.status ? "success" : "danger"} onClick={() => changeMenuStatus(datarow)}>{ datarow.status ? 'Aktif' : 'Non Aktif' }</Button>
            </div>
        );
    };

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
                                            <Input required className="input" name="name" placeholder={selectedMenuStore.name} defaultValue={selectedMenuStore.name} onChange={(e) => handleInputChange('selectedMenuStore', e)} />
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
                        <h4 className="heading-title">Daftar Produk </h4>
                    </PanelHeader>
                    <PanelBody>
                        <Row>
                            <Column className="flex">
                                <div className="margin-right-small">
                                    <FormField>
                                        <Button  onClick={(e) => printListMenuStore(e)}  style={buttonStyle} type="submit" theme="light">Print</Button>
                                    </FormField>
                                </div>
                            </Column>
                        </Row>
                        <div className="admin-user__content"><br /> <br />   
                            <BootstrapTable 
                                data={table.rows} 
                                options={optionsPagination} 
                                striped={true} 
                                hover={true} 
                                version='4' 
                                bordered={false} 
                                dataAlign="center" 
                                searchPlaceholder={"Telusuri nama produk..."} 
                                pagination 
                                search>

                                <TableHeaderColumn dataField="id" headerAlign="left" dataAlign="left" isKey={true} hidden>ID</TableHeaderColumn>
                                <TableHeaderColumn dataField="name" headerAlign="left" dataAlign="left">Nama Produk</TableHeaderColumn>
                                <TableHeaderColumn dataField="description" headerAlign="left" dataAlign="left">Deskripsi Produk</TableHeaderColumn>
                                <TableHeaderColumn dataField="price" headerAlign="left" dataAlign="center">Harga</TableHeaderColumn>
                                <TableHeaderColumn dataField="data" headerAlign="left" dataAlign="right" dataFormat={componentButtonUpdate}>Status</TableHeaderColumn>
                            </BootstrapTable>
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