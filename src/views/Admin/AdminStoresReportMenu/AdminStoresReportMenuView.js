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

const AdminStoresReportMenuView = props => {

    const { table, handlePeriodChange, period, handleShow, vendorState, handlePrint, handleConvertExcell } = props;

    return (
        <div className="admin-report">
            <Panel>
                <PanelHeader>
                    <h4 className="heading-title">Laporan Menu </h4>
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
                                                selected={period.to}
                                                onChange={(date) => handlePeriodChange('to', date)}
                                            />
                                        </InputGroup>
                                    </FormField>
                                </div>
                                <div>
                                    <FormField>
                                        <Button className="margin-left-small" theme="primary" onClick={handleShow} >
                                            Cari
                                        </Button>
                                    </FormField>
                                </div>
                           
                                <div>
                                    <Button onClick={(e) => handlePrint(e, period)} theme="danger" className="margin-right-small" type="submit" style={{height: '50px', 'margin-left': '3px'}}>
                                        Print
                                    </Button>
                                </div>
                                <div>
                                    <Button onClick={(e) => handleConvertExcell(e)} theme="success" className="margin-right-small" type="submit" style={{ height: '50px', 'margin-left': '3px' }}>
                                        Export to xls
                                    </Button>
                                </div>
                            </Column>
                            
                        </Row>
                    </Form>
                    <br />
                
                    <div className="admin-report__content">
                        <TableSet
                            loading={vendorState.reportDetailStoreMenuOwner.isFetching}
                            loaded={vendorState.reportDetailStoreMenuOwner.isLoaded}
                            columns={table.columns}
                            rows={table.rows}
                            striped 
                            fullWidth
                            pagination
                        />
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                </PanelBody>
            </Panel>
        </div>
    )

}

export default AdminStoresReportMenuView;
