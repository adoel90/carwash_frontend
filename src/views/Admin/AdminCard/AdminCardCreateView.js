import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Container, Row, Column } from '../../../layouts/Grid';
import { Form, FormField } from '../../../layouts/Form';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { Input, InputGroup, InputAddon, Select } from '../../../components/Input';
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
                                                            <Input name="name" type="text" placeholder="Masukkan nama kartu" onChange={(e) => handleInputChange('newCard', e) } />
                                                      </InputGroup>
                                                </FormField>
                                                <FormField label="Minimum Saldo">
                                                      <InputGroup>
                                                            <InputAddon>
                                                                  <small class="fw-semibold tt-uppercase ls-base">Rp</small>
                                                            </InputAddon>
                                                            <Input name="minimum" type="text" placeholder="Masukkan minimum saldo" onChange={(e) => handleInputChange('newCard', e) } />
                                                      </InputGroup>
                                                </FormField>
                                                <FormField label="Bonus">
                                                      <InputGroup>
                                                            <InputAddon>
                                                                  <small class="fw-semibold tt-uppercase ls-base">Rp</small>
                                                            </InputAddon>
                                                            <Input name="bonus" type="text" placeholder="Masukkan nominal bonus" onChange={(e) => handleInputChange('newCard', e) } />
                                                      </InputGroup>
                                                </FormField>
                                                <FormField label="Refund">
                                                {/* <Select name="level" defaultValue={newCard.level} onChange={(e) => handleInputChange('newCard', e) }>
                                                      {
                                                            access.list.isLoaded ? access.list.data.result.map((item, i) => {
                                                            return <option value={item.id}>{item.name}</option>
                                                            })
                                                            : null
                                                      }
                                                </Select> */}
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