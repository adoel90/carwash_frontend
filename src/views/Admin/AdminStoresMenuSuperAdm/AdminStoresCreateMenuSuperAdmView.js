import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Container, Row, Column } from '../../../layouts/Grid';
import { Form, FormField } from '../../../layouts/Form';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { Input, InputGroup, InputAddon, Select, InputCurrency } from '../../../components/Input';
import { Button } from '../../../components/Button';


//Type Id 1 === Service
//Type Id 2 === F&B



const AdminStoresMenuCreateView = props => {
    
    const renderSomething = () => {
    
        const { newMenuProduct } = props;
        console.log(newMenuProduct);
        return (
            <h1>Hai</h1>
        )
    }
    
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
                                        {/* defaultValue={newMenuProduct.id} */}
                                         <Select name="store"  onChange={(e) => handleInputChange('newMenuProduct', e) }>
                                            <option>Pilih Store</option>
                                            {
                                                store.list.isLoaded   ? store.list.data.data.result.store.map((item, i) => {
                                                    // {console.log(item)}
                                                    return (
                                                        <option value={item.id}>{item.name}</option> 
                                                    )
                                                   
                                                })
                                                : null
                                            }
                                        </Select>
                                    </FormField>
                                    {renderSomething()}

                                    <FormField label="Nama Produk">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-clipboard-list"></i>
                                            </InputAddon>
                                            <Input name="name" type="text" placeholder="Masukkan nama produk" onChange={(e) => handleInputChange('newMenuProduct', e) } />
                                        </InputGroup>
                                    </FormField>

                                      <FormField label="Deskripsi Produk">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-clipboard-list"></i>
                                            </InputAddon>
                                            <Input name="deskripsi" type="text" placeholder="Masukkan deskripsi produk" onChange={(e) => handleInputChange('newMenuProduct', e) } />
                                        </InputGroup>
                                    </FormField>

                                    <FormField label="Harga">
                                        <InputGroup>
                                            <InputAddon>
                                                <small class="fw-semibold tt-uppercase ls-base">Rp</small>
                                            </InputAddon>
                                            <InputCurrency 
                                                className="input"
                                                name="harga" 
                                                type="text" 
                                                placeholder="Masukan Harga Produk" 
                                                onChange={(e) => handleInputChange('newMenuProduct', e) } 
                                            />
                                        </InputGroup>
                                    </FormField>
                                   
                                    <FormField label= "Gambar Produk" >
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-images"></i>
                                            </InputAddon> 
                                            <Input className="input" name="image" type="file"  placeholder="Gambar Produk" onChange={(e) => handleImageChange(newMenuProduct, e) } />
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