import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, InputAddon, SwitchSquare, Textarea, InputCurrency } from '../../../components/Input';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Button } from '../../../components/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import NumberFormat from 'react-number-format';

import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table';

const AdminCardSettingView = props => {
      const {
            isModalOpen,
            table,
            cardList,
            toggleModal,
            handleInputChange,
            updateCard,
            selectedCard,
            access,
            search,
            openCardDetail,
            changeCardStatus,
            optionsPagination,
            deleteBalance
      } = props;

      const componentButtonUpdate = (datarow) => {
            return (
                <div>
                    <Button 
                        type="button" 
                        className="margin-right-small" 
                        onClick={() => openCardDetail(datarow)}
                    >
                        Ubah
                    </Button>
                    <Button 
                        type="button" 
                        theme={"danger"} 
                        onClick={() => deleteBalance(datarow)}
                    >
                        Hapus
                    </Button>
                </div>
            );
      };

      const priceFormatter = (data) => {
            return <NumberFormat value={data} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} prefix={'Rp. '} decimalScale={2} />;
      }

      const renderCardDetailModal = () => {
            if(selectedCard) {
                return (
                    <Modal
                        isOpen={isModalOpen.updateCard}
                        toggle={() => toggleModal('updateCard')}>
                        <ModalHeader>
                            <h5>Ubah Nominal Topup</h5>
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
                                                            <Input type="text" name="name" placeholder={selectedCard.card.name} defaultValue={selectedCard.card.name} onChange={(e) => handleInputChange('selectedCard', e)} readOnly />
                                                      </InputGroup>
                                                </FormField>
                                                <FormField label="Saldo">
                                                      <InputGroup>
                                                            <InputAddon>
                                                                  <small class="fw-semibold tt-uppercase ls-base">Rp</small>
                                                            </InputAddon>
                                                            <InputCurrency 
                                                                  className="input"
                                                                  type="text" 
                                                                  name="balance" 
                                                                  placeholder={selectedCard.balance} 
                                                                  defaultValue={selectedCard.balance} 
                                                                  value={selectedCard.balance}
                                                                  onChange={(e) => handleInputChange('selectedCard', e)} 
                                                            />
                                                      </InputGroup>
                                                </FormField>
                                                      <FormField label="Bonus">
                                                            <InputGroup>
                                                                  <InputAddon>
                                                                        <small class="fw-semibold tt-uppercase ls-base">Rp</small>
                                                                  </InputAddon>
                                                                  <InputCurrency 
                                                                        className="input" 
                                                                        type="text" 
                                                                        name="bonus" 
                                                                        placeholder={selectedCard.bonus} 
                                                                        defaultValue={selectedCard.bonus} 
                                                                        value={selectedCard.bonus}
                                                                        onChange={(e) => handleInputChange('selectedCard', e)} 
                                                                  />
                                                            </InputGroup>
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
                              <h4 className="heading-title">Pengaturan Jenis Kartu</h4>
                              {/* <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6> */}
                        </PanelHeader>
                        <PanelBody>
                              <Column md={12}>
                                    <div className="admin-Card__content">
                                          <br /><br />   
                                          <br />

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
                                                                  dataField="card" 
                                                                  headerAlign="left" 
                                                                  dataAlign="left"
                                                                  width="30%"
                                                            >
                                                                  Jenis Kartu
                                                            </TableHeaderColumn>
                                                            <TableHeaderColumn 
                                                                  dataField="balance" 
                                                                  headerAlign="center" 
                                                                  dataAlign="right"
                                                                  width="20%"
                                                                  dataFormat={priceFormatter}
                                                            >
                                                                  Saldo
                                                            </TableHeaderColumn>
                                                            <TableHeaderColumn 
                                                                  dataField="bonus" 
                                                                  headerAlign="center" 
                                                                  dataAlign="right"
                                                                  width="20%"
                                                                  dataFormat={priceFormatter}
                                                            >
                                                                  Bonus
                                                            </TableHeaderColumn>
                                                            <TableHeaderColumn 
                                                                  dataField="data" 
                                                                  headerAlign="center"
                                                                  dataAlign="center"
                                                                  dataFormat={componentButtonUpdate}
                                                                  width="30%"
                                                            >
                                                                  Aksi
                                                            </TableHeaderColumn>
                                                      </BootstrapTable>
                                                : null
                                          }
                                    </div>
                              </Column>
                        </PanelBody>
                  </Panel>

                  { renderCardDetailModal() }
            </div>
      );
}

export default AdminCardSettingView;