import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel } from '../../../components/Panel';
import { ButtonDewek } from '../../../components/ButtonDewek';

const AdminStoreCashierRefundView = props => {

    return (
        <div className="admin-dashboard">
            <Section>
                <Panel>
                    <div className="admin-dashboard__heading">
                        <h4 className="heading-title">Refund </h4>
                    </div>
                </Panel> 
            </Section>
        </div>
    )
};

export default AdminStoreCashierRefundView;