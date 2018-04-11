import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, Switch, InputAddon, Select } from '../../../components/Input';
// import { Button } from '../../../components/Button';
import { ButtonDewek } from '../../../components/ButtonDewek';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import {Button} from '../../../components/Button';

const AdminStoresEmployeeView = props => {
    
    const {
        isModalOpen, 
        table, 
        accessLevel,
        access,
        vendorEmployeeList, 
        toggleModal, 
        handleInputChange, 
        updateVendorEmployee, 
        selectedVendorEmployee,
        handleUpdateSubmitVendorEmployee,
        handleCancelModal,
        search
    } = props;

    const renderVendorEmployeeModal = () => {

        if(selectedVendorEmployee){
            //#
            const userLoginNow = localStorage.getItem('userData') ? localStorage.getItem('userData') : null;
            const dataVendorLoginNow = JSON.parse(userLoginNow);

            return(
                <Modal
                    isOpen={isModalOpen.updateVendorEmployee}
                    toggle={() => toggleModal('updateVendorEmployee')}>

                    <ModalHeader>
                        <h5>Informasi Staff</h5>
                    </ModalHeader>
                
                    <Form onSubmit={handleUpdateSubmitVendorEmployee}>
                        <ModalBody>
                            <Row>     
                                <Column>
                                    <FormField label="Nama Staff">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-user"></i>
                                            </InputAddon>
                                            <Input name="name" placeholder={selectedVendorEmployee.name} defaultValue={selectedVendorEmployee.name} onChange={(e) => handleInputChange('selectedVendorEmployee', e)} />
                                        </InputGroup>
                                    </FormField>
                                </Column>
                                <Column>
                                    <FormField label="Username">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-user-circle"></i>
                                            </InputAddon>
                                            <Input name="username" placeholder={selectedVendorEmployee.username} defaultValue={selectedVendorEmployee.username} onChange={(e) => handleInputChange('selectedVendorEmployee', e)} />
                                        </InputGroup>
                                    </FormField>
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                    <FormField label="Email Staff">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-envelope"></i>
                                            </InputAddon>
                                            <Input name="email" placeholder={selectedVendorEmployee.email} defaultValue={selectedVendorEmployee.email} onChange={(e) => handleInputChange('selectedVendorEmployee', e)} />
                                        </InputGroup>
                                    </FormField>
                                </Column>
                                <Column>
                                    <FormField label="Password">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-key"></i>
                                            </InputAddon>
                                            <Input name="password" type="password" placeholder="Password" defaultValue={selectedVendorEmployee.password} onChange={(e) => handleInputChange('selectedVendorEmployee', e)} />
                                        </InputGroup>
                                    </FormField>
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                <FormField label="Akses Level Staff">
                                        {/* <Select name="level" defaultValue={selectedVendorEmployee.level} onChange={(e) => handleInputChange(selectedVendorEmployee, e) }>
                                            <option value="">Pilih Level</option>
                                            {
                                                accessLevel.map((item, i) => {
                                                    return <option value={item.id}>{item.name}</option>
                                                })
                                            }
                                        </Select> */}

                                        <Select name="level" defaultValue={selectedVendorEmployee.level} onChange={(e) => handleInputChange('selectedVendorEmployee', e) }>
                                            <option value="">Pilih Level</option>
                                            {
                                               access.list.isLoaded ? access.list.data.result.map((item, i) => {
                                                    if(item.id >= 5) {
                                                        return <option value={item.id}>{item.name}</option>
                                                    }
                                                }) : null
                                            }
                                        </Select>
                                    </FormField>
                                </Column>
                                <Column>
                                    <FormField label="Confirm Password">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-key"></i>
                                            </InputAddon>
                                            <Input name="passwordConfirm" type="password" placeholder="Konfirmasi Password" defaultValue={selectedVendorEmployee.passwordConfirm} onChange={(e) => handleInputChange('selectedVendorEmployee', e)} />
                                        </InputGroup>
                                    </FormField>
                                </Column>
                            </Row>
                        </ModalBody>
                        <ModalFooter className="flex justify-content--flex-end">

                            <Button className="margin-right-small" theme="danger" onClick={(e) => handleCancelModal(e)}>Cancel</Button>
                            <Button type="submit">Simpan</Button>
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
                        <h4 className="heading-title">Manajemen Staff</h4>
                        {/* <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6> */}
                        
                    </PanelHeader>
                    <PanelBody>
                        <div className="admin-user__content">
                            <TableSet
                                loading={vendorEmployeeList.isFetching}
                                loaded={vendorEmployeeList.isLoaded}
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

                        {/* <h1>Hai</h1> */}
                    </PanelBody>
                </Panel>
            { renderVendorEmployeeModal() }
            </div>
        </div>
    )
};

AdminStoresEmployeeView.propTypes = {
    
};

export default AdminStoresEmployeeView;