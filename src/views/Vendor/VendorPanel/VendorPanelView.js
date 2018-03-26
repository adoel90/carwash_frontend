//VendorPanelView.js
import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { PropsRoute } from '../../../utilities/Route';
import { VendorSidebar, VendorPage } from '../VendorLayout';
import { Layout } from '../../../layouts/Layout';

const VendorPanelView = props => {
 

    return (
        <Layout>
            <VendorSidebar {...props} />
            <VendorPage {...props} />
        </Layout>
    )
};

export default VendorPanelView;