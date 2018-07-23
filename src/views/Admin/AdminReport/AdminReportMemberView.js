import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, InputAddon, Switch, Select } from '../../../components/Input';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet, TableSetKhusus } from '../../../components/Table';
import { Button } from '../../../components/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { PageBlock } from '../../../components/Page';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import NumberFormat from 'react-number-format';
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table';

const AdminReportMemberView = props => {

    const { member, 
            showDate, 
            period, 
            handlePeriodChange, 
            table, 
            tabel,
            report, 
            handlePrint, 
            toggleModal, 
            listMemberTransactionHistoris,
            handleExportToExcell, 
            openMemberModalDetailNew, 
            detailMemberHistory, 
            isModalOpen, 
            selectedMemberDetail,
            handleInputChange,
            search,
            optionsPagination
        } = props;

    const componentButtonHistory = (datarow) => {
        return (
            <div>
                <Button className="margin-right-small" type="button" onClick={() => openMemberModalDetailNew(datarow )}>Histori</Button>
            </div>
        );
    };

    const priceFormatter = (data) => {
        return <NumberFormat value={data} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} prefix={'Rp. '} decimalScale={2} />;
    }

    //Modal detail Historis
    const renderMemberDetailHistoryModal = () => {

        let customerName = selectedMemberDetail.name;

        if(selectedMemberDetail){

            if(member.memberHistoris.isLoaded){

                return (
                    <Modal isOpen={isModalOpen.detailMemberHistory} toggle={ () => toggleModal('detailMemberHistory')}>
                        <ModalHeader>
                            <h5>Detail Histori Customer : { customerName} </h5>
                        </ModalHeader>
                        <ModalBody> 
                                <Row>
                                    <Column>
                                        <i className="far fa-user"></i><label className="marginTopBottom"><b> NamaLengkap : {selectedMemberDetail.name}</b></label><br />
                                        <i className="far fa-id-card"></i><label className="marginTopBottom"><b> Id Kartu :  {selectedMemberDetail.id}</b></label><br />
                                        <i className="far fa-money-bill-alt"></i><label className="marginTopBottom"><b> Saldo saat ini : {listMemberTransactionHistoris.balance}</b></label><br />
                                        {/* <h6>Tipe Kartu : {member.memberHistoris.isLoaded ? member.memberHistoris.data.result.card.type.name : selectedMemberDetail.cardType}</h6> */}
                                        <TableSet
                                              loading={member.memberHistoris.isFetching}
                                              loaded={member.memberHistoris.isLoaded}
                                              columns={tabel.kolom}
                                              rows={tabel.baris}
                                              striped 
                                              fullWidth
                                              pagination
                                        />
                                    </Column>
                                </Row>
                        </ModalBody>
                    </Modal>
                )
            }

        }
    }

    return (
        <div className="admin-report">
            <Panel>
                <PanelHeader>
                    <h4 className="heading-title">Laporan Member </h4>
                </PanelHeader>
                <PanelBody> 
                    
                    <Form onSubmit={showDate}>
                        <Row>
                            <Column className="flex">
                                <div className="margin-right-small">
                                    <FormField>
                                        <InputGroup>
                                            <InputAddon >
                                                <i className="fas fa-calendar-alt"></i>
                                            </InputAddon>
                                            <DatePicker
                                                className="input"
                                                dateFormat="DD MMM YYYY"
                                                textPlaceholder="Start Date"
                                                selected={period.from}
                                                onChange={(date) => handlePeriodChange('from', date)}
                                            />
                                        </InputGroup>
                                    </FormField>
                                </div>
                                <div className="margin-right-small">
                                    <FormField >
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-calendar-alt"></i>
                                            </InputAddon>
                                            <DatePicker
                                                className="input"
                                                dateFormat="DD MMM YYYY"
                                                textPlaceholder="End Date"
                                                minDate={period.from}
                                                selected={period.to}
                                                onChange={(date) => handlePeriodChange('to', date)}
                                            />
                                        </InputGroup>
                                    </FormField>
                                </div>
                                <div>
                                    <FormField>
                                        <Button className="margin-right-small" type="submit">
                                            Cari
                                        </Button>
                                    </FormField>
                                </div>
                                <div>
                                    <FormField>
                                        <Button onClick={() => handlePrint(period)} theme="danger" className="margin-right-small" type="submit" >
                                            Print
                                        </Button>
                                    </FormField>
                                    
                                </div>
                                <div>
                                    <FormField>
                                        <Button onClick={(e) => handleExportToExcell(e, period)} className="margin-right-small" theme="success" type="submit" >
                                            Export to xls
                                        </Button>
                                    </FormField>
                                </div>
                            </Column>
                        </Row>
                    </Form>

                    <div className="admin-report__content">
                        {/* <br /><br /><br />   */}
                        {/* <TableSetKhusus
                            loading={report.reportMember.isFetching}
                            loaded={report.reportMember.isLoaded}
                            columns={table.columns}
                            rows={table.rows}
                            striped 
                            fullWidth
                            pagination
                            placeholder="Cari member yang terdaftar"
                            hasSearchBar
                            searchParams={table.searchParams}
                            searchBy={search.searchBy}
                            handleInputChange={handleInputChange}
                            {...props}
                        /> */}

                        <BootstrapTable data={table.rows} options={optionsPagination} striped={true} hover={true} version='4' bordered={false} dataAlign="center" searchPlaceholder={"Ketik nama customer yang terdaftar..."} pagination>
                            <TableHeaderColumn 
                                dataField="id" 
                                headerAlign="center" 
                                dataAlign="left" 
                                isKey={true}
                                width="7%"
                            >
                                 ID Kartu
                            </TableHeaderColumn>
                            <TableHeaderColumn 
                                dataField="kartu" 
                                headerAlign="center" 
                                dataAlign="left"
                                width="20%"
                            >
                                Kartu
                            </TableHeaderColumn>
                            <TableHeaderColumn 
                                dataField="name" 
                                headerAlign="center" 
                                dataAlign="left"
                                width="20%"
                            >
                                Nama
                            </TableHeaderColumn>
                            <TableHeaderColumn 
                                dataField="created" 
                                headerAlign="center" 
                                dataAlign="center"
                                width="20%"
                            >
                                Tgl Daftar
                            </TableHeaderColumn>
                            <TableHeaderColumn 
                                dataField="balance" 
                                headerAlign="center" 
                                dataAlign="right"
                                width="15%"
                                dataFormat={priceFormatter}
                            >
                                Saldo
                            </TableHeaderColumn>
                            <TableHeaderColumn 
                                dataField="data" 
                                headerAlign="center"
                                dataAlign="center"
                                dataFormat={componentButtonHistory}
                                width="35%"
                            >
                                Histori
                            </TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </PanelBody>
            </Panel>

            { renderMemberDetailHistoryModal() }
        </div>
    )
}

export default AdminReportMemberView;