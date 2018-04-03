import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Container, Row, Column } from '../../../layouts/Grid';
import { Form, FormField } from '../../../layouts/Form';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { Input, InputGroup, InputAddon, Select, InputCashier} from '../../../components/Input';
import { Button } from '../../../components/Button';

const AdminStoresPromoCreateView = props => {

    const { handleFormSubmit, handleInputChange, newPromoDiscount, store, storeList,  } = props;

    return (
        <div className="admin-dashboard">
            <Section>
                <Row>
                    <Column md={7}>
                        <Panel>
                            <PanelHeader>
                                <h4 className="heading-title">Buat Discount Terbaru</h4>
                            </PanelHeader>
                            <PanelBody>
                                <Form onSubmit={handleFormSubmit}>

                                    <FormField label="Pilih Store yang hendak di berikan discount khusus">
                                         <Select name="store" defaultValue={newPromoDiscount.id} onChange={(e) => handleInputChange('newPromoDiscount', e) }>
                                            {
                                                store.list.isLoaded   ? store.list.data.data.result.store.map((item, i) => {
                                                    return <option value={item.id}>{item.name}</option>
                                                })
                                                : null
                                            }
                                        </Select>
                                    </FormField>
                                    
                                    <FormField label="Buat Discount khusus">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-percent"></i>
                                            </InputAddon>
                                            <Input name="price" type="text" placeholder="Masukkan nilai discount khusus (dalam persen)" onChange={(e) => handleInputChange('newPromoDiscount', e) } />
                                        </InputGroup>
                                    </FormField>

                                      <FormField label="Buat Tanggal Periode Berakhir-nya Discount">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-calendar"></i>
                                            </InputAddon>
                                            <Input name="date" type="date" placeholder="Masukkan tanggl berakhir-nya periode discount" onChange={(e) => handleInputChange('newPromoDiscount', e) } />
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

export default AdminStoresPromoCreateView;