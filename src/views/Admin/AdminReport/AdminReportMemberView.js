import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, InputAddon, Switch, Select } from '../../../components/Input';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Button } from '../../../components/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { PageBlock } from '../../../components/Page';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
            search
        } = props;

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
                <PageBlock>
                    
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
                </PageBlock><br />

                <div className="admin-report__content">
                    <TableSet
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
                    />
                </div>
                </PanelBody>
            </Panel>

            { renderMemberDetailHistoryModal() }
        </div>
    )
}

export default AdminReportMemberView;