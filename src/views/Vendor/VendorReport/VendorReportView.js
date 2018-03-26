import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
// import { TableSet } from '../../../components/Table';
// import { Form, FormField } from '../../../layouts/Form';
// import { Row, Column } from '../../../layouts/Grid';
// import { Input, InputGroup, Switch } from '../../../components/Input';
// import { Button } from '../../../components/Button';
// import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
// import { LineChart, Line,  XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

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
// import {ButtonDewek} from '../../../components/ButtonDewek';

const VendorDashboardView = props => {
     
    // const {
    //     isModalOpen, 
    //     table, 
    //     vendorReportList
        // toggleModal, 
        // handleInputChange, 
        // updateVendorReport, 
        // selectedVendorEmployee
    //  } = props;

    const {
        vendorReportList,
        dashboard,
        company,
        handleInputChange, 
        handleClickCompany,
        handleClick,
        handlePeriodChange,
        handleShow,
        tableMonth: {

            // dataMonth:[]
            dataMonth:{}
        }
    } = props;

    const data = [
         
        {name: 'JANUARI', Rp: 4000, pv: 2400, amt: 2400},
        {name: 'FEBRUARI', Rp: 3000, pv: 1398, amt: 2210},
        {name: 'MARET', Rp: 2000, pv: 9800, amt: 2290},
        {name: 'APRIL', Rp: 2780, pv: 3908, amt: 2000},
        {name: 'MEI', Rp: 1890, pv: 4800, amt: 2181},
        {name: 'JUNI', Rp: 2390, pv: 3800, amt: 2500},
        {name: 'JULI', Rp: 3490, pv: 4300, amt: 2100},
        {name: 'AGUSTUS', Rp: 3490, pv: 4300, amt: 2100},
        {name: 'SEPTEMBER', Rp: 3490, pv: 4300, amt: 2100},
        {name: 'OKTOBER', Rp: 3490, pv: 4300, amt: 2100},
        {name: 'NOVEMBER', Rp: 3490, pv: 4300, amt: 2100},
        {name: 'DESEMBER', Rp: 3490, pv: 4300, amt: 2100}

    ];

    const dataDummy = [

        { month: "May 2017", transaction: 0, pv: 24},
        { month: "Jun 2017", transaction: 3, pv: 13},
        { month: "Jul 2017", transaction: 5, pv: 98},
        { month: "Aug 2017", transaction: 0, pv: 39},
        { month: "Sep 2017", transaction: 0, pv: 48},
        { month: "Oct 2017", transaction: 5, pv: 38},
        { month: "Nov 2017", transaction: 0, pv: 43},
        { month: "Dec 2017", transaction: 7, pv: 43},
        { month: "Jan 2018", transaction: 0, pv: 43},
        { month: "Feb 2018", transaction: 8, pv: 43},
        { month: "Mar 2018", transaction: 0, pv: 43},
        { month: "Apr 2018", transaction: 9, pv: 43}
    ]

    return (
        <div>
            <div className="vendor-menu">    
            </div>

            <div className="admin-user">
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Report</h4>
                        <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6>
                        
                    </PanelHeader>
                    <PanelBody>
                        {/* <div className="admin-user__content">
                            <TableSet
                                loading={..isFetching}
                                loaded={vendorReportList.isLoaded}
                                columns={table.columns}
                                rows={table.rows}
                                striped 
                                fullWidth
                                pagination
                            />
                        </div> */}

                        <h1>Hai</h1>
                        {/* Code get started recharts */}
                        
                        <LineChart width={900} height={300} data={dataDummy} margin={{ top: 5, right: 20, bottom: 5, left: 0}}>
                            <Line type="monotone" dataKey="transaction" stroke="#8884d8" />
                            {/* <Line type="monotone" dataKey={dataDummy.transaction} stroke="#8884d8" /> */}
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                            <XAxis dataKey="month" />
                            <YAxis dataKey='pv'/>
                             <Tooltip />
                        </LineChart>


                        {/* ****************************** */}

                    
                        {/* <CardBody>
                            <CardTitle className="font-weight-bold mb-2">Month</CardTitle>
                            <ResponsiveContainer width='80%' aspect={7.0/3.0}>
                                <BarChart
                                    // data={dashboard.graph.dataMonth}
                                    data={this.props}
                                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                                >
                                    <XAxis dataKey="name"/>
                                    <YAxis
                                        type="number"
                                        // tickFormatter={priceFormatter}
                                        allowDecimal={true}
                                        width={100}
                                    />
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Tooltip formatter={priceFormatter}/>
                                    <Legend />
                                    <Bar dataKey="Transaction" fill="#52c467" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardBody> */}

                        {/* <ButtonDewek className="CTA">Badai</ButtonDewek> */}
                                       
                    </PanelBody>
                </Panel>
                {/* { renderVendorEmployeeModal() } */}
            </div>
        </div>
    )
};


export default VendorDashboardView;