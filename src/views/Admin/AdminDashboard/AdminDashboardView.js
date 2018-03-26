import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, InputAddon, Switch, Select } from '../../../components/Input';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '../../../components/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AdminDashboardView = props => {
    const {
        table,
        report,
        reportList,
        showDate,
        period,
        handlePeriodChange
    } = props;

    const renderSearch = () => {
        return (
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
                    </Column>
                </Row>
            </Form>
        )
    }

    const renderReportGraph = () => {
		const priceFormatter = function (data) {
            return `${data} Orang`;
        };

        if(report.dashboard.isLoaded) {
            return(
                <ResponsiveContainer width='100%' aspect={7.0/3.0}>
                    <BarChart
                        data={report.dashboard.data.result}
                    >
                        <XAxis dataKey="name"/>
                        <YAxis
                            type="number"
                            tickFormatter={priceFormatter}
                            allowDecimal={true}
                            width={100}
                        />
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip 
                            formatter={priceFormatter}
                        />
                        <Legend />
                        <Bar dataKey="member" fill="#52c467" />
                    </BarChart>
                </ResponsiveContainer>
            )
        }
	}

    return (
        <div className="admin-dashboard">
            <Section>
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Dasbor</h4>
                        {/* <h6 className="heading-subtitle">Non veniam do cupidatat culpa dolor consectetur fugiat dolore qui id amet ad incididunt.</h6> */}
                    </PanelHeader>
                    <PanelBody>
                        { renderSearch() }
                        { renderReportGraph() }
                    </PanelBody>
                </Panel>
            </Section>
        </div>
    )
};

export default AdminDashboardView;