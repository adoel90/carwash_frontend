import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Section } from '../../../layouts/Section';
import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, InputAddon, Switch, Textarea } from '../../../components/Input';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet, TableSetKhusus} from '../../../components/Table';
import { Button } from '../../../components/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table';


const ElementTableReactBootstrapView = props => {

    const { table, optionsFeatureTable, openMemberDetail, changeMemberStatus } = props;


    const componentButtonUpdate = (datarow) => {
            return (
                <div>
                    <Button className="margin-right-small" type="button" onClick={() => openMemberDetail(datarow )}>Ubah</Button>
                    <Button type="button" theme={datarow.status ? "success" : "danger"} onClick={() => changeMemberStatus(datarow)}>{ datarow.status ? 'Aktif' : 'N/A' }</Button>
                </div>
            );
    };


    return (
        <div className="admin-dashboard">
            <Section>
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Table React Bootstrap </h4>
                        
                    </PanelHeader>
                    <PanelBody>
                    	<Row>
                            <Column md={12}>
                                    <div className="admin-Member__content"><br /><br /><br />   
                                        <BootstrapTable data={table.rows} options={optionsFeatureTable} striped={true} hover={true} version='4' bordered={false} dataAlign="center" searchPlaceholder={"Ketik nama member yang terdaftar..."} pagination search>
                                                <TableHeaderColumn 
                                                    dataField="id" 
                                                    isKey={true} hidden
                                                >
                                                    id
                                                </TableHeaderColumn>
                                                <TableHeaderColumn 
                                                    dataField="name" 
                                                    headerAlign="left" 
                                                    dataAlign="left"
                                                    width="25%"
                                                >
                                                    Nama Member
                                                </TableHeaderColumn>
                                                <TableHeaderColumn 
                                                    dataField="cardNumber" 
                                                    headerAlign="center" 
                                                    dataAlign="center"
                                                    width="25%"
                                                >
                                                    Nomor kartu
                                                </TableHeaderColumn>
                                                <TableHeaderColumn 
                                                    dataField="cardType" 
                                                    headerAlign="center" 
                                                    dataAlign="center"
                                                    width="25%"
                                                >
                                                    Tipe Member
                                                </TableHeaderColumn>
                                                <TableHeaderColumn 
                                                    dataField="data" 
                                                    headerAlign="center"
                                                    dataAlign="center"
                                                    dataFormat={componentButtonUpdate}
                                                    width="25%"
                                                >
                                                    Status
                                                </TableHeaderColumn>
                                        </BootstrapTable>
                                    </div>
                            </Column>
                        </Row>              
                    </PanelBody>
                </Panel>
            </Section>
        </div>
    )
};

export default ElementTableReactBootstrapView;