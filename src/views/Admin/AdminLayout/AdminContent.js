import React from 'react';
import PropTypes from 'prop-types';

const AdminContent = props => {
    const {
        children
    } = props;
    
    return (
        <div className="admin-panel__content">
            {children}
        </div>
    )
};

export default AdminContent;