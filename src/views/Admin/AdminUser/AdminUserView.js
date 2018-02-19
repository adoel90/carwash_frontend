import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel } from '../../../components/Panel';

const AdminUserView = props => {
    return (
        <div className="admin-user">
            <Section>
                <Panel>
                    <div className="admin-user__heading">
                        <h4 className="heading-title">Daftar User</h4>
                        <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6>
                    </div>
                </Panel>
            </Section>
        </div>
    );
};

AdminUserView.propTypes = {
    
};

export default AdminUserView;