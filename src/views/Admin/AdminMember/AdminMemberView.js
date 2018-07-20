import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, InputAddon, Switch, Textarea } from '../../../components/Input';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet, TableSetKhusus} from '../../../components/Table';
import { Button } from '../../../components/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table';

const AdminMemberView = props => {

      const {
            isModalOpen,
            table,
            memberList,
            toggleModal,
            handleInputChange,
            updateMember,
            selectedMember,
            access,
            search,
            detailMember,
            listMemberTransactionHistoris,
            member,
            handleExportToExcell,
            period,
            optionsPagination,
            openMemberDetail,
            changeMemberStatus
      } = props;

      const componentButtonUpdate = (datarow) => {
            return (
                <div>
                    <Button className="margin-right-small" type="button" onClick={() => openMemberDetail(datarow )}>Ubah</Button>
                    <Button type="button" theme={datarow.status ? "success" : "danger"} onClick={() => changeMemberStatus(datarow)}>{ datarow.status ? 'Aktif' : 'N/A' }</Button>
                </div>
            );
      };

      //Modal Update
      const renderMemberUpdateModal = () => {
            if(selectedMember) {
                  return (
                        <Modal
                              isOpen={isModalOpen.updateMember}
                              toggle={() => toggleModal('updateMember')}>
                              <ModalHeader>
                              <h5>Informasi Member</h5>
                              </ModalHeader>
                              <Form onSubmit={updateMember}>
                                    <ModalBody>
                                          <Row>
                                                <Column>
                                                      <FormField label="Nama Member">
                                                            <InputGroup>
                                                                  <InputAddon>
                                                                        <i className="far fa-user"></i>
                                                                  </InputAddon>
                                                                  <Input type="text" name="name" placeholder={selectedMember.name} defaultValue={selectedMember.name} onChange={(e) => handleInputChange('selectedMember', e)} />
                                                            </InputGroup>
                                                      </FormField>
                                                      <FormField label="Alamat Email">
                                                            <InputGroup>
                                                                  <InputAddon>
                                                                        <i className="far fa-envelope"></i>
                                                                  </InputAddon>
                                                                  <Input type="text" name="email" placeholder={selectedMember.email} defaultValue={selectedMember.email} onChange={(e) => handleInputChange('selectedMember', e)} />
                                                            </InputGroup>
                                                      </FormField>
                                                      <FormField label="No. Telepon">
                                                            <InputGroup>
                                                                  <InputAddon>
                                                                        <i className="fas fa-phone"></i>
                                                                  </InputAddon>
                                                                  <Input type="text" name="phone" placeholder={selectedMember.phone} defaultValue={selectedMember.phone} onChange={(e) => handleInputChange('selectedMember', e)} />
                                                            </InputGroup>
                                                      </FormField>
                                                      <FormField label="Alamat">
                                                            <Textarea name="address" placeholder={selectedMember.address} defaultValue={selectedMember.address} onChange={(e) => handleInputChange('selectedMember', e)} />
                                                      </FormField>
                                                </Column>
                                          </Row>
                                    </ModalBody>
                              <ModalFooter className="flex justify-content--flex-end">
                                    <Button className="margin-right-small" theme="danger" type="button" onClick={() => toggleModal('updateMember')}>Batal</Button>
                                    <Button type="submit">Simpan</Button>
                              </ModalFooter>
                              </Form>
                        </Modal>
                  )
            }
      };

      return (
            <div className="admin-store">
                  <Row>
                        <Column md={12}>
                              <Panel>
                                    <PanelHeader>
                                          <h4 className="heading-title">Daftar Member</h4>
                                    </PanelHeader>
                                    <PanelBody>
                                          <Column md={12}>
                                                <div className="admin-Member__content"><br /><br /><br />   
                                                      <BootstrapTable data={table.rows} options={optionsPagination} striped={true} hover={true} version='4' bordered={false} dataAlign="center" searchPlaceholder={"Ketik nama member yang terdaftar..."} pagination search>
                                                            <TableHeaderColumn 
                                                                  dataField="id" 
                                                                  isKey={true} hidden
                                                            >
                                                                  id
                                                            </TableHeaderColumn>
                                                            <TableHeaderColumn 
                                                                  dataField="name" 
                                                                  headerAlign="left" 
                                                                  dataAlign="left"
                                                                  width="25%"
                                                            >
                                                                  Nama Member
                                                            </TableHeaderColumn>
                                                            <TableHeaderColumn 
                                                                  dataField="cardNumber" 
                                                                  headerAlign="center" 
                                                                  dataAlign="center"
                                                                  width="25%"
                                                            >
                                                                  Nomor kartu
                                                            </TableHeaderColumn>
                                                            <TableHeaderColumn 
                                                                  dataField="cardType" 
                                                                  headerAlign="center" 
                                                                  dataAlign="center"
                                                                  width="25%"
                                                            >
                                                                  Tipe Member
                                                            </TableHeaderColumn>
                                                            <TableHeaderColumn 
                                                                  dataField="data" 
                                                                  headerAlign="center"
                                                                  dataAlign="center"
                                                                  dataFormat={componentButtonUpdate}
                                                                  width="25%"
                                                            >
                                                                  Status
                                                            </TableHeaderColumn>
                                                      </BootstrapTable>
                                                </div>
                                          </Column>
                                    </PanelBody>
                              </Panel>
                        </Column>
                  </Row>
                  { renderMemberUpdateModal() }
            </div>
      );
}

export default AdminMemberView;