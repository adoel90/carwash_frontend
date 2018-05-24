import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Container, Row, Column } from '../../../layouts/Grid';
import { Form, FormField } from '../../../layouts/Form';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { Input, InputGroup, InputAddon, Select, InputCurrency } from '../../../components/Input';
import { Button } from '../../../components/Button';

const AdminStoresEmployeeSuperAdmView = props => {

    const { store, handleFormSubmit, handleClickChange } = props;

    return (
        <div className="admin-dashboard">
            <Section>
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Daftar Staff </h4>
                    </PanelHeader>
                    <PanelBody>
                        <Row>
                            <Column className="flex">
                                <div className="margin-right-small">
                                    <Form onSubmit={handleFormSubmit}>
                                        <FormField> 
                                            {/* <p>defaultValue={newMenuProduct.id}</p> */}
                                            <Select name="store" onClick={(e) => handleClickChange(e) }>
                                                <option>Pilih Store</option>
                                                {
                                                    store.list.isLoaded  ? store.list.data.data.result.store.map((store, i) => {
                                                        return <option value={store.id}>{store.name}</option>
                                                    })
                                                    : null
                                                }
                                            </Select>
                                        </FormField>
                                    </Form>
                                </div>
                                <div>
                                    <FormField>
                                        <Button className="margin-right-small" type="submit">
                                            Temukan
                                        </Button>
                                    </FormField>
                                </div>
                            </Column>
                        </Row>
                    </PanelBody>
                </Panel>
            </Section>
        </div>
    )
};

export default AdminStoresEmployeeSuperAdmView;