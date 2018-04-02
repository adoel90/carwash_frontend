import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, Switch, InputAddon } from '../../../components/Input';
// import { Button } from '../../../components/Button';
import { ButtonDewek } from '../../../components/ButtonDewek';



const AdminStoresPromoView = props => {

    const { promoList, table} = props;

    return (
        <div className="admin-dashboard">
            <Section>
                <Panel>
                    <PanelHeader>
                    <h4 className="heading-title">Promo Periode ini</h4>
                    </PanelHeader>
                    <PanelBody>
                        <div className="admin-user__content">
                            <TableSet
                                loading={promoList.isFetching}
                                loaded={promoList.isLoaded}
                                columns={table.columns}
                                rows={table.rows}
                                striped 
                                fullWidth
                                pagination
                            />
                        </div>
                    </PanelBody>
                </Panel> 
                {/* { renderVendorEmployeeModal() } */}
            </Section>
        </div>
    )
};

export default AdminStoresPromoView;

