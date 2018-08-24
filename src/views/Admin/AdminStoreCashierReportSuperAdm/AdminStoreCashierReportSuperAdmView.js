import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Section } from '../../../layouts/Section';
import { Container, Row, Column } from '../../../layouts/Grid';
import { TableSet } from '../../../components/Table';
import { Form, FormField } from '../../../layouts/Form';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { Input, InputGroup, InputAddon, Select, InputCurrency } from '../../../components/Input';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { Button } from '../../../components/Button';

import NumberFormat from 'react-number-format';
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table';

const AdminStoreCashierReportSuperAdmView = props => { 

    const { 
            handleFormSubmit, 
            handleClickChange, 
            kasirList, 
            user,
            showHideIntefaceReport,
            showDate,
            period,
            table,
            optionsPagination,
            priceFormatter,
            handlePeriodChange,
            handlePrint,
            handleConvertExcell,
            kasirId
        } = props;

    const renderButtonsAndDatePicker = () => {

        return (
            <Row>
                <Column className="flex">
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
        );
    };

    //#
    const renderTableReport = () => {

        //#
        const priceFormatter = (data) => {
            return <NumberFormat value={data} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} prefix={'Rp. '} decimalScale={2} />;
        };

        return (
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
                <TableHeaderColumn 
                    dataField="kasirName" 
                    headerAlign="center" 
                    dataAlign="center"
                    width="25%"
                >
                    Nama Kasir
                </TableHeaderColumn>
                <TableHeaderColumn 
                    dataField="description" 
                    headerAlign="center" 
                    dataAlign="center"
                    width="25%"
                >
                    Deskripsi
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
        )
    };

    //#
    if(user.list.isLoaded){

        return (
            <div className="admin-dashboard">
                <Section>
                    <Panel>
                        <PanelHeader>
                            <h4 className="heading-title">Laporan Harian Kasir</h4>
                        </PanelHeader>
                        <PanelBody>
                            <Form onSubmit={showDate}>
                                <Row>
                                    <Column className="flex">
                                        <div className="margin-right-small">
                                                <FormField> 
                                                    <Select 
                                                        required
                                                        name="store" 
                                                        onChange={(e) => handleClickChange(e) }
                                                        style={{zIndex: 1}}
                                                    >
                                                        <option>Pilih Kasir</option>
                                                        {
                                                             props.kasirList.length ? props.kasirList.map((data) => {
                                                                return <option value={data.id}>{data.name}</option>
                                                            })
                                                            : null
                                                        }
                                                    </Select>
                                                </FormField>
                                        </div>
                                        
                                        
                                    </Column>
                                </Row>
                                {/* { showHideIntefaceReport === false ? renderButtonsAndDatePicker() : null}   */}
                                {showHideIntefaceReport === true ? renderButtonsAndDatePicker() : null}
                                {/* {renderButtonsAndDatePicker()} */}
                            </Form>

                            

                            <div className="admin-report__content">
                               {showHideIntefaceReport === true ? renderTableReport() : null}
                            </div>
                        </PanelBody>
                    </Panel>
                </Section>
                
            </div>
        );
    };

    return null;

  

   

};

export default AdminStoreCashierReportSuperAdmView;