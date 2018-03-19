import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, Switch, Select } from '../../../components/Input';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Button } from '../../../components/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

const AdminStoreView = props => {
    const {
        isModalOpen,
        table,
        storeList,
        toggleModal,
        handleInputChange,
        updateStore,
        selectedStore,
        store
    } = props;

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
                                        <Input name="name" placeholder={selectedStore.name} defaultValue={selectedStore.name} onChange={(e) => handleInputChange('selectedStore', e)} />
                                    </FormField>
                                    <FormField label="Status">
                                        <Select name="category" defaultValue={selectedStore.type.id} onChange={(e) => handleInputChange('selectedStore', e) }>
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
                    <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6>
                </PanelHeader>
                <PanelBody>
                    <div className="admin-store__content">
                        <TableSet
                            loading={storeList.isFetching}
                            loaded={storeList.isLoaded}
                            columns={table.columns}
                            rows={table.rows}
                            striped 
                            fullWidth
                            pagination
                        />
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