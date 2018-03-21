import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';

import {
	Container, Row, Col,
	Card, CardBody, CardTitle, CardText, CardSubtitle, CardDeck, CardFooter,
	Form, FormGroup, Input, InputGroup, InputGroupAddon, Button,
	Table
} from 'reactstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,LineChart, Line } from 'recharts';
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
                            <p className="font-weight-bold pr-4">Period Range</p>
                            <FormGroup>
                                <DatePicker
                                    className="form-control"
                                    dateFormat="DD MMM YYYY"
                                    textPlaceholder="Start Date"
                                    selected={period.from}
                                    onChange={(date) => handlePeriodChange('from', date)}
                                />
                            </FormGroup>
                            <p className="px-2">to</p>
                            <FormGroup>
                                <DatePicker
                                    className="form-control"
                                    dateFormat="DD MMM YYYY"
                                    textPlaceholder="End Date"
                                    minDate={period.from}
                                    selected={period.to}
                                    onChange={(date) => handlePeriodChange('to', date)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Button
                                    className="btn-sky-blue btn-size ml-3"
                                    color="info"
                                    onClick={handleShow}
                                >
                                    Show
                                </Button>
                            </FormGroup>

                        </Form>
			
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