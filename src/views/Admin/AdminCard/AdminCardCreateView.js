import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Container, Row, Column } from '../../../layouts/Grid';
import { Form, FormField } from '../../../layouts/Form';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { Input, InputGroup, InputAddon, Select, SwitchSquare, InputCurrency } from '../../../components/Input';
import { Button } from '../../../components/Button';

const AdminCardCreateView = props => {
      const {
            handleInputChange,
            handleFormSubmit,
            newCard
      } = props;
    
      return (
            <div className="admin-user-create">
                  <Section>
                        <Row>
                              <Column md={7}>
                                    <Panel>
                                    <PanelHeader>
                                          <h4 className="heading-title">Buat Kartu Baru</h4>
                                          {/* <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6> */}
                                    </PanelHeader>
                                    <PanelBody>
                                          <Form onSubmit={handleFormSubmit}>
                                                <FormField label="Nama Kartu">
                                                      <InputGroup>
                                                            <InputAddon>
                                                                  <i class="far fa-credit-card"></i>
                                                            </InputAddon>
                                                            <Input name="name" type="text" placeholder="Masukkan nama kartu" onChange={(e) => handleInputChange('newCard', e) } required />
                                                      </InputGroup>
                                                </FormField>
                                                <FormField label="Minimum Saldo">
                                                      <InputGroup>
                                                            <InputAddon>
                                                                  <small class="fw-semibold tt-uppercase ls-base">Rp</small>
                                                            </InputAddon>
                                                            <InputCurrency 
                                                                  className="input"
                                                                  name="minimum" 
                                                                  type="text" 
                                                                  placeholder="Masukkan minimum saldo" 
                                                                  onChange={(e) => handleInputChange('newCard', e) } 
                                                                  required 
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
                                                                  name="bonus" 
                                                                  type="text" 
                                                                  placeholder="Masukkan nominal bonus" 
                                                                  onChange={(e) => handleInputChange('newCard', e) } 
                                                                  required 
                                                            />
                                                      </InputGroup>
                                                </FormField>
                                                <FormField label="Refund">
                                                      <SwitchSquare name="refund" value={Boolean(newCard.refund)} onChange={(e) => handleInputChange('newCard', e)} />
                                                      <small>Refund diperuntukan untuk non-member</small>
                                                </FormField>
                                                <FormField label="Charge">
                                                      <SwitchSquare name="charge" value={Boolean(newCard.charge)} onChange={(e) => handleInputChange('newCard', e)} />
                                                      <small>Charge diperuntukan untuk Taxi Online</small>
                                                </FormField>
                                                <Button type="submit">Simpan</Button>
                                          </Form>
                                    </PanelBody>
                                    </Panel>
                              </Column>
                        </Row>
                  </Section>
            </div>
      );
};

AdminCardCreateView.propTypes = {
    
};

export default AdminCardCreateView;