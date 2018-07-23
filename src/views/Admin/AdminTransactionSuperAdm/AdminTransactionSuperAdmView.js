import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Container, Row, Column } from '../../../layouts/Grid';
import { TableSet } from '../../../components/Table';
import { Form, FormField } from '../../../layouts/Form';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { Input, InputGroup, Switch, InputAddon, Select, InputCurrency, SwitchSquare } from '../../../components/Input';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { Button } from '../../../components/Button';

import { PageBlock } from '../../../components/Page';
import Currency from '../../../components/Currency';
import { Table } from '../../../components/Table';

import { AdminTransactionDetail, AdminTransactionCheckout,  AdmintTransactionPrintSecondary, AdminTransactionPrint } from '../AdminTransactionSuperAdm';


const AdminTransactionSuperAdmView = props => {

    const { 
            store,
            handleClickChange,
            listMenuStore,
            selectedMenuItem,
            handleSelectMenu,
            handleFormSubmit,
            statusPrintDataConfirm
        } = props;


    const buttonStyle = {
        'margin-left': '320px',
    };

    const fixedStyle = {
        'position': 'fixed',
        'left': '0px',
        'top': '0px',
        'z-index': '-100'
    };

    return (
        <div className="admin-dashboard">
            {/* <Section> */}
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Transakasi Pemesanan</h4>
                    </PanelHeader>
                    <PanelBody>
                        <Row>
                            <Column className="flex">
                                <div className="margin-right-small">
                                    {/* <Form onSubmit={handleFormSubmit}> */}
                                    <Form>
                                        <FormField> 
                                            <Select name="store" onChange={(e) => handleClickChange(e) }>
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
                            <Table fullWidth>
                                <thead className="table__head">

                                    {/* {
                                        listMenuStore.isLoaded ? rer
                                    } */}
                                    <tr>
                                        <th>Nama Produk</th>
                                        <th>Deskripsi Produk</th>
                                        <th>Harga</th>
                                    </tr>
                                </thead>
                                <tbody className="table__body">
                                    { listMenuStore.isLoaded ? listMenuStore.data.data.result.menu.map((item, i) => {
                                        item.selected = item.selected ? true : false;
                                        item.quantity = item.quantity ? item.quantity : 1;
                                        item.totalPrice = item.quantity * item.price;
                                        return (
                                            <tr className={item.selected ? 'bg-secondary' : 'bg-white'} onClick={() => handleSelectMenu(item)} key={item.id}>
                                                <td>{item.status === true ? item.name : item.name + " ( Tidak Tersedia) "}</td>
                                                <td>{item.status === true ? item.description : "Tidak Tersedia"}</td>
                                                <td>
                                                    <Currency
                                                        value={item.status === true ? item.price : "-"}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    }) : null }
                                </tbody>
                            </Table>
                            <div class="confirmFixedButton">
                                <Button type="submit" className="margin-top-base" disabled={!selectedMenuItem.length} onClick={handleFormSubmit} size="large" block>Konfirmasi Pembayaran {selectedMenuItem.length ? `( ${selectedMenuItem.length} Terpilih )` : null}</Button>
                            </div>
                        </div>


                         {/* <div className="admin-user__content">
                            <TableSet
                                loading={storeMenuList.isFetching}
                                loaded={storeMenuList.isLoaded}
                                columns={table.columns}
                                rows={table.rows}
                                striped 
                                fullWidth
                                pagination
                              
                                {...props}
                            />
                        </div> */}
                    </PanelBody>
                </Panel>

                <AdminTransactionDetail {...props} />
                <AdminTransactionCheckout {...props} />

                {/* Print Secondary */}
                {statusPrintDataConfirm === 200 ? <AdmintTransactionPrintSecondary {...this.state} {...props} /> : <AdminTransactionPrint {...props} />}
                            
            {/* </Section> */}
            
        </div>
    )

}

export default AdminTransactionSuperAdmView;