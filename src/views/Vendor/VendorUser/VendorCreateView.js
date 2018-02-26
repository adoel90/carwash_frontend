import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from '../../../components/Panel';
import { Form, FormField } from '../../../layouts/Form';
import { Input, InputGroup, Select } from '../../../components/Input';
import { Button } from '../../../components/Button';

const VendorCreateView = props => {
    
    const {
        handleInputChange,
        handleFormSubmit,
        newUser
    } = props;
    
    return (
        <div className="admin-user-create">
            <Panel>
                <div className="admin-user__heading padding-bottom-large">
                    <h4 className="heading-title">Form Vendor Baru</h4>
                    <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6>
                </div>

                 <Form onSubmit={handleFormSubmit}>
                    <FormField label="Nama Vendor">
                        <Input name="cafe_name" type="text" placeholder="Masukkan nama vendor baru" onChange={(e) => handleInputChange('newVendorState', e) } />
                    </FormField>

                    <FormField label="Employee Full Name">
                        <Input name="fullname" type="text" placeholder="Masukkan Full Name Employee " onChange={(e) => handleInputChange('newVendorState', e) } />
                    </FormField>

                   <FormField label="Alamat Email">
                        <Input name="email" type="text" placeholder="Masukkan alamat email user (jika ada)" onChange={(e) => handleInputChange('newVendorState', e) } />
                    </FormField>

                    <FormField label="Username ">
                        <Input name="username" type="text" placeholder="Masukkan nickname employee" onChange={(e) => handleInputChange('newVendorState', e) } />
                    </FormField>

                    <FormField label="Password">
                        <InputGroup>
                            <Input name="password" type="password" placeholder="Masukkan kata sandi" onChange={(e) => handleInputChange('newVendorState', e) } />
                            <Input name="confirmPassword" type="password" placeholder="Ulangi kata sandi" onChange={(e) => handleInputChange('newVendorState', e) } />                            
                        </InputGroup>
                    </FormField>

                    <Button type="submit">Simpan</Button>


                </Form>
            </Panel>
        </div>
    );
};

VendorCreateView.propTypes = {
    
};

export default VendorCreateView;