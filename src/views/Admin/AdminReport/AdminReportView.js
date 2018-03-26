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

const AdminReportView = props => {
    const {
        isModalOpen,
        table,
        reportList,
        handleInputChange,
        showDate,
        reportDate
    } = props;

    return (
        <div className="admin-report">
            <Panel>
                <PanelHeader>
                    <h4 className="heading-title">Daftar Report</h4>
                    {/* <h6 className="heading-subtitle">Menampilkan semua daftar report</h6> */}
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
                                            <Input type="text" name="start_date" placeholder={reportDate.start_date} defaultValue={reportDate.start_date} onChange={(e) => handleInputChange('reportDate', e)} />
                                        </InputGroup>
                                    </FormField>
                                </div>
                                <div className="margin-right-small">
                                    <FormField>
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-calendar-alt"></i>
                                            </InputAddon>
                                            <Input type="text" name="end_date" defaultValue={reportDate.end_date} placeholder={reportDate.end_date} onChange={(e) => handleInputChange('reportDate', e)} />
                                        </InputGroup>
                                    </FormField>
                                </div>
                                <div>
                                    <FormField>
                                        <Button type="submit" style={{height: '50px'}}>
                                            <i className="fas fa-search"></i> 
                                            <span> Cari</span>
                                        </Button>
                                    </FormField>
                                </div>
                            </Column>
                        </Row>
                    </Form>

                    <div className="admin-report__content">
                        <TableSet
                            loading={reportList.isFetching}
                            loaded={reportList.isLoaded}
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
    );
};

AdminReportView.propTypes = {
    
};

export default AdminReportView;