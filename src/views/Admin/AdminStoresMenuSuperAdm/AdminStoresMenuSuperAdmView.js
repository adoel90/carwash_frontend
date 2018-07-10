import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Container, Row, Column } from '../../../layouts/Grid';
import { TableSet } from '../../../components/Table';
import { Form, FormField } from '../../../layouts/Form';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { Input, InputGroup, Switch, InputAddon, Select, InputCurrency, SwitchSquare } from '../../../components/Input';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { Button } from '../../../components/Button';


const AdminStoresMenuSuperAdmView = props => {

    const { 
            isModalOpen,
            modalUpdateMenuProductStore,
            toggleModal,
            selectedMenuStore,
            handleUpdateMenuProductSubmit,
            handleInputChange,
            handleCancelModal,
            handleImageChange,
            store,
            vendorState,
            table,
            handleClickChange,
            storeMenuList,
            handleFormSubmit } = props;


    const renderMenuProductStoreModal = () => {
        
        if(selectedMenuStore){

            return(

                <Modal
                    isOpen={isModalOpen.modalUpdateMenuProductStore}
                    toggle={() => toggleModal('modalUpdateMenuProductStore')}>

                    <ModalHeader>
                        <h5>Informasi Produk</h5>
                    </ModalHeader>
                    <Form onSubmit={handleUpdateMenuProductSubmit}>
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
        <div className="admin-dashboard">
            <Section>
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Daftar Produk </h4>
                    </PanelHeader>
                    <PanelBody>
                        <Row>
                            <Column className="flex">
                                <div className="margin-right-small">
                                    {/* <Form onSubmit={handleFormSubmit}> */}
                                    <Form>
                                        <FormField> 
                                            <Select name="store" onChange={(e) => handleClickChange(e) }>
                                                <option>Pilih Store</option>
                                                {
                                                    store.list.isLoaded  ? store.list.data.data.result.store.map((store, i) => {
                                                        return <option value={store.id}>{store.name}</option>
                                                    })
                                                    : null
                                                }
                                            </Select>
                                        </FormField>
                                    </Form>
                                </div>
                              
                            </Column>
                        </Row>


                         <div className="admin-user__content">
                            {/* {console.log(vendorState)} */}
                            <TableSet
                                loading={storeMenuList.isFetching}
                                loaded={storeMenuList.isLoaded}
                                columns={table.columns}
                                rows={table.rows}
                                striped 
                                fullWidth
                                pagination
                                // placeholder="Cari user yang terdaftar"
                                // hasSearchBar
                                // searchParams={table.searchParams}
                                // searchBy={search.searchBy}
                                // handleInputChange={handleInputChange}
                                {...props}
                            />
                        </div>
                    </PanelBody>
                </Panel>

                { renderMenuProductStoreModal() }
            </Section>
        </div>
    )

}

export default AdminStoresMenuSuperAdmView;