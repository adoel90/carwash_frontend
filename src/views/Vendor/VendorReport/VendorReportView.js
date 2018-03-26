import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';

import {
	
	Card, CardBody, CardTitle, CardText, CardSubtitle, CardDeck, 
	
} from 'reactstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,LineChart, Line } from 'recharts';
import { Column, Row} from '../../../layouts/Grid';
import { Form, FormField, FormGroup } from '../../../layouts/Form';
import { Button } from '../../../components/Button';
import { ButtonDewek } from '../../../components/ButtonDewek';
import { Input, InputGroup, InputAddon, Switch, Select } from '../../../components/Input';

import NumberFormat from 'react-number-format';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const VendorDashboardView = props => {

    const {
        vendorReportList,
        table,
        handleInputChange, 
        handlePeriodChange,
        handleShow,
        period
    } = props;

    return (
        <div>
            <div className="vendor-menu">    
            </div>

            <div className="admin-user">
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Laporan Transaksi</h4>
                        {/* <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6>                         */}
                    </PanelHeader>

                    <PanelBody>
                        <Form inline>

                            <Row>
                                <Column md={4}>
                                   
                                    <FormField>
                                        <InputGroup>
                                            <InputAddon>
                                                <h6 className="font-weight-bold pr-4"><i className="fas fa-calendar-alt"></i> Jangka periode dari</h6>
                                            </InputAddon>
                                        </InputGroup>
                                        <DatePicker
                                                className="form-control"
                                                dateFormat="DD MMM YYYY"
                                                textPlaceholder="Start Date"
                                                selected={period.from}
                                                onChange={(date) => handlePeriodChange('from', date)}
                                            />
                                    </FormField>
                                </Column>

                                <Column md={4}>
                                   
                                    <FormField>
                                        <InputGroup>
                                            <InputAddon>
                                            <h6 className="px-2"><i className="fas fa-calendar-alt"></i> Sampai</h6>
                                            </InputAddon>
                                        </InputGroup>
                                        <DatePicker
                                                className="form-control"
                                                dateFormat="DD MMM YYYY"
                                                textPlaceholder="End Date"
                                                minDate={period.from}
                                                selected={period.to}
                                                onChange={(date) => handlePeriodChange('to', date)}
                                            />
                                    </FormField>
                                </Column>

                                <Column md={2}> 
                                    <FormField>
                                        <ButtonDewek
                                            variant="raised"
                                            className="btn-sky-blue btn-size ml-3"
                                            color="info"
                                            onClick={handleShow}
                                        >
                                            Lihat
                                        </ButtonDewek>
                                    </FormField>
                                </Column>
                                <Column md={2}></Column>
                            </Row>
                        </Form>
                        <br />
			
                        <CardDeck className="mt-4">
                            {/* { dashboard.summary.isLoaded ? this.renderSummaryCards() : null } */}
                            {/* { vendorReportState.summary.isLoaded ? this.renderSummaryCards() : null } */}
                        </CardDeck>

                        <CardDeck>
                            {/* { this.renderGraphCards() } */}
                        </CardDeck>
		
                        
                        <LineChart width={900} height={300} data={table.vendorReportListResults} margin={{ top: 5, right: 20, bottom: 5, left: 0}}>
                            <Line type="monotone" dataKey="transaction" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                            <XAxis dataKey="name" />
                            <YAxis dataKey='transaction'/>
                            <Tooltip />
                        </LineChart>
                                       
                    </PanelBody>
                </Panel>
            </div>
        </div>
    )
};


export default VendorDashboardView;