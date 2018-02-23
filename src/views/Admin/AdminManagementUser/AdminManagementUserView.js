import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel } from '../../../components/Panel';
import { Input, Select } from '../../../components/Input';
import { Form, FormField} from '../../../layouts/Form';
import {Button} from '../../../components/Button';

const AdminManagementUserView = props => {

    const { handleSubmit,handleEventChange } = props;


    return (
        <div className="admin-user">
            <Panel>
                <div className="admin-user__heading padding-bottom-large">
                    <h4 className="heading-title">Buat User Baru</h4>
                    <p>Buat user baru </p>
                </div>

                <Form onSubmit={handleSubmit} >
                    <FormField>
                        <Input onChange="{(e) => handleEventChange(e)}" name="username" type="text" placeholder="Nama yang akan di tampilkan saat Login" />
                    </FormField>              
                    
                    <FormField>
                        <Input onChange="{(e) => handleEventChange(e)}" name="password" type="text" placeholder="Password" />
                    </FormField>

                    <FormField>
                        <Input onChange="{(e) => handleEventChange(e)}" name="name" type="text" placeholder="Nama Lengkap" />
                    </FormField>  

                      <FormField>
                        <Input onChange="{(e) => handleEventChange(e)}" name="email" type="text" placeholder="Alamat Email" />
                    </FormField>  

                    <FormField>
                        <Select onChange="{(e) => handleEventChange(e)}" name="level">
                            <option value="">Administrator</option>
                            <option value="">Cafe</option>
                        </Select>
                    </FormField>
                    <Button type="submit">Simpan</Button>  
                </Form>

            </Panel>
        </div>
    );
};

AdminManagementUserView.propTypes = {
    
};

export default AdminManagementUserView;