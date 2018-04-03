import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Container, Row, Column } from '../../../layouts/Grid';
import { Form, FormField } from '../../../layouts/Form';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { Input, InputGroup, InputAddon, Select } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { ButtonDewek } from '../../../components/ButtonDewek';

const AdminStoresEmployeeCreateView = props => {


    const { handleFormSubmit, handleInputChange } = props;

    return (
        <div className="admin-dashboard">
            <Section>
                <Row>
                    <Column md={7}>
                        <Panel>
                            <PanelHeader>
                                <h4 className="heading-title">Buat Staff Baru</h4>
                            </PanelHeader>
                            <PanelBody>
                                <Form onSubmit={handleFormSubmit}>
                                    <FormField label="Nama Staff Baru">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-user"></i>
                                            </InputAddon>
                                            <Input name="name" type="text" placeholder="Masukkan nama lengkap staff baru" onChange={(e) => handleInputChange('newStaff', e) } />
                                        </InputGroup>
                                    </FormField>

                                    
                                    <Button type="submit">Simpan</Button>
                                </Form>
                            </PanelBody>
                        </Panel> 
                    </Column>
                </Row>
            </Section>
        </div>
    )
};

export default AdminStoresEmployeeCreateView;