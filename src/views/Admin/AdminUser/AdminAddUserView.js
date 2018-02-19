import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Row, Column } from '../../../layouts/Grid';
import { Form, FormField } from '../../../layouts/Form';
import { Panel } from '../../../components/Panel';
import { Input, InputGroup, Textarea } from '../../../components/Input';
import { Button } from '../../../components/Button';

const AdminAddUserView = props => {
    return (
        <div className="admin-user">
            <Section>
                <Panel>
                    <div className="admin-user__heading">
                        <h4 className="heading-title">Tambah User Baru</h4>
                        <h6 className="heading-subtitle">Pastikan seluruh kolom dengan tanda asterisk (*) terisi dengan lengkap.</h6>
                    </div>
                    <Form style={{width: '800px', margin: '0 auto'}}>
                        <FormField label="Nama Lengkap">
                            <Input name="fullname" type="text" placeholder="e.g: John Doe, Bill Robert, dll." />
                        </FormField>
                        <FormField label="Nama User">
                            <Input name="username" type="text" placeholder="e.g: johndoe123, billrobert123, dll." />
                        </FormField>
                        <FormField label="Password">
                            <InputGroup>
                                <Input name="password" type="password" placeholder="Masukkan kata sandi user" />
                                <Input name="confirm-password" type="password" placeholder="Isi ulang kata sandi" />
                            </InputGroup>
                        </FormField>
                        <FormField label="Alamat">
                            <Textarea name="address" placeholder="Masukkan alamat user" />
                        </FormField>
                        <Button>Simpan</Button>
                    </Form>
                </Panel>
            </Section>
        </div>
    );
};

AdminAddUserView.propTypes = {
    
};

export default AdminAddUserView;