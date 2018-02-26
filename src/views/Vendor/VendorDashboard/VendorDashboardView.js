import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel } from '../../../components/Panel';

const VendorDashboardView = props => {
    return (
        <div className="admin-dashboard">
            <Section>
                <Panel>
                    <div className="admin-dashboard__heading">
                        <h4 className="heading-title">Dasbor</h4>
                        <h6 className="heading-subtitle">Non veniam do cupidatat culpa dolor consectetur fugiat dolore qui id amet ad incididunt.</h6>
                    </div>
                </Panel>
            </Section>
        </div>
    )
};

export default VendorDashboardView;