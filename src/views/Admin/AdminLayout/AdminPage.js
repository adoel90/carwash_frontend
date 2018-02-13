import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Page } from '../../../layouts/Page';

const AdminPage = props => {
    const {
        children
    } = props;
    
    return <Page className="admin-panel__page">{children}</Page>
};

export default AdminPage;