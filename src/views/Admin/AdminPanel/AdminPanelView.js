import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { PropsRoute } from '../../../utilities/Route';
import { AdminSidebar, AdminPage } from '../AdminLayout';
import { Layout } from '../../../layouts/Layout';

const AdminPanelView = props => {
    const {
        routes,
    } = props;

    return (
        <Layout>
            <AdminSidebar {...props} />
            <AdminPage {...props} />
        </Layout>
    )
};

export default AdminPanelView;