//VendorPanelView.js
import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { PropsRoute } from '../../../utilities/Route';
// import { VendorSidebar, VendorPage } from '../VendorLayout';
import { AdminStoresSidebar, AdminStoresPage } from '../AdminStoresLayout';
import { Layout } from '../../../layouts/Layout';

const AdminStoresPanelView = props => {
 
    return (
        <Layout>
            <AdminStoresSidebar {...props} />
            <AdminStoresPage {...props} />
        </Layout>
    )
};

export default AdminStoresPanelView;