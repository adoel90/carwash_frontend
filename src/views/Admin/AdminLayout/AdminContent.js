import React from 'react';
import PropTypes from 'prop-types';
import { Content } from '../../../layouts/Content';

const AdminContent = props => {
    const {
        children,
        className
    } = props;
    
    return <Content className="admin-panel__content">{children}</Content>
};

export default AdminContent;