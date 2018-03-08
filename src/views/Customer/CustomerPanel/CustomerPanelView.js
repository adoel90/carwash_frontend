//VendorPanelView.js
import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { PropsRoute } from '../../../utilities/Route';
import { CustomerSidebar, CustomerPage } from '../CustomerLayout';

import { MainHeader } from '../../../components/MainHeader';
import { Layout } from '../../../layouts/Layout';

const CustomerPanelView = props => {
 

    return (
        <Layout>
            <CustomerSidebar {...props} />
            <CustomerPage {...props} />
        </Layout>
        
            // <MainHeader {...this.state} {...this.props} />

        
    )
};

export default CustomerPanelView;