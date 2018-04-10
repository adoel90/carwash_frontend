import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Container, Row, Column } from '../../../layouts/Grid';
import { Form, FormField } from '../../../layouts/Form';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { Input, InputGroup, InputAddon, Select } from '../../../components/Input';
import { Button } from '../../../components/Button';

const AdminStoresMenuCreateView = props => {

    const { handleFormSubmit, handleInputChange, newMenuProduct, handleImageChange, store } = props;

    return (
        <div className="admin-dashboard">
            <Section>
                <Row>
                    <Column md={7}>
                        <Panel>
                            <PanelHeader>
                                <h4 className="heading-title">Buat Menu Produk Baru</h4>
                            </PanelHeader>
                            <PanelBody>
                                <Form onSubmit={handleFormSubmit}>

                                    <FormField label="Pilih Store">
                                         <Select name="store" defaultValue={newMenuProduct.id} onChange={(e) => handleInputChange('newMenuProduct', e) }>
                                            <option>Pilih Store</option>
                                            {
                                                store.list.isLoaded   ? store.list.data.data.result.store.map((item, i) => {
                                                    return <option value={item.id}>{item.name}</option>
                                                })
                                                : null
                                            }
                                        </Select>
                                    </FormField>

                                    <FormField label="Nama Produk">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-clipboard-list"></i>
                                            </InputAddon>
                                            <Input name="name" type="text" placeholder="Masukkan nama lengkap produk" onChange={(e) => handleInputChange('newMenuProduct', e) } />
                                        </InputGroup>
                                    </FormField>

                                      <FormField label="Deskripsi Produk">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-clipboard-list"></i>
                                            </InputAddon>
                                            <Input name="deskripsi" type="text" placeholder="Deskripsikan dengan jelas produk yang hendak di tampilkan" onChange={(e) => handleInputChange('newMenuProduct', e) } />
                                        </InputGroup>
                                    </FormField>

                                    <FormField label="Harga">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="">Rp</i>
                                            </InputAddon>
                                            <Input name="harga" type="text" placeholder="Masukan Harga Produk" onChange={(e) => handleInputChange('newMenuProduct', e) } />
                                        </InputGroup>
                                    </FormField>

                                    <FormField label= "Upload Gambar Produk" >
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-images"></i>
                                            </InputAddon> 
                                            <Input className="input" name="image" type="file"  placeholder="Upload Gambar Produk" onChange={(e) => handleImageChange(newMenuProduct, e) } />
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

export default AdminStoresMenuCreateView;