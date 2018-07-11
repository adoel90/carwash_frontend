import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Container, Row, Column } from '../../../layouts/Grid';
import { TableSet } from '../../../components/Table';
import { Form, FormField } from '../../../layouts/Form';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { Input, InputGroup, InputAddon, Select, InputCurrency } from '../../../components/Input';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { Button } from '../../../components/Button';

import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table';

const AdminStoresEmployeeSuperAdmView = props => {

    const { 
        isModalOpen,
        table,
        store,
        access, 
        vendorState, 
        storeStaffList,
        handleFormSubmit, 
        populateTableData,
        handleClickChange, 
        handleInputChange,
        selectedStaff,
        modalUpdateStaff,
        toggleModal,
        handleCancelModal,
        handleUpdateSubmitStoreStaff,
        openVendorEmployeeModal,
        changeEmployeeStatus,
        optionsPagination
    } = props;

    const componentButtonUpdate = (datarow) => {
        return (
            <div>
                <Button className="margin-right-small" type="button" onClick={() => openVendorEmployeeModal(datarow)}>Ubah</Button>
                <Button type="button" theme={datarow.status ? "success" : "danger"} onClick={() => changeEmployeeStatus(datarow)}>{ datarow.status ? 'Aktif' : 'Non Aktif' }</Button>
            </div>
        );
    };

    const renderStoreStaffModal = () => {

        if(selectedStaff){
            
            return(
                <Modal
                    isOpen={isModalOpen.modalUpdateStaff}
                    toggle={() => toggleModal('modalUpdateStaff')}>

                    <ModalHeader>
                        <h5>Informasi Staff</h5>
                    </ModalHeader>
                    <Form onSubmit={handleUpdateSubmitStoreStaff}>
                        <ModalBody>
                            <Row>     
                                <Column>
                                    <FormField label="Nama Staff">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-user"></i>
                                            </InputAddon>
                                            <Input name="name" placeholder={selectedStaff.name} defaultValue={selectedStaff.name} onChange={(e) => handleInputChange('selectedStaff', e)} />
                                        </InputGroup>
                                    </FormField>
                                </Column>
                                <Column>
                                    <FormField label="Username">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-user-circle"></i>
                                            </InputAddon>
                                            <Input name="username" placeholder={selectedStaff.username} defaultValue={selectedStaff.username} onChange={(e) => handleInputChange('selectedStaff', e)} />
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
                                            <Input name="email" placeholder={selectedStaff.email} defaultValue={selectedStaff.email} onChange={(e) => handleInputChange('selectedStaff', e)} />
                                        </InputGroup>
                                    </FormField>
                                </Column>
                                <Column>
                                    <FormField label="Password">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-key"></i>
                                            </InputAddon>
                                            <Input name="password" type="password" placeholder="Password" defaultValue={selectedStaff.password} onChange={(e) => handleInputChange('selectedStaff', e)} />
                                        </InputGroup>
                                    </FormField>
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                <FormField label="Akses Level Staff">

                                        <Select name="level" defaultValue={selectedStaff.level} onChange={(e) => handleInputChange('selectedStaff', e) }>
                                            <option value="">Pilih Level</option>
                                            {
                                               access.list.isLoaded ? access.list.data.result.map((item, i) => {
                                                    return <option value={item.id}>{item.name}</option>  
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
                                            <Input name="passwordConfirm" type="password" placeholder="Konfirmasi Password" defaultValue={selectedStaff.passwordConfirm} onChange={(e) => handleInputChange('selectedStaff', e)} />
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
        <div className="admin-dashboard">
            <Section>
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Daftar Staff</h4>
                    </PanelHeader>
                    <PanelBody>
                        <Row>
                            <Column className="flex">
                                <div className="margin-right-small">
                                    <Form onSubmit={handleFormSubmit}>
                                        <FormField> 
                                            <Select 
                                                name="store" 
                                                onClick={(e) => handleClickChange(e) }
                                                style={{zIndex: 1}}
                                            >
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
                                
                                {/* GET STORE STAFF DROPDOWN LIST
                                <div className="margin-right-small">
                                    <Form>
                                        <FormField> 
                                            <Select name="store" onClick={(e) => handleClickChangeStaff(e) }>
                                                <option>Pilih Staff</option>
                                                {
                                                    vendorState.employee.isLoaded ? vendorState.employee.data.data.result.staff.map((staff, i) => {
                                                        return <option value={staff.id}>{staff.name}</option>
                                                    }) : null
                                                }
                                            </Select>
                                        </FormField>
                                    </Form>
                                </div> */}


                                <div>
                                    {/* <FormField>
                                        <Button className="margin-right-small" onClick={() => populateTableData()}>
                                            Temukan
                                        </Button>
                                    </FormField> */}
                                </div>
                            </Column>
                        </Row>

                         <div className="admin-user__content">
                            {/* <TableSet
                                loading={vendorState.employee.isFetching}
                                loaded={vendorState.employee.isLoaded}
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
                            /> */}

                            {
                                table.rows.length > 0 ?
                                    <BootstrapTable 
                                        data={table.rows} 
                                        options={optionsPagination} 
                                        striped={true} 
                                        hover={true} 
                                        version='4' 
                                        bordered={false} 
                                        dataAlign="center" 
                                        searchPlaceholder={"Telusuri nama staff..."} 
                                        pagination 
                                        search
                                    >
                                        <TableHeaderColumn 
                                            dataField="id" 
                                            isKey={true} 
                                            hidden
                                        >
                                            id
                                        </TableHeaderColumn>
                                        <TableHeaderColumn 
                                            dataField="name" 
                                            headerAlign="left" 
                                            dataAlign="left"
                                            width="30%"
                                        >
                                            Nama Staff
                                        </TableHeaderColumn>
                                        <TableHeaderColumn 
                                            dataField="email" 
                                            headerAlign="left" 
                                            dataAlign="left"
                                            width="30%"
                                        >
                                            Email
                                        </TableHeaderColumn>
                                        <TableHeaderColumn 
                                            dataField="data" 
                                            headerAlign="center"
                                            dataAlign="center"
                                            dataFormat={componentButtonUpdate}
                                            width="40%"
                                        >
                                            Status
                                        </TableHeaderColumn>
                                    </BootstrapTable>
                                : null
                            }
                        </div>
                    </PanelBody>
                </Panel>
            </Section>
            
            { renderStoreStaffModal() }
        </div>
    )
};

export default AdminStoresEmployeeSuperAdmView;