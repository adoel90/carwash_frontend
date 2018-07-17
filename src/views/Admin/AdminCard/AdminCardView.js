import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { FormGroup } from '../../../components/Form';
import { Form, FormField} from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, InputAddon, SwitchSquare, Textarea, InputCurrency } from '../../../components/Input';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Button } from '../../../components/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import NumberFormat from 'react-number-format';

import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table';

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
            search,
            openCardDetail,
            changeCardStatus,
            optionsPagination,
            bonus,
            handleTierTopup, //INI FUNCTION IS NOT OKE 
      } = props;

      //#This function is not ACTIVE until you use <BootstrapTable />
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
                        theme={datarow.status ? "success" : "danger"} 
                        onClick={() => changeCardStatus(datarow)}
                    >
                        { datarow.status ? 'Aktif' : 'Non Aktif' }
                    </Button>
                </div>
            );
      };

      //#This function is not ACTIVE until you use <BootstrapTable />
      const priceFormatter = (data) => {
            return <NumberFormat value={data} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} prefix={'Rp. '} decimalScale={2} />;
      };

      const renderCardDetailModal = () => {

            const {selectedCard } = props;
            let selectedCardJenisMember = selectedCard ? selectedCard.name : "Ga dapet"; 
            // console.log(selectedCard ? selectedCard.name : "Ga dapet");

            //#MEMBER
            if(selectedCardJenisMember === "Member"){
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
                                                <Column md={12}>
                                                      <FormField label="Jenis Member">
                                                            <InputGroup>
                                                                  <InputAddon>
                                                                        <i class="far fa-credit-card"></i>
                                                                  </InputAddon>
                                                                  <Input readOnly type="text" name="name" placeholder={selectedCard.name} defaultValue={selectedCard.name} onChange={(e) => handleInputChange('selectedCard', e)} />
                                                            </InputGroup>
                                                      </FormField>

                                                        <FormField label="Minimum Saldo">
                                                            <InputGroup>
                                                                  <InputAddon>
                                                                        Rp
                                                                  </InputAddon>
                                                                  <Input type="text" name="min" placeholder={selectedCard.min} defaultValue={selectedCard.min} onChange={(e) => handleInputChange('selectedCard', e)} />
                                                            </InputGroup>
                                                      </FormField>
                                                </Column>
                                          </Row>

                                          {/* OPSI NOMINAL SALDO */}
                                          <Row>
                                                <Column md={3}>
                                                      <FormField label="Top Up" >
                                                            <InputGroup>
                                                                  <InputAddon>
                                                                        Rp
                                                                  </InputAddon>
                                                                  <Input type="text" placeholder="Isi Top-up 1" name="opsi1" onChange={(e) => handleInputChange('selectedCard', e)} />
                                                            </InputGroup>
                                                      </FormField>
                                                </Column>
                                                <Column md={3}>
                                                      <FormField label="Top Up">
                                                            <InputGroup>
                                                                  <InputAddon>
                                                                        Rp
                                                                  </InputAddon>
                                                                  <Input type="text" placeholder="Isi Top-up 2" name="opsi2" onChange={(e) => handleInputChange('selectedCard', e)} />
                                                            </InputGroup>
                                                      </FormField>
                                                </Column>

                                                <Column md={3}>
                                                      <FormField label="Top Up">
                                                            <InputGroup>
                                                                  <InputAddon>
                                                                        Rp
                                                                  </InputAddon>
                                                                  <Input type="text" placeholder="Isi Top-up 3" name="opsi3" onChange={(e) => handleInputChange('selectedCard', e)} />
                                                            </InputGroup>
                                                      </FormField>
                                                </Column>
                                          </Row>

                                          {/* OPSI BONUS */}
                                          <Row>
                                                <Column md={3}>
                                                      <FormField label="Bonus">
                                                            <InputGroup>
                                                                  <InputAddon>
                                                                        Rp
                                                                  </InputAddon>
                                                                  <Input type="text" placeholder="Isi Bonus-1" name="bonus1" onChange={(e) => handleInputChange('selectedCard', e)} />
                                                            </InputGroup>
                                                      </FormField>
                                                </Column>
                                                <Column md={3}>
                                                      <FormField label="Bonus">
                                                            <InputGroup>
                                                                  <InputAddon>
                                                                        Rp
                                                                  </InputAddon>
                                                                  <Input type="text" placeholder="Isi Bonus-2" name="bonus2" onChange={(e) => handleInputChange('selectedCard', e)} />
                                                            </InputGroup>
                                                      </FormField>
                                                </Column>
                                                <Column md={3}>
                                                      <FormField label="Bonus">
                                                            <InputGroup>
                                                                  <InputAddon>
                                                                        Rp
                                                                  </InputAddon>
                                                                  <Input type="text" placeholder="Isi Bonus-3" name="bonus3" onChange={(e) => handleInputChange('selectedCard', e)} />
                                                            </InputGroup>
                                                      </FormField>
                                                </Column>
                                          </Row>

                                          <Row>
                                                <Column>
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
            };

            if(selectedCardJenisMember === "Non-Member") {

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
                                                <FormField label="Jenis Member">
                                                      <InputGroup>
                                                            <InputAddon>
                                                                  <i class="far fa-credit-card"></i>
                                                            </InputAddon>
                                                            <Input readOnly type="text" name="name" placeholder={selectedCard.name} defaultValue={selectedCard.name} onChange={(e) => handleInputChange('selectedCard', e)} />
                                                      </InputGroup>
                                                </FormField>                                                
                                                <FormField label="Minimum Saldo">
                                                      <InputGroup>
                                                            <InputAddon>
                                                                  <small class="fw-semibold tt-uppercase ls-base">Rp</small>
                                                            </InputAddon>
                                                            <InputCurrency 
                                                                  className="input"
                                                                  type="text" 
                                                                  name="min" 
                                                                  placeholder={selectedCard.min} 
                                                                  defaultValue={selectedCard.min} 
                                                                  value={selectedCard.min}
                                                                  onChange={(e) => handleInputChange('selectedCard', e)} 
                                                            />
                                                      </InputGroup>
                                                </FormField>
                                          </Column>
                                    </Row>
                                    <Row>
                                          <Column md={6}>
                                                <FormField label="Top Up">
                                                      <InputGroup>
                                                            <InputAddon>
                                                                  <small class="fw-semibold tt-uppercase ls-base">Rp</small>
                                                            </InputAddon>
                                                            <InputCurrency 
                                                                  className="input"
                                                                  type="text" 
                                                                  name="opsinonmember" 
                                                                  placeholder="Isi Top-up" 
                                                                  // defaultValue={selectedCard.min} 
                                                                  value={selectedCard.opsinonmember}
                                                                  onChange={(e) => handleInputChange('selectedCard', e)} 
                                                            />
                                                      </InputGroup>
                                                </FormField>
                                          </Column>
                                          <Column md={6}>
                                                <FormField label="Bonus">
                                                      <InputGroup>
                                                            <InputAddon>
                                                                  <small class="fw-semibold tt-uppercase ls-base">Rp</small>
                                                            </InputAddon>
                                                            <InputCurrency 
                                                                  className="input"
                                                                  type="text" 
                                                                  name="bonusnonmember" 
                                                                  placeholder="Isi Bonus Top-up" 
                                                                  // defaultValue={selectedCard.min} 
                                                                  value={selectedCard.bonusnonmember}
                                                                  onChange={(e) => handleInputChange('selectedCard', e)} 
                                                            />
                                                      </InputGroup>
                                                </FormField>
                                          </Column>
                                    </Row>
                                    <Row>
                                          <Column>
                                                <FormField label="Refund">
                                                      <SwitchSquare name="refund" value={Boolean(selectedCard.refund)} onChange={(e) => handleInputChange('selectedCard', e)} />
                                                </FormField>
                                                <FormField label="Charge">
                                                      <SwitchSquare name="charge" value={Boolean(selectedCard.charge)} onChange={(e) => handleInputChange('selectedCard', e)} />
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
      };

      return (
            <div>
                  <Panel>
                        <PanelHeader>
                              <h4 className="heading-title">Daftar Kartu</h4>
                              {/* <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6> */}
                        </PanelHeader>
                        <PanelBody>
                              <Column md={12}>
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
                                                // searchParams={table.searchParams}
                                                searchBy={search.searchBy}
                                                handleInputChange={handleInputChange}
                                                {...props}
                                          />

                                          {/* {
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
                                                                  dataField="name" 
                                                                  headerAlign="left" 
                                                                  dataAlign="left"
                                                                  width="30%"
                                                            >
                                                                  Nama
                                                            </TableHeaderColumn>
                                                            <TableHeaderColumn 
                                                                  dataField="min" 
                                                                  headerAlign="center" 
                                                                  dataAlign="right"
                                                                  width="20%"
                                                                  dataFormat={priceFormatter}
                                                            >
                                                                  Minimum
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
                                          } */}
                                    </div>
                              </Column>
                        </PanelBody>
                  </Panel>

                  { renderCardDetailModal() }
            </div>
      );
}

export default AdminCardView;