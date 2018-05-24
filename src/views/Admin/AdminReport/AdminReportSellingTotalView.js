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

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AdminReportSellingTotalView = props => {
    
    const {
        table,
        report,
        reportList,
        showDate,
        period,
        periodrepot,
        handlePeriodChange,
        handlePeriodChangeAccessDetailStore,
        selectedAccessDetailStore,
        accessDetailStore,
        isModalOpen,
        toggleModal,
        handlePrint,
        vendorState,
        handleChangeStaffOwnerOptions,
        handleShow,
        tabel,
        dailyOrdered,
        invoice,
        totalTransaction
    } = props;


    //#
    const renderStaffOwnerOptions = (value, i) => {
        return <option value={value.id}>{value.name}</option>
    }; 

    //#
    const renderAccessDetailStoreModal = () => {
        
        if(selectedAccessDetailStore){
            
            return (
                <Modal isOpen={isModalOpen.accessDetailStore} toggle={ () => toggleModal('accessDetailStore')}>
                    <ModalHeader>
                        <h5>Laporan Penjualan: {selectedAccessDetailStore.store}</h5>
                    </ModalHeader>
                    <ModalBody> 
                        <Form inline>
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
                                                    selected={periodrepot.to}
                                                    onChange={(date) => handlePeriodChangeAccessDetailStore('to', date)}
                                                />
                                            </InputGroup>
                                        </FormField>
                                    </div>
                                    <div>
                                        <FormField>
                                        <Select 
                                            name="card"
                                            type="select"
                                            // defaultValue={newCardData.card}
                                            onChange={(e) => handleChangeStaffOwnerOptions(e)}>
                                                <option value="">Pilih Staff</option>
                                                <option value="2018">Semua Staff</option>
                                                {vendorState.employee.isLoaded ? vendorState.employee.data.data.result.staff.map((value) => renderStaffOwnerOptions(value)) : null}

                                            </Select>

                                        </FormField>
                                    </div> 
                                    <div>
                                        <FormField>
                                            <Button className="margin-left-small" theme="primary" onClick={handleShow} >
                                                Cari
                                            </Button>
                                        </FormField>
                                    </div>
                                    <Button onClick={(e) => handlePrint(e, periodrepot)} theme="danger" className="margin-right-small" type="submit" style={{height: '50px', 'margin-left': '3px'}}>
                                        Print
                                    </Button>
                                </Column>
                            </Row>
                        </Form>

                         <br />
                
                        <div className="admin-report__content">

                            {/* <i className="far fa-id-card"></i><label><b> No. Invoice :  {invoice }</b></label><br />
                            <i className="far fa-money-bill-alt"></i><label><b> Total transaksi : Rp {totalTransaction} </b></label><br /> */}
                            <TableSet
                                loading={vendorState.reportStaff.isFetching}
                                loaded={vendorState.reportStaff.isLoaded}
                                columns={tabel.kolom}
                                rows={tabel.baris}
                                striped 
                                fullWidth
                                pagination
                            />
                        </div>     
                    </ModalBody>
                </Modal>
            )
        }
    }

    return (
        <div className="admin-report">
            <Panel>
                <PanelHeader>
                    <h4 className="heading-title">Laporan Total Penjualan Toko </h4>
                </PanelHeader>
                <PanelBody>
                    <Form onSubmit={showDate}>
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
                                                textPlaceholder="Start Date"
                                                selected={period.from}
                                                onChange={(date) => handlePeriodChange('from', date)}
                                            />
                                        </InputGroup>
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
                                                minDate={period.from}
                                                selected={period.to}
                                                onChange={(date) => handlePeriodChange('to', date)}
                                            />
                                        </InputGroup>
                                    </FormField>
                                </div>
                                <div>
                                    <FormField>
                                        <Button type="submit" style={{height: '50px'}}>
                                            Cari
                                        </Button>
                                    </FormField>
                                </div>
                                {/* <div>
                                    <FormField>
                                        <Button onClick={(e) => handleExportToExcell(e, period)} theme="danger" className="margin-right-small" type="submit" style={{height: '50px', 'margin-left': '3px'}}>
                                            Export to xls
                                        </Button>
                                    </FormField>
                                </div> */}
                            </Column>
                        </Row>
                    </Form>

                    <div className="admin-report__content">
                        <TableSet
                            loading={report.reportOwner.isFetching}
                            loaded={report.reportOwner.isLoaded}
                            columns={table.columns}
                            rows={table.rows}
                            striped 
                            fullWidth
                            pagination
                        />
                    </div>
                </PanelBody>
            </Panel>

            { renderAccessDetailStoreModal() }
        </div>
    )
};

AdminReportSellingTotalView.propTypes = {
    
};

export default AdminReportSellingTotalView;