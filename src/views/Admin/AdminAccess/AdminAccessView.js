import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, Switch, Textarea } from '../../../components/Input';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Button } from '../../../components/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

const AdminAccessView = props => {
      const {
            isModalOpen,
            table,
            accessList,
            toggleModal,
            handleInputChange,
            updateAccess,
            selectedAccess
      } = props;

      const renderAccessDetailModal = () => {
            if(selectedAccess) {
                return (
                    <Modal
                        isOpen={isModalOpen.updateAccess}
                        toggle={() => toggleModal('updateAccess')}>
                        <ModalHeader>
                            <h5>Ubah Informasi Access</h5>
                        </ModalHeader>
                        <Form onSubmit={updateAccess}>
                              <ModalBody>
                                    <Row>
                                          <Column>
                                                <FormField label="Nama Access">
                                                      <Input type="text" name="name" placeholder={selectedAccess.name} defaultValue={selectedAccess.name} onChange={(e) => handleInputChange('selectedAccess', e)} />
                                                </FormField>
                                                <FormField label="Alamat Email">
                                                      <Input type="text" name="email" placeholder={selectedAccess.email} defaultValue={selectedAccess.email} onChange={(e) => handleInputChange('selectedAccess', e)} />
                                                </FormField>
                                                <FormField label="No. Telepon">
                                                      <Input type="text" name="phone" placeholder={selectedAccess.phone} defaultValue={selectedAccess.phone} onChange={(e) => handleInputChange('selectedAccess', e)} />
                                                </FormField>
                                                <FormField label="Alamat">
                                                      <Textarea name="address" placeholder={selectedAccess.address} defaultValue={selectedAccess.address} onChange={(e) => handleInputChange('selectedAccess', e)} />
                                                </FormField>
                                          </Column>
                                    </Row>
                              </ModalBody>
                            <ModalFooter className="flex justify-content--flex-end">
                                    <Button className="margin-right-small" theme="danger" type="button" onClick={() => toggleModal('updateAccess')}>Batal</Button>
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
                              <h4 className="heading-title">Daftar Access</h4>
                              <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6>
                        </PanelHeader>
                        <PanelBody>
                              <div className="admin-access__content">
                                    <TableSet
                                          loading={accessList.isFetching}
                                          loaded={accessList.isLoaded}
                                          columns={table.columns}
                                          rows={table.rows}
                                          striped 
                                          fullWidth
                                          pagination
                                    />
                              </div>
                        </PanelBody>
                  </Panel>

                  { renderAccessDetailModal() }
            </div>
      );
}

export default AdminAccessView;