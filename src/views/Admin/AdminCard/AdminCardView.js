import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, InputAddon, SwitchSquare, Textarea } from '../../../components/Input';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Button } from '../../../components/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

const AdminCardView = props => {
      const {
            isModalOpen,
            table,
            cardList,
            toggleModal,
            handleInputChange,
            updateCard,
            selectedCard,
            access,
            search
      } = props;

      const renderCardDetailModal = () => {
            if(selectedCard) {
                return (
                    <Modal
                        isOpen={isModalOpen.updateCard}
                        toggle={() => toggleModal('updateCard')}>
                        <ModalHeader>
                            <h5>Ubah Informasi Card</h5>
                        </ModalHeader>
                        <Form onSubmit={updateCard}>
                              <ModalBody>
                                    <Row>
                                          <Column>
                                                <FormField label="Nama Kartu">
                                                      <InputGroup>
                                                            <InputAddon>
                                                                  <i class="far fa-credit-card"></i>
                                                            </InputAddon>
                                                            <Input type="text" name="name" placeholder={selectedCard.name} defaultValue={selectedCard.name} onChange={(e) => handleInputChange('selectedCard', e)} />
                                                      </InputGroup>
                                                </FormField>
                                                <FormField label="Minimum Saldo">
                                                      <InputGroup>
                                                            <InputAddon>
                                                                  <small class="fw-semibold tt-uppercase ls-base">Rp</small>
                                                            </InputAddon>
                                                            <Input type="text" name="min" placeholder={selectedCard.min} defaultValue={selectedCard.min} onChange={(e) => handleInputChange('selectedCard', e)} />
                                                      </InputGroup>
                                                </FormField>
                                                <FormField label="Bonus Saldo">
                                                      <InputGroup>
                                                            <InputAddon>
                                                                  <small class="fw-semibold tt-uppercase ls-base">Rp</small>
                                                            </InputAddon>
                                                            <Input type="text" name="bonus" placeholder={selectedCard.bonus} defaultValue={selectedCard.bonus} onChange={(e) => handleInputChange('selectedCard', e)} />
                                                      </InputGroup>
                                                </FormField>
                                                <FormField label="Refund">
                                                      <SwitchSquare name="refund" value={Boolean(selectedCard.refund)} onChange={(e) => handleInputChange('selectedCard', e)} />
                                                </FormField>
                                          </Column>
                                    </Row>
                              </ModalBody>
                            <ModalFooter className="flex justify-content--flex-end">
                                <Button className="margin-right-small" theme="danger" type="button" onClick={() => toggleModal('updateCard')}>Batal</Button>
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
                              <h4 className="heading-title">Daftar Kartu</h4>
                              {/* <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6> */}
                        </PanelHeader>
                        <PanelBody>
                              <div className="admin-Card__content">
                                    <TableSet
                                          loading={cardList.isFetching}
                                          loaded={cardList.isLoaded}
                                          columns={table.columns}
                                          rows={table.rows}
                                          striped 
                                          fullWidth
                                          pagination
                                          placeholder="Cari kartu yang terdaftar"
                                          hasSearchBar
                                          searchParams={table.searchParams}
                                          searchBy={search.searchBy}
                                          handleInputChange={handleInputChange}
                                          {...props}
                                    />
                              </div>
                        </PanelBody>
                  </Panel>

                  { renderCardDetailModal() }
            </div>
      );
}

export default AdminCardView;