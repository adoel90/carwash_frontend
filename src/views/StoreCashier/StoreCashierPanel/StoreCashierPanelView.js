//VendorPanelView.js
import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { PropsRoute } from '../../../utilities/Route';
// import { VendorSidebar, VendorPage } from '../VendorLayout';
import { StoreCashierSidebar, StoreCashierPage } from '../StoreCashierLayout';
import { Layout } from '../../../layouts/Layout';

const StoreCashierPanelView = props => {
 
    return (
        <Layout>
            <StoreCashierSidebar {...props} />
            <StoreCashierPage {...props} />
        </Layout>
    )
};

export default StoreCashierPanelView;