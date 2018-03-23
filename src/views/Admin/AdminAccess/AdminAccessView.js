import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, InputAddon, Switch, SwitchSquare, Textarea } from '../../../components/Input';
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
            handleInputChangeModule,
            updateAccess,
            selectedAccess,
            module
      } = props;

      const renderModuleList = () => {
            const checkModule = (module) => {
                  if(selectedAccess.module) {
                      return selectedAccess.module.some((item) => {
                          return module.id == item.id
                      })
  
                  }
            }
            
            if(module.list.isLoaded) {
                  return (
                        <div className="flex justify-content--space-around" style={{flexWrap: "wrap"}}>
                              {
                                    module.list.data.result.map((item, i) => (
                                          <div key={item.id} style={{minWidth:"200px"}}>
                                                <FormField label={item.name}>
                                                      <SwitchSquare name="module" value={checkModule(item)} onChange={(e) => handleInputChangeModule(selectedAccess, item, e)} />
                                                </FormField>
                                          </div>
                                    ))
                              }
                        </div>
                  )
            }
      }

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
                                                      <InputGroup>
                                                            <InputAddon>
                                                                  <i class="far fa-user"></i>
                                                            </InputAddon>

                                                            <Input type="text" name="name" placeholder={selectedAccess.name} defaultValue={selectedAccess.name} onChange={(e) => handleInputChange('selectedAccess', e)} />
                                                      </InputGroup>
                                                </FormField>
                                                <FormField label="Pilih Modul">
                                                      { renderModuleList() }
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
                              <h4 className="heading-title">Daftar Akses</h4>
                              {/* <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6> */}
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