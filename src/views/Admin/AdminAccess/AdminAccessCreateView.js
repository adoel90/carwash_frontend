import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Container, Row, Column } from '../../../layouts/Grid';
import { Form, FormField } from '../../../layouts/Form';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { Input, InputGroup, InputAddon, Select, SwitchSquare } from '../../../components/Input';
import { Button } from '../../../components/Button';

const AdminAccessCreateView = props => {
      const {
            handleInputChange,
            handleInputChangeModule,
            handleFormSubmit,
            newAccess,
            module
      } = props;

      const renderModuleList = () => {
            const checkModule = (module) => {
                  if(newAccess.module) {
                      return newAccess.module.some((item) => {
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
                                                      <SwitchSquare name="module" value={checkModule(item)} onChange={(e) => handleInputChangeModule(newAccess, item, e)} />
                                                </FormField>
                                          </div>
                                    ))
                              }
                        </div>
                  )
            }
      }
    
      return (
            <div className="admin-access-create">
                  <Section>
                        <Row>
                              <Column md={12}>
                                    <Panel>
                                    <PanelHeader>
                                          <h4 className="heading-title">Buat Akses Baru</h4>
                                          {/* <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6> */}
                                    </PanelHeader>
                                    <PanelBody>
                                          <Form onSubmit={handleFormSubmit}>
                                                <FormField label="Nama Akses Level">
                                                      <InputGroup>
                                                            <InputAddon>
                                                                  <i class="far fa-user"></i>
                                                            </InputAddon>
                                                            <Input name="name" type="text" placeholder="Masukkan nama akses level" onChange={(e) => handleInputChange('newAccess', e) } />
                                                      </InputGroup>
                                                </FormField>
                                                <FormField label="Pilih Modul">
                                                      { renderModuleList() }
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