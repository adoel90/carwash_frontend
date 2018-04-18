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
            selectedMemberDetail,
            access,
            search,
            detailMember,
            listMemberTransactionHistoris,
            member
      } = props;


      const tableStyle = {
            color:  '#333',
            'font-family':' Helvetica, Arial, sans-serif',
            width: '100%',
            'border-collapse':'collapse',
            'border-spacing': '0'
      }

      const tdThStyle = {
            border: '1px solid #CCC',
            height: '30px'
      }

      const tdStyle = {
            'text-align': 'center'
      }


      //Modal detail
      const renderMemberDetailModal = () => {
            
            const { member, listMemberTransactionHistoris } = props;

            let customerName = selectedMemberDetail.name;
            let transactionHistory = member.memberHistoris.isLoaded ? listMemberTransactionHistoris.transaction : null;
            
            if(selectedMemberDetail){
                  if(member.memberHistoris.isLoaded){
                        return (
                              <Modal isOpen={isModalOpen.detailMember} toggle={ () => toggleModal('detailMember')}>
                                    <ModalHeader>
                                          <h5>Detail Histori Customer : { customerName }</h5>
                                    </ModalHeader>
                                    <ModalBody> 
                                          <Row>
                                                <Column>
                                                      <h4>{selectedMemberDetail.name}</h4><br/>
                                                      <h6>Id Kartu : {selectedMemberDetail.cardNumber}</h6>
                                                      <h6>Tipe Kartu : {selectedMemberDetail.cardType}</h6>
                                                      <h6>Saldo saat ini : {listMemberTransactionHistoris.balance} </h6><br />
                                                
                                                      <table style={tableStyle}>
                                                            <tr>
                                                                  <th style={tdThStyle}>Tanggal Transaksi</th>
                                                                  <th style={tdThStyle}>Total Pembayaran</th>
                                                                  <th style={tdThStyle}>Belanja di :</th>
                                                            </tr>
                                                            {member.memberHistoris.isLoaded ?  props.member.memberHistoris.data.data.result.transaction.map((value) => {
                                                                  return (
                                                                        <tr>
                                                                              <td style={tdThStyle, tdStyle}> {moment(value.date).format('DD-MM-YYYY')}</td>
                                                                              <td style={tdThStyle, tdStyle}> {value.total}</td>
                                                                              <td style={tdThStyle, tdStyle}>{value.type}</td>
                                                                        </tr>      
                                                                  )
                                                            }) : null }
                                                      </table>
                                                </Column>
                                          </Row>
                                    </ModalBody>
                              </Modal>
                        )
                  }
            }
      }

      //Modal Update
      const renderMemberUpdateModal = () => {
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
                              </div>
                        </PanelBody>
                  </Panel>
                  { renderMemberDetailModal() }
                  { renderMemberUpdateModal() }
            </div>
      );
}

export default AdminMemberView;