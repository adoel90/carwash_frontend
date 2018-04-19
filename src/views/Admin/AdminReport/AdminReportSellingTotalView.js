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

    const { showDate, period, handlePeriodChange, table, report, handlePrint, handleExportToExcell } = props;

    return (
        <div className="admin-report">
            <Panel>
                <PanelHeader>
                    <h4 className="heading-title">Laporan Member </h4>
                </PanelHeader>
                <PanelBody> 
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

                    <div className="admin-report__content">
                        <TableSet
                            loading={report.reportMember.isFetching}
                            loaded={report.reportMember.isLoaded}
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
}

export default AdminReportSellingTotalView;