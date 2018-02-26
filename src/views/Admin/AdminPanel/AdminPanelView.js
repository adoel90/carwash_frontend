import React from 'react';
import { AdminSidebar, AdminPage } from '../AdminLayout';
import { Layout } from '../../../layouts/Layout';

const AdminPanelView = props => {
    return (
        <Layout>
            <AdminSidebar {...props} />
            <AdminPage {...props} />
        </Layout>
    )
};

export default AdminPanelView;