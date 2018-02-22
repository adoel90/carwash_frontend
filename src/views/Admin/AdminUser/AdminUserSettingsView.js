import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { Section } from '../../../layouts/Section';

const AdminUserSettingsView = props => {
    return (
        <div className="admin-user">
            <Panel theme="primary">
                <PanelHeader>
                    <h4 className="heading-title">Pengaturan User</h4>
                    <h6 className="heading-subtitle">Amet adipisicing incididunt ut et reprehenderit.</h6>
                </PanelHeader>
                <PanelBody>
                </PanelBody>
            </Panel>
        </div>
    );
};

AdminUserSettingsView.propTypes = {
    
};

export default AdminUserSettingsView;