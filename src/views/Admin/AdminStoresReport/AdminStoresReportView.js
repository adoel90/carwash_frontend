import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';

import { Card, CardBody, CardTitle, CardText, CardSubtitle, CardDeck } from 'reactstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Column, Row} from '../../../layouts/Grid';
import { Form, FormField, FormGroup } from '../../../layouts/Form';
import { Button } from '../../../components/Button';
import { Input, InputGroup, InputAddon, Switch, Select } from '../../../components/Input';
import { TableSet } from '../../../components/Table';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import NumberFormat from 'react-number-format';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const AdminStoresReportView = props => {

    const {
        vendorReportList,
        table,
        handleInputChange, 
        handlePeriodChange,
        handleShow,
        period,
        vendorState,
        dailyOrdered,
        handlePrint,
        selectedRow,
        isModalOpen,
        toggleModal,
        vendorReportState,
        namePriceTotalList,
        tabel,
        staffOwnerList,
        // newStaffSelected,
        handleChangeStaffOwnerOptions,
        user
    } = props;


    const priceFormatter = function (data) {
        return "Rp. " + parseFloat(data).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2});
    };

    const renderStaffOwnerOptions = (value, i) => {
        
        if(user.level.name === "Owner" || user.level.id === 4){
            // console.log(value.name)
            return <option value={value.id}>{value.name}</option>
        }
    } 
    
    const renderDetailReportStoreStaffModal = () => {
        if(selectedRow){

            if(vendorState.reportDetailStoreStaff.isLoaded){

                return (
                    <Modal isOpen={isModalOpen.detailReportStaff} toggle={() => toggleModal('detailReportStaff')}>
                        <ModalHeader>
                            <h5>Detail Transaksi</h5>
                        </ModalHeader>
                        <ModalBody> 
                                <Row>
                                    <Column>
                                        {/* <i className="far fa-user"></i><label><b> NamaLengkap : {selectedRow.customer}</b></label><br /> */}
                                        <i className="far fa-id-card"></i><label><b> No. Invoice :  {selectedRow.queue}</b></label><br />
                                        <i className="far fa-money-bill-alt"></i><label><b> Total transaksi : Rp {selectedRow.total}</b></label><br />
                                        {/* <h6>Tipe Kartu : {member.memberHistoris.isLoaded ? member.memberHistoris.data.result.card.type.name : selectedMemberDetail.cardType}</h6> */}
                                
                                    <TableSet
                                        loading={vendorState.reportStaff.isFetching}
                                        loaded={vendorState.reportDetailStoreStaff.isLoaded}
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
        <div>
            <Panel>
                <PanelHeader>
                    <h4 className="heading-title">Laporan Penjualan</h4>
                </PanelHeader>

                <PanelBody>
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
                                                selected={period.to}
                                                onChange={(date) => handlePeriodChange('to', date)}
                                                
                                            />
                                        </InputGroup>
                                    </FormField>
                                </div>

                                {/* ----------- Dropdown list Owner -----------*/}
                                { user.level.name === "Owner" ? 
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
                                    </div> : null
                                }
                                <div>
                                    <FormField>
                                        <Button className="margin-left-small" theme="primary" onClick={handleShow} >
                                            Cari
                                        </Button>
                                    </FormField>
                                </div>

                                {/* ----------- Button Print Staff  -----------*/}
                                {/* { user.level.name === "Staff" ?  
                                     <div>
                                        <Button onClick={(e) => handlePrint(e, period)} theme="danger" className="margin-right-small" type="submit" style={{height: '50px', 'margin-left': '3px'}}>
                                            Print
                                        </Button>
                                    </div> : null
                                }    */}
                               <div>
                                    <Button onClick={(e) => handlePrint(e, period)} theme="danger" className="margin-right-small" type="submit" style={{height: '50px', 'margin-left': '3px'}}>
                                        Print
                                    </Button>
                                </div> 
                            </Column>
                            
                        </Row>
                    </Form>
                    <br />
                
                    <div className="admin-report__content">
                        <TableSet
                            loading={vendorState.reportStaff.isFetching}
                            loaded={vendorState.reportStaff.isLoaded}
                            columns={table.columns}
                            rows={table.rows}
                            striped 
                            fullWidth
                            pagination
                        />
                    </div>     
                </PanelBody>
            </Panel>

            {/* RENDER DETAIL  REPORT STORE STAFF MODAL */}
            {renderDetailReportStoreStaffModal()}
        </div>
    )
};


export default AdminStoresReportView;