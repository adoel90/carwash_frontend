import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';

import { Card, CardBody, CardTitle, CardText, CardSubtitle, CardDeck } from 'reactstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Column, Row} from '../../../layouts/Grid';
import { Form, FormField, FormGroup } from '../../../layouts/Form';
import { Button } from '../../../components/Button';
import { ButtonDewek } from '../../../components/ButtonDewek';
import { Input, InputGroup, InputAddon, Switch, Select } from '../../../components/Input';
import { TableSet } from '../../../components/Table';
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
        handlePrint
    } = props;

    const priceFormatter = function (data) {
        return "Rp. " + parseFloat(data).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2});
    };

    return (
        <div>
            <Panel>
                <PanelHeader>
                    <h4 className="heading-title">Laporan Transaksi</h4>
                </PanelHeader>

                <PanelBody>
                    <Form inline>

                        <Row>
                            <Column className="flex">
                                <div className="margin-right-small">
                                    {/* <FormField>
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
                                    </FormField> */}
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
                                        <Button className="margin-left-small" theme="primary" onClick={handleShow} >
                                            Cari
                                        </Button>
                                    </FormField>
                                </div>
                                <div>
                                    {/* <FormField> */}
                                        <Button onClick={(e) => handlePrint(e, period)} theme="danger" className="margin-right-small" type="submit" style={{height: '50px', 'margin-left': '3px'}}>
                                            Print
                                        </Button>
                                    {/* </FormField> */}
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
                            columns={table.columns}
                            rows={table.rows}
                            striped 
                            fullWidth
                            pagination
                        />
                    </div>     
                </PanelBody>
            </Panel>
        </div>
    )
};


export default AdminStoresReportView;