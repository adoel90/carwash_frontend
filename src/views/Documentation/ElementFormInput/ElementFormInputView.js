import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { Container, Row, Column } from '../../../layouts/Grid';
import { Form, FormField } from '../../../layouts/Form';
import { Input, InputGroup, InputAddon, SelectSpecial } from '../../../components/Input';
import { Button } from '../../../components/Button';

const ElementFormInputView = props => {

    const { handleInputChange, handleFormSubmit } = props;  

    return (
        <div className="admin-dashboard">
            <Section>
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Form Input </h4>
                    </PanelHeader>
                    <PanelBody>
                        <Row>
                            <Column md={7}>
                                <Form onSubmit={handleFormSubmit}>
                                    <FormField label="Nama Lengkap">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-user"></i>
                                            </InputAddon>
                                            <Input name="name" type="text" placeholder="Masukkan nama lengkap" onChange={(e) => handleInputChange('newStaff', e) } />
                                        </InputGroup>
                                    </FormField>
                                    
                                    <FormField label="Username">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-user"></i>
                                            </InputAddon>
                                            <Input name="username" type="text" placeholder="Masukkan Username" onChange={(e) => handleInputChange('newStaff', e) } />
                                        </InputGroup>
                                    </FormField>

                                    <FormField label="Password">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-lock"></i>
                                            </InputAddon>
                                            <Input name="password" type="password" placeholder="Masukkan password" onChange={(e) => handleInputChange('newStaff', e) } />
                                            <Input name="confirmPassword" type="password" placeholder="Ulangi kata sandi" onChange={(e) => handleInputChange('newStaff', e) } required />
                                        
                                        </InputGroup>
                                    </FormField>

                                    <FormField label="Email">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-envelope"></i>
                                            </InputAddon>
                                            <Input name="email" type="text" placeholder="Masukkan alamat Email" onChange={(e) => handleInputChange('newStaff', e) } />
                                        </InputGroup>
                                    </FormField>
                                    <Button type="submit">Simpan</Button>
                                </Form>
                            </Column>


                            {/************************************************* (-_-  */}
                            <Column md={5}></Column>
                        </Row>
                    </PanelBody>
                </Panel>
            </Section>
        </div>
    )
};

export default ElementFormInputView;