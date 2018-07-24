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

const AdminStoreCashierReportSuperAdmView = props => { 

    const { 
            handleFormSubmit, 
            handleClickChange, 
            kasirList, 
            user,
            showHideIntefaceReport,
            showDate,
            period,
            handlePeriodChange,
            handlePrint,
            handleConvertExcell
        } = props;

    const renderButtonsAndDatePicker = () => {

        return (
            <div>
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
            </div>
        );
    };

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
                                                        name="store" 
                                                        onClick={(e) => handleClickChange(e) }
                                                        style={{zIndex: 1}}
                                                    >
                                                        <option>Pilih Store</option>
                                                        {
                                                             props.kasirList.length ? props.kasirList.map((data) => {
                                                                return <option value={data.id}>{data.name}</option>
                                                            })
                                                            : null
                                                        }
                                                    </Select>
                                                </FormField>
                                        </div>

                                        { showHideIntefaceReport === true ? renderButtonsAndDatePicker() : null}
                                    </Column>
                                </Row>
                            </Form>
                        </PanelBody>
                    </Panel>
                </Section>
                
            </div>
        );
    };

    return null;

  

   

};

export default AdminStoreCashierReportSuperAdmView;