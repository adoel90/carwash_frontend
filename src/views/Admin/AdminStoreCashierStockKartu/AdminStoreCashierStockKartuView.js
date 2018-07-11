import React from 'react';
import PropTypes from 'prop-types';

import {CopyToClipboard} from 'react-copy-to-clipboard';

import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Table } from '../../../components/Table';

import {Button} from '../../../components/Button';

const AdminStoreCashierStockKartuView = props => {

    const { 
        handleCopyNumberTaxiOnline, 
        copiedTaxiOnline, 
        handleCopyNumberNonMember,
        copiedNonMember,
        handleCopyNumberMember,
        copiedMember,
        cardType, 
        table, 
        vendorState, 
        handleCetakCardNumber, 
        typeMember, 
        card, 
        cardTaxiOnline, 
        cardNonMember, 
        cardMember } = props;

    const renderDetailModal = () => {


    };

    return (
        <div className="admin-dashboard">
            <Section>
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Tulis Kartu Baru </h4>
                        {/* <h6 className="heading-subtitle">Non veniam do cupidatat culpa dolor consectetur fugiat dolore qui id amet ad incididunt.</h6> */}
                    </PanelHeader>
                    <PanelBody>
                        <div className="admin-user__content">
                            <Table fullWidth>
                                <thead className="table__head">
                                    <tr>
                                        <th>Jenis Kartu Member</th>
                                        <th>Seri Nomor Kartu</th>
                                        <th>Copy</th>
                                    </tr>
                                </thead>
                                <tbody className="table__body">
                                    <tr className="bg-white">
                                        <td>Taxi Online</td>
                                        <td>{cardTaxiOnline}</td>
                                        <td>
                                            <CopyToClipboard onCopy={handleCopyNumberTaxiOnline} text={cardTaxiOnline}>
                                                <Button theme={copiedTaxiOnline === false ? "success" : "warning"}>{copiedTaxiOnline === false ? "Copy Nomor Kartu" : "Copied"} </Button>
                                            </CopyToClipboard>
                                        </td>
                                        <td>
                                            <Button>Modal</Button>
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td>Non Member</td>
                                        <td>{cardNonMember} </td>
                                        <td>
                                            <CopyToClipboard onCopy={handleCopyNumberNonMember} text={cardNonMember}>
                                                <Button theme={copiedNonMember === false ? "success" : "warning"}>{copiedNonMember === false ? "Copy Nomor Kartu" : "Copied"}</Button>
                                            </CopyToClipboard>
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td>Member</td>
                                        <td>{cardMember}</td>
                                        <td>
                                            <CopyToClipboard onCopy={handleCopyNumberMember} text={cardMember}>
                                                <Button theme={copiedMember === false ? "success" : "warning"}>{copiedMember === false ? "Copy Nomor Kartu" : "Copied"}</Button>
                                            </CopyToClipboard>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </PanelBody>
                </Panel>

                {renderDetailModal()}
            </Section>
        </div>
    )
};

export default AdminStoreCashierStockKartuView;