import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';

const AdminDashboardView = props => {
    return (
        <div className="admin-dashboard">
            <Section>
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Dasbor</h4>
                        <h6 className="heading-subtitle">Non veniam do cupidatat culpa dolor consectetur fugiat dolore qui id amet ad incididunt.</h6>
                    </PanelHeader>
                    <PanelBody>
                        
                    </PanelBody>
                </Panel>
            </Section>
        </div>
    )
};

export default AdminDashboardView;