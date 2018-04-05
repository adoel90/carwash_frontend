import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, Switch, InputAddon, Select } from '../../../components/Input';
import { ButtonDewek } from '../../../components/ButtonDewek';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { PageBlock, PageBlockGroup, PageContent, PageHeading} from '../../../components/Page';
import { Nav, NavItem, NavLink, NavTabLink} from '../../../components/Nav';
// import { Button } from '../../../components/Button';

const AdminStoresMenuView = props => {

    const {
        isModalOpen, 
        store,
        table, 
        menuVendorList, 
        storeMenuList,
        storeActiveList,
        toggleModal, 
        handleInputChange, 
        handleImageChange,
        updateMenuVendor, 
        selectedMenuStore,
        vendorState,

        handleUpdateSubmitVendorMenu,
        handleCancelModal ,

        storeList,
        activeTab,
        toggleTab } = props;

    const renderMenuProductModal = () => {

        if(selectedMenuStore){

            return(
                <Modal
                    isOpen={isModalOpen.updateMenuVendor}
                    toggle={() => toggleModal('updateMenuVendor')}>

                    <ModalHeader>
                        <h5>Ubah Informasi Produk</h5>
                    </ModalHeader>
                
                    <Form onSubmit={handleUpdateSubmitVendorMenu}>
                        <ModalBody>
                            <Row>
                                <Column>

                                    {/* ********* Dropdownlist untuk pilih Store mana yang mau di update ***************************88
                                        <FormField label="Pilih Store sebelum menambahkan produk">
                                         <Select name="store" defaultValue={selectedMenuStore.id} onChange={(e) => handleInputChange('selectedMenuStore', e) }>
                                            {
                                                this.props.store.list.isLoaded   ? this.props.store.list.data.data.result.store.map((item, i) => {
                                                    return <option value={item.id}>{item.name}</option>
                                                })
                                                : null
                                            }
                                        </Select>
                                    </FormField> */}

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
                                            <Input name="description" placeholder={selectedMenuStore.deskripsi} defaultValue={selectedMenuStore.deskripsi} onChange={(e) => handleInputChange('selectedMenuStore', e)} />
                                        </InputGroup>
                                    </FormField>
                              
                                    <FormField label="Harga Produk">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="">Rp</i>
                                            </InputAddon>
                                            <Input name="price" placeholder={selectedMenuStore.price} defaultValue={selectedMenuStore.price} onChange={(e) => handleInputChange('selectedMenuStore', e)} />
                                        </InputGroup>    
                                    </FormField>

                                    <FormField label= "Upload Gambar Produk Lagi" >
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-images"></i>
                                            </InputAddon> 
                                            <Input className="input" name="image" type="file"  placeholder="Upload Gambar Produk" onChange={(e) => handleImageChange(selectedMenuStore, e) } />
                                        </InputGroup>
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


    //# RENDER STORE MENU
    const renderStoreList = (store, i) => {

		return (
			<NavItem>
				<NavTabLink
					active={activeTab === i}
					onClick={() => toggleTab(i)}>
					{store.name}
				</NavTabLink>
			</NavItem>
		)
		
    }

    return (
        <div>

            <div className="admin-user">
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Daftar Produk</h4>
                        {/* <h6 className="heading-subtitle">Lorem Ipsum.</h6> */}
                        
                    </PanelHeader>
                    <PanelBody>

                        <Nav tabs className="flex justify-content--space-between">
                            {storeList.isLoaded ? storeActiveList.map(this.renderStoreList) : null}
                            {/* Hai hai */}
                        </Nav>




                        {/* ******************FINISH****************** */}
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
                { renderMenuProductModal() }
            </div>
        </div>
    )
};

AdminStoresMenuView.propTypes = {
    
};

export default AdminStoresMenuView;