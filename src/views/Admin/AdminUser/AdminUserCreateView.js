import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from '../../../components/Panel';
import { Form, FormField } from '../../../layouts/Form';
import { Input, InputGroup, Select } from '../../../components/Input';
import { Button } from '../../../components/Button';

const AdminUserCreateView = props => {
    const {
        handleInputChange,
        handleFormSubmit,
        newUser
    } = props;
    
    return (
        <div className="admin-user-create">
            <Panel>
                <div className="admin-user__heading padding-bottom-large">
                    <h4 className="heading-title">Buat User Baru</h4>
                    <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6>
                </div>
                <Form onSubmit={handleFormSubmit}>
                    <FormField label="Username">
                        <Input name="username" type="text" placeholder="Masukkan username" onChange={(e) => handleInputChange('newUser', e) } />
                    </FormField>
                    <FormField label="Password">
                        <InputGroup>
                            <Input name="password" type="password" placeholder="Masukkan kata sandi" onChange={(e) => handleInputChange('newUser', e) } />
                            <Input name="confirmPassword" type="password" placeholder="Ulangi kata sandi" onChange={(e) => handleInputChange('newUser', e) } />                            
                        </InputGroup>
                    </FormField>
                    <FormField label="Nama lengkap">
                        <Input name="name" type="text" placeholder="Masukkan nama lengkap user" onChange={(e) => handleInputChange('newUser', e) } />
                    </FormField>
                    <FormField label="Alamat Email">
                        <Input name="email" type="text" placeholder="Masukkan alamat email user (jika ada)" onChange={(e) => handleInputChange('newUser', e) } />
                    </FormField>
                    <FormField label="Level Akses">
                        <Select name="level" defaultValue={newUser.level} onChange={(e) => handleInputChange('newUser', e) }>
                            <option value={0}>Administrator</option>
                            <option value={1}>Kasir</option>
                        </Select>
                    </FormField>
                    <Button type="submit">Simpan</Button>
                </Form>
            </Panel>
        </div>
    );
};

AdminUserCreateView.propTypes = {
    
};

export default AdminUserCreateView;