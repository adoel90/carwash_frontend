import React from 'react';
import PropTypes from 'prop-types';
import { AdminMenu, AdminHeader } from '../Admin';

const AdminPanelView = props => {
    return (
        <div className="admin-panel">
            <AdminMenu {...this.props} />
            <div className="admin-panel__content">
                <AdminHeader {...this.props} />
            </div>
        </div>
    );
};

AdminPanelView.propTypes = {
    
};

export default AdminPanelView;