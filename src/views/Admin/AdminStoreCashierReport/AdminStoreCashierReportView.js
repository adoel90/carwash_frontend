import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Section } from '../../../layouts/Section';
import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, InputAddon, Switch, Select } from '../../../components/Input';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Button } from '../../../components/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

import NumberFormat from 'react-number-format';
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table';

const AdminStoreCashierReportView = props => {

    const { 
        showDate, 
        table, 
        period, 
        report, 
        handlePeriodChange, 
        store, 
        handlePrint, 
        user, 
        handleConvertExcell,
        optionsPagination
    } = props;


    const priceFormatter = (data) => {
        return <NumberFormat value={data} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} prefix={'Rp. '} decimalScale={2} />;
    }

    return (
        <div className="admin-report">
            <Panel>
                <PanelHeader>
                    <h4 className="heading-title">{user.level.name === "Superadmin" ? "Laporan Harian Kasir" : "Laporan Harian Kasir"}</h4>
                </PanelHeader>
                <PanelBody>
                    <Form onSubmit={showDate}>
                        <Row>
                            <Column className="flex">
                                <div className="margin-right-small">
                                    <FormField>
                                        {/* <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-calendar-alt"></i>
                                            </InputAddon>
                                            <DatePicker
                                                className="input"
                                                dateFormat="DD MMM YYYY"
                                                textPlaceholder="Start Date"
                                                selected={period.from}
                                                onChange={(date) => handlePeriodChange('from', date)}
                                            />
                                        </InputGroup> */}
                                    </FormField>
                                </div>
                                <div className="margin-right-small">
                                    <FormField>
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-calendar-alt"></i>
                                            </InputAddon>
                                            <DatePicker
                                                className="input"
                                                dateFormat="DD MMM YYYY"
                                                textPlaceholder="End Date"
                                                // minDate={period.from}
                                                selected={period.to}
                                                onChange={(date) => handlePeriodChange('to', date)}
                                            />
                                        </InputGroup>
                                    </FormField>
                                </div>
                                <div>
                                    <FormField>
                                        <Button type="submit" style={{ height: '50px' }}>
                                            Cari
                                        </Button>
                                    </FormField>
                                </div>
                                <div>
                                    <FormField>
                                        <Button onClick={() => handlePrint(period)} theme="danger" className="margin-right-small" type="submit" style={{ height: '50px', 'margin-left': '3px' }}>
                                            Print
                                        </Button>
                                    </FormField>
                                </div>
                                <div>
                                    <FormField>
                                        <Button onClick={(e) => handleConvertExcell(e)} theme="success" className="margin-right-small" type="submit" style={{ height: '50px', 'margin-left': '3px' }}>
                                            Export to xls
                                        </Button>
                                    </FormField>
                                </div>
                            </Column>
                        </Row>
                    </Form>

                    <div className="admin-report__content">
                        {/* <TableSet
                            // loading={store.reportCashierMember.isFetching}
                            loaded={store.reportCashierMember.isLoaded}
                            columns={table.columns}
                            rows={table.rows}
                            striped
                            fullWidth
                            pagination
                        /> */}

                        <BootstrapTable data={table.rows} options={optionsPagination} striped={true} hover={true} version='4' bordered={false} dataAlign="center" searchPlaceholder={"Ketik nama customer yang terdaftar..."} pagination>
                            <TableHeaderColumn 
                                dataField="id" 
                                // headerAlign="left" 
                                // dataAlign="center" 
                                isKey={true}
                                // width="10%"
                                hidden
                            >
                                id
                            </TableHeaderColumn>
                            <TableHeaderColumn 
                                dataField="transaction_date" 
                                headerAlign="center" 
                                dataAlign="center"
                                width="25%"
                            >
                                Tanggal Transaksi
                            </TableHeaderColumn>
                            {/* <TableHeaderColumn 
                                dataField="kasirName" 
                                headerAlign="center" 
                                dataAlign="center"
                                width="25%"
                            >
                                Nama Toko
                            </TableHeaderColumn> */}
                            <TableHeaderColumn 
                                dataField="kasirName" 
                                headerAlign="center" 
                                dataAlign="center"
                                width="25%"
                            >
                                Nama Kasir
                            </TableHeaderColumn>
                            <TableHeaderColumn 
                                dataField="total" 
                                headerAlign="center" 
                                dataAlign="right"
                                width="25%"
                                dataFormat={priceFormatter}
                            >
                                Total Transaksi
                            </TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </PanelBody>
            </Panel>
        </div>
    )
}

export default AdminStoreCashierReportView;