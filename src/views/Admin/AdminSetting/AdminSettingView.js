import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Container, Row, Column } from '../../../layouts/Grid';
import { Form, FormField } from '../../../layouts/Form';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { Input, InputGroup, InputAddon, Select } from '../../../components/Input';
import { Button } from '../../../components/Button';

const AdminSettingView = props => {
    const {
        handleInputChange,
        handleFormSubmit,
        updateUser,
        access
    } = props;
    
    console.log(props)
    
    return (
        <div className="admin-user-create">
            <Section>
                <Row>
                    <Column md={7}>
                        <Panel>
                            <PanelHeader>
                                <h4 className="heading-title">Buat User Baru</h4>
                                {/* <h6 className="heading-subtitle">Membuat user baru.</h6> */}
                            </PanelHeader>
                            <PanelBody>
                                <Form onSubmit={handleFormSubmit}>
                                    <FormField label="Nama lengkap">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="far fa-user"></i>
                                            </InputAddon>
                                            <Input name="name" type="text" placeholder="Masukkan nama lengkap user" value={updateUser.name} onChange={(e) => handleInputChange('updateUser', e) } />
                                        </InputGroup>
                                    </FormField>
                                    <FormField label="Alamat Email">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="far fa-envelope"></i>
                                            </InputAddon>
                                            <Input name="email" type="text" placeholder="Masukkan alamat email user (jika ada)" value={updateUser.email} onChange={(e) => handleInputChange('updateUser', e) } />
                                        </InputGroup>
                                    </FormField>
                                    <FormField label="Username">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="far fa-user"></i>
                                            </InputAddon>
                                            <Input name="username" type="text" placeholder="Masukkan username" value={updateUser.username} onChange={(e) => handleInputChange('updateUser', e) } />
                                        </InputGroup>
                                    </FormField>
                                    <FormField label="Password">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-lock"></i>
                                            </InputAddon>
                                            <Input name="password" type="password" placeholder="Masukkan kata sandi" onChange={(e) => handleInputChange('updateUser', e) } />
                                            <Input name="confirmPassword" type="password" placeholder="Ulangi kata sandi" onChange={(e) => handleInputChange('updateUser', e) } />
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
    );
}

AdminSettingView.propTypes = {

};

export default AdminSettingView;