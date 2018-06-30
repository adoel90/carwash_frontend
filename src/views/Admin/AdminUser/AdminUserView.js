import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, InputAddon, Switch, Select } from '../../../components/Input';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet, TableSetOld, TableSetKhusus } from '../../../components/Table';
import { Button } from '../../../components/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

import BootstrapTable from 'react-bootstrap-table-next';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

const AdminUserView = props => {
    const {
        isModalOpen,
        table,
        column,
        userList,
        toggleModal,
        handleInputChange,
        handleSearchPaginationSecond,
        handleClickPagination,
        updateUser,
        selectedUser,
        access,
        search,
        handleGetCurrentActivePage,
        currentActive,
        postCurrentActivePage
    } = props;

    const columns = [
        {
            filter: textFilter(),
            text: 'Nama User',
            dataField: 'name'
           
        }, 
        {
            text: 'Alamat Email',
            dataField: 'email'
        }, 
        {
            text: 'Level Akses',
            dataField: 'accessLevel',
            // align: 'center'
        }, 
        {
            text: 'Status',
            dataField: 'action',
            // width: '30%',
            // align: 'center',
            // render: (row) => (
            //     <td className="flex justify-content--center">
            //         <Button className="margin-right-small" type="button" onClick={() => this.openUserDetail(row)}>Ubah</Button>
            //         <Button type="button" theme={row.data.status ? "success" : "danger"} onClick={() => this.changeStatusUser(row)}>{ row.data.status ? 'Aktif' : 'Non Aktif' }</Button>
            //     </td>
            // )
        }
    ];

    // const selectRow = {
    //     mode: 'checkbox',
    //     clickToSelect: true
    // };

    const rowEvent = {
        onClick: (e, row, rowIndex) => {
            console.log(row );
        }
    }



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
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="far fa-user"></i>
                                            </InputAddon>
                                            <Input name="name" placeholder={selectedUser.name} defaultValue={selectedUser.name} onChange={(e) => handleInputChange('selectedUser', e)} />
                                        </InputGroup>
                                    </FormField>
                                    <FormField label="Alamat Email">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="far fa-envelope"></i>
                                            </InputAddon>
                                            <Input name="email" placeholder={selectedUser.email} defaultValue={selectedUser.email} onChange={(e) => handleInputChange('selectedUser', e)} />
                                        </InputGroup>
                                    </FormField>
                                    <FormField label="Status">
                                        <Select name="level" defaultValue={selectedUser.level.id} onChange={(e) => handleInputChange('selectedUser', e) }>
                                            {
                                                access.list.isLoaded ? access.list.data.result.map((item, i) => {
                                                    if(item.id < 5) {
                                                        return <option value={item.id}>{item.name}</option>
                                                    }
                                                })
                                                : null
                                            }
                                        </Select>
                                        {/* <Switch name="status" value={selectedUser.status} onChange={(e) => handleInputChange('selectedUser', e)} /> */}
                                    </FormField>
                                </Column>
                                <Column>
                                    <FormField label="Username">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="far fa-user"></i>
                                            </InputAddon>
                                            <Input type="text" name="username" defaultValue={selectedUser.username} placeholder={selectedUser.username} onChange={(e) => handleInputChange('selectedUser', e)} />
                                        </InputGroup>
                                    </FormField>
                                    <FormField label="Password">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-lock"></i>
                                            </InputAddon>
                                            <Input type="password" name="password" placeholder="Masukkan kata sandi baru" onChange={(e) => handleInputChange('selectedUser', e)} />
                                        </InputGroup>
                                    </FormField>
                                    <FormField label="Konfirmasi Password">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-lock"></i>
                                            </InputAddon>
                                            <Input type="password" name="confirmPassword" placeholder="Masukkan ulang kata sandi" onChange={(e) => handleInputChange('selectedUser', e)} />
                                        </InputGroup>
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
        <div className="admin-user">
            <Panel>
                <PanelHeader>
                    <h4 className="heading-title">Daftar User</h4>
                    {/* <h6 className="heading-subtitle">Menampilkan semua daftar user</h6> */}
                </PanelHeader>
                <PanelBody>
                    <div className="admin-user__content">              
                    {console.log(table)}
                 
                    <BootstrapTable 
                        keyField='name' 
                        data={ table.rows } 
                        columns={ columns } 
                        filter={ filterFactory() } 
                        pagination={ paginationFactory() }
                        bordered={false}
                        // selectRow={selectRow}
                        rowEvents = { rowEvent}
                        striped hover /> 
                   
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