import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, InputAddon, Switch, Select } from '../../../components/Input';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Button } from '../../../components/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table';

const AdminStoreView = props => {
    const {
        isModalOpen,
        table,
        storeList,
        toggleModal,
        handleInputChange,
        updateStore,
        selectedStore,
        store,
        search,
        optionsPagination,
        openStoreDetail,
        changeStatusStore
    } = props;

    const componentButtonUpdate = (datarow) => {
        return (
            <div>
                <Button className="margin-right-small" type="button" onClick={() => openStoreDetail(datarow )}>Ubah</Button>
                <Button type="button" theme={datarow.status ? "success" : "danger"} onClick={() => changeStatusStore(datarow)}>{ datarow.status ? 'Aktif' : 'Non Aktif' }</Button>
            </div>
        );
    };

    const renderStoreDetailModal = () => {
        if(selectedStore) {
            return (
                <Modal
                    isOpen={isModalOpen.updateStore}
                    toggle={() => toggleModal('updateStore')}>
                    <ModalHeader>
                        <h5>Ubah Informasi Store</h5>
                    </ModalHeader>
                    <Form onSubmit={updateStore}>
                        <ModalBody>
                            <Row>
                                <Column>
                                    <FormField label="Nama Store">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-shopping-cart"></i>
                                            </InputAddon>
                                            <Input name="name" placeholder={selectedStore.name} defaultValue={selectedStore.name} onChange={(e) => handleInputChange('selectedStore', e)} />
                                        </InputGroup>
                                    </FormField>
                                    <FormField label="Kategori">
                                        <Select name="type" defaultValue={selectedStore.type.id} onChange={(e) => handleInputChange('selectedStore', e) }>
                                            {
                                                store.category.isLoaded ? store.category.data.data.result.map((item, i) => {
                                                    return <option value={item.id}>{item.name}</option>
                                                })
                                                : null
                                            }
                                        </Select>
                                    </FormField>
                                </Column>
                            </Row>
                        </ModalBody>
                        <ModalFooter className="flex justify-content--flex-end">
                            <Button className="margin-right-small" theme="danger" type="button" onClick={() => toggleModal('updateUser')}>Batal</Button>
                            <Button type="submit">Simpan</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            )
        }
    }

    return (
        <div className="admin-store">
            <Panel>
                <PanelHeader>
                    <h4 className="heading-title">Daftar Store</h4>
                    {/* <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6> */}
                </PanelHeader>
                <PanelBody>
                    <div className="admin-store__content"><br /><br /><br />   
                        {/* <TableSet
                            loading={storeList.isFetching}
                            loaded={storeList.isLoaded}
                            columns={table.columns}
                            rows={table.rows}
                            striped 
                            fullWidth
                            pagination
                            placeholder="Cari store yang terdaftar"
                            hasSearchBar 
                            searchParams={table.searchParams}
                            searchBy={search.searchBy}
                            handleInputChange={handleInputChange}
                            {...props}
                        /> */}

                        <BootstrapTable data={table.rows} options={optionsPagination} striped={true} hover={true} version='4' bordered={false} dataAlign="center" searchPlaceholder={"Telusuri nama Store..."} pagination search>
                            <TableHeaderColumn 
                                dataField="id" 
                                isKey={true} 
                                hidden
                            >
                                ID
                            </TableHeaderColumn>
                            <TableHeaderColumn 
                                dataField="name" 
                                headerAlign="left" 
                                dataAlign="left"
                                width="25%"
                            >
                                Nama Store
                            </TableHeaderColumn>
                            <TableHeaderColumn 
                                dataField="user" 
                                headerAlign="left" 
                                dataAlign="left"
                                width="25%"
                            >
                                Owner
                            </TableHeaderColumn>
                            <TableHeaderColumn 
                                dataField="type" 
                                headerAlign="center" 
                                dataAlign="center"
                                width="20%"
                            >
                                Kategori
                            </TableHeaderColumn>
                            <TableHeaderColumn 
                                dataField="data" 
                                headerAlign="center" 
                                dataAlign="center"
                                dataFormat={componentButtonUpdate}
                                width="20%"
                            >
                                Status
                            </TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </PanelBody>
            </Panel>
            { renderStoreDetailModal() }
        </div>
    );
};

AdminStoreView.propTypes = {
    
};

export default AdminStoreView;