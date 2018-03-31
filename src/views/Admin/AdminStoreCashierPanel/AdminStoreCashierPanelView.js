//VendorPanelView.js
import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { PropsRoute } from '../../../utilities/Route';
// import { VendorSidebar, VendorPage } from '../VendorLayout';
import { AdminStoreCashierSidebar, AdminStoreCashierPage } from '../AdminStoreCashierLayout';
import { Layout } from '../../../layouts/Layout';

const AdminStoreCashierPanelView = props => {
 
    return (
        <Layout>
            <AdminStoreCashierSidebar {...props} />
            <AdminStoreCashierPage {...props} />
        </Layout>
    )
};

export default AdminStoreCashierPanelView;