import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Container, Row, Column } from '../../../layouts/Grid';
import { Form, FormField } from '../../../layouts/Form';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { Input, InputGroup, InputAddon, Select } from '../../../components/Input';
import { Button } from '../../../components/Button';

const AdminStoreCreateView = props => {
    const {
        handleInputChange,
        handleFormSubmit,
        newStore,
        store,
        category,
        user
    } = props;


    
    return (
        <div className="admin-user-create">
            <Section>
                <Row>
                    <Column md={7}>
                        <Panel>
                            <PanelHeader>
                                <h4 className="heading-title">Buat Store Baru</h4>
                                {/* <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6> */}
                            </PanelHeader>
                            <PanelBody>
                                <Form onSubmit={handleFormSubmit}>
                                    <FormField label="Owner">
                                        <Select name="user" defaultValue={newStore.user} onChange={(e) => handleInputChange('newStore', e) } required>
                                            <option value="">Select</option> 
                                            {
                                                    user.list.isLoaded ? user.list.data.data.result.map((item, i) => {
                                                        return <option value={item.id}>{item.name}</option>
                                                    })
                                                    : null
                                            }
                                        </Select>
                                    </FormField>
                                    <FormField label="Nama Store">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-shopping-cart"></i>
                                            </InputAddon>
                                            <Input name="name" type="text" placeholder="Masukkan nama lengkap store" onChange={(e) => handleInputChange('newStore', e) } required />
                                        </InputGroup>
                                    </FormField>
                                    <FormField label="Kategori">
                                          <Select name="category" defaultValue={newStore.category} onChange={(e) => handleInputChange('newStore', e) } required>
                                                <option value="">Select</option>
                                                {
                                                      store.category.isLoaded ? store.category.data.data.result.map((item, i) => {
                                                      return <option value={item.id}>{item.name}</option>
                                                      })
                                                      : null
                                                }
                                          </Select>
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

AdminStoreCreateView.propTypes = {
    
};

export default AdminStoreCreateView;