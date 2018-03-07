//VendorPanelView.js
import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { PropsRoute } from '../../../utilities/Route';
// import { VendorSidebar, VendorPage } from '../VendorLayout';
import { CustomerSidebar, CustomerPage } from '../CustomerLayout';
import { Layout } from '../../../layouts/Layout';

const CustomerPanelView = props => {
 

    return (
        <Layout>
            <CustomerSidebar {...props} />
            <CustomerPage {...props} />
        </Layout>
    )
};

export default CustomerPanelView;