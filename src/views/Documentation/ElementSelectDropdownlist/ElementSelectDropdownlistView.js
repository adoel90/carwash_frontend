import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { Container, Row, Column } from '../../../layouts/Grid';
import { TableSet } from '../../../components/Table';
import { Form, FormField } from '../../../layouts/Form';
import { Input, InputGroup, InputAddon, Select, InputCurrency } from '../../../components/Input';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { Button } from '../../../components/Button';


const ElementSelectDropdownlistView = props => {

    const { handleClickChange, store } = props;    

    return (
        <div className="admin-dashboard">
            <Section>
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Select - Dropdownlist </h4>
                    </PanelHeader>
                    <PanelBody>
                        <Row>
                            <Column className="flex">
                                <div className="margin-right-small">
                                    <Form>
                                        <FormField> 
                                            <Select 
                                                name="store" 
                                                onChange={(e) => handleClickChange(e) }
                                                style={{zIndex: 1}}
                                            >
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
                            </Column>
                        </Row>
                        
                    </PanelBody>
                </Panel>
            </Section>
        </div>
    )
};

export default ElementSelectDropdownlistView;