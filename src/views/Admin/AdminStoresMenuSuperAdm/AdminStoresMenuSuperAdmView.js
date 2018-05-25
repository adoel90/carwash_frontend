import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Container, Row, Column } from '../../../layouts/Grid';
import { TableSet } from '../../../components/Table';
import { Form, FormField } from '../../../layouts/Form';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { Input, InputGroup, InputAddon, Select, InputCurrency } from '../../../components/Input';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { Button } from '../../../components/Button';


const AdminStoresMenuSuperAdmView = props => {

    const { store,
            vendorState,
            table,
            handleClickChange,
            handleFormSubmit } = props;

    return (
        <div className="admin-dashboard">
            <Section>
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Daftar Produk </h4>
                    </PanelHeader>
                    <PanelBody>
                        <Row>
                            <Column className="flex">
                                <div className="margin-right-small">
                                    <Form onSubmit={handleFormSubmit}>
                                        <FormField> 
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
                              
                            </Column>
                        </Row>


                         <div className="admin-user__content">
                            {console.log(vendorState)}
                            {/* <TableSet
                                loading={vendorState.storemenu.isFetching}
                                loaded={vendorState.storemenu.isLoaded}
                                columns={table.columns}
                                rows={table.rows}
                                striped 
                                fullWidth
                                pagination
                                // placeholder="Cari user yang terdaftar"
                                // hasSearchBar
                                // searchParams={table.searchParams}
                                // searchBy={search.searchBy}
                                // handleInputChange={handleInputChange}
                                {...props}
                            /> */}
                        </div>
                    </PanelBody>

                </Panel>
            </Section>
        </div>
    )

}

export default AdminStoresMenuSuperAdmView;