import React, { Component } from 'react';
import { connect } from 'react-redux';
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
            access
      } = props;

      const renderMemberDetailModal = () => {
            if(selectedMember) {
                  return (
                        <Modal
                              isOpen={isModalOpen.updateMember}
                              toggle={() => toggleModal('updateMember')}>
                              <ModalHeader>
                              <h5>Ubah Informasi Member</h5>
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
            <div>
                  <Panel>
                        <PanelHeader>
                              <h4 className="heading-title">Daftar Member</h4>
                              {/* <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6> */}
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
                                    />
                              </div>
                        </PanelBody>
                  </Panel>

                  { renderMemberDetailModal() }
            </div>
      );
}

export default AdminMemberView;