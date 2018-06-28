import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import {Button} from '../../../components/Button';

const AdminStoreCashierStockKartuView = props => {

    const { cardType, table, vendorState, handleCetakCardNumber, typeMember, card } = props;
    return (
        <div className="admin-dashboard">
            <Section>
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Stock Kartu Baru </h4>
                        {/* <h6 className="heading-subtitle">Non veniam do cupidatat culpa dolor consectetur fugiat dolore qui id amet ad incididunt.</h6> */}
                    </PanelHeader>
                    <PanelBody>
                        <Button onClick={(e) => handleCetakCardNumber(e)}>Cetak Seri Nomor Kartu</Button>
                        {
                            card.list.isCreated ?
                                <div className="admin-report__content">
                                    <TableSet
                                        // loading={vendorState.reportStaff.isFetching}
                                        loaded={vendorState.store.isLoaded}
                                        columns={table.columns}
                                        rows={table.rows}
                                        striped 
                                        fullWidth
                                        pagination
                                    />
                                </div>     
                            : null
                        }
                    </PanelBody>
                </Panel>
            </Section>
        </div>
    )
};

export default AdminStoreCashierStockKartuView;