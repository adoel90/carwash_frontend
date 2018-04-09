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


    const { handleFormSubmit, handleInputChange, newStaff, store, access } = props;

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
                        
                                    <FormField label="Nama Lengkap Staff Baru">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-user"></i>
                                            </InputAddon>
                                            <Input name="name" type="text" placeholder="Masukkan nama lengkap staff baru" onChange={(e) => handleInputChange('newStaff', e) } />
                                        </InputGroup>
                                    </FormField>
                                    
                                    <FormField label="Username untuk Login">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-user"></i>
                                            </InputAddon>
                                            <Input name="username" type="text" placeholder="Masukkan nama username untuk login" onChange={(e) => handleInputChange('newStaff', e) } />
                                        </InputGroup>
                                    </FormField>

                                    <FormField label="Password">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-lock"></i>
                                            </InputAddon>
                                            <Input name="password" type="text" placeholder="Masukkan password" onChange={(e) => handleInputChange('newStaff', e) } />
                                        </InputGroup>
                                    </FormField>

                                    <FormField label="Berikan Access Level untuk Staff Baru">
                                        {/* <Select name="level" defaultValue={newStaff.level.id} onChange={(e) => handleInputChange('newStaff', e) }>
                                            {
                                               store.list.isLoaded ? newStaff.level.map((item, i) => {
                                                    return <option value={item.id}>{item.name}</option>
                                                }) : null
                                               
                                            }
                                        </Select> */}
                                        <Select name="level" defaultValue={newStaff.level} onChange={(e) => handleInputChange('newStaff', e) }>
                                            <option value="">Pilih Level</option>
                                            {
                                               access.list.isLoaded ? access.list.data.result.map((item, i) => {
                                                    return <option value={item.id}>{item.name}</option>
                                                }) : null
                                            }
                                        </Select>
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
                            </PanelBody>
                        </Panel> 
                    </Column>
                </Row>
            </Section>
        </div>
    )
};

export default AdminStoresEmployeeCreateView;