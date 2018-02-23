import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, Switch } from '../../../components/Input';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Button } from '../../../components/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

const AdminUserView = props => {
    const {
        isModalOpen,
        table,
        userList,
        toggleModal,
        handleInputChange,
        updateUser,

        selectedUser,
    } = props;

    const renderUserDetailModal = () => {
        if(selectedUser) {
            return (
                <Modal
                    isOpen={isModalOpen.updateUser}
                    toggle={() => toggleModal('updateUser')}>
                    <ModalHeader>
                        <h5>Ubah Informasi User</h5>
                    </ModalHeader>
                    <Form onSubmit={updateUser}>
                        <ModalBody>
                            <Row>
                                <Column>
                                    <FormField label="Nama Lengkap">
                                        <Input name="username" placeholder={selectedUser.name} defaultValue={selectedUser.name} onChange={(e) => handleInputChange('selectedUser', e)} />
                                    </FormField>
                                    <FormField label="Alamat Email">
                                        <Input name="email" placeholder={selectedUser.email} defaultValue={selectedUser.email} onChange={(e) => handleInputChange('selectedUser', e)} />
                                    </FormField>
                                    <FormField label="Status">
                                        <Switch name="status" value={selectedUser.status} onChange={(e) => handleInputChange('selectedUser', e)} />
                                    </FormField>
                                </Column>
                                <Column>
                                    <FormField label="Username">
                                        <Input type="username" name="text" defaultValue={selectedUser.username} placeholder={selectedUser.username} onChange={(e) => handleInputChange('selectedUser', e)} />
                                    </FormField>
                                    <FormField label="Password">
                                        <Input type="password" name="password" placeholder="Masukkan kata sandi baru" onChange={(e) => handleInputChange('selectedUser', e)} />
                                    </FormField>
                                    <FormField label="Konfirmasi Password">
                                        <Input type="confirmPassword" name="password" placeholder="Masukkan ulang kata sandi" onChange={(e) => handleInputChange('selectedUser', e)} />
                                    </FormField>
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
        <div className="admin-user">
            <Panel>
                <PanelHeader>
                    <h4 className="heading-title">Daftar User</h4>
                    <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6>
                </PanelHeader>
                <PanelBody>
                    <div className="admin-user__content">
                        <TableSet
                            loading={userList.isFetching}
                            loaded={userList.isLoaded}
                            columns={table.columns}
                            rows={table.rows}
                            striped 
                            fullWidth
                            pagination
                        />
                    </div>
                </PanelBody>
            </Panel>
            { renderUserDetailModal() }
        </div>
    );
};

AdminUserView.propTypes = {
    
};

export default AdminUserView;