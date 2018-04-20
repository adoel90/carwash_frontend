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
        handlePeriodChange
    } = props;

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
        </div>
    )
};

AdminReportSellingTotalView.propTypes = {
    
};

export default AdminReportSellingTotalView;