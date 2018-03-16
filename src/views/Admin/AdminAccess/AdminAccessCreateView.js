import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Container, Row, Column } from '../../../layouts/Grid';
import { Form, FormField } from '../../../layouts/Form';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { Input, InputGroup, Select } from '../../../components/Input';
import { Button } from '../../../components/Button';

const AdminAccessCreateView = props => {
      const {
            handleInputChange,
            handleFormSubmit,
            newAccess
      } = props;
    
      return (
            <div className="admin-access-create">
                  <Section>
                        <Row>
                              <Column md={7}>
                                    <Panel>
                                    <PanelHeader>
                                          <h4 className="heading-title">Buat Access Baru</h4>
                                          <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6>
                                    </PanelHeader>
                                    <PanelBody>
                                          <Form onSubmit={handleFormSubmit}>
                                                <FormField label="Nama Kartu">
                                                      <Input name="name" type="text" placeholder="Masukkan nama kartu" onChange={(e) => handleInputChange('newAccess', e) } />
                                                </FormField>
                                                <FormField label="Pilih Modul">
                                                {/* <Select name="level" defaultValue={newAccess.level} onChange={(e) => handleInputChange('newAccess', e) }>
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

AdminAccessCreateView.propTypes = {
    
};

export default AdminAccessCreateView;