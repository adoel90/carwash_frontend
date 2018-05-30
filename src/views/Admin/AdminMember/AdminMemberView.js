import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, InputAddon, Switch, Textarea } from '../../../components/Input';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Button } from '../../../components/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

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
            period
      } = props;


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
      }

      return (
            <div className="admin-store">
                  <Row>
                        <Column md={11}>
                              <Panel>
                                    <PanelHeader>
                                          <h4 className="heading-title">Daftar Member</h4>
                                    </PanelHeader>
                                    <PanelBody>
                                          <div className="admin-Member__content">
                                                <TableSet
                                                      loading={memberList.isFetching}
                                                      loaded={memberList.isLoaded}
                                                      columns={table.columns}
                                                      rows={table.rows}
                                                      striped 
                                                      fullWidth
                                                      pagination
                                                      placeholder="Cari member yang terdaftar"
                                                      hasSearchBar
                                                      searchParams={table.searchParams}
                                                      searchBy={search.searchBy}
                                                      handleInputChange={handleInputChange}
                                                      {...props}
                                                />

                                                {/* <FormField>
                                                      <Button onClick={(e) => handleExportToExcell(e, period)} theme="secondary" className="margin-right-small" type="submit" style={{height: '50px', 'margin-left': '3px'}}>
                                                            Export to xls
                                                      </Button>
                                                </FormField> */}
                                          </div>
                                    </PanelBody>
                              </Panel>
                        </Column>
                  </Row>
                  { renderMemberUpdateModal() }
            </div>
      );
}

export default AdminMemberView;