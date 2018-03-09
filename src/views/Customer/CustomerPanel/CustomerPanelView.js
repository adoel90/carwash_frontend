//VendorPanelView.js
import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { PropsRoute } from '../../../utilities/Route';
import { CustomerSidebar, CustomerPage } from '../CustomerLayout';
// import { MainHeader } from '../../../components/MainHeader';
import { LayoutCustomer } from '../../../layouts/LayoutCustomer';



const CustomerPanelView = props => {
 

    return (
        <LayoutCustomer>
            {/* <MainHeader {...this.state} {...this.props} /> */}
            {/* <div><h1>Heading</h1></div> */}
            <CustomerSidebar {...props} />
            <CustomerPage {...props} />
        </LayoutCustomer>        
    )
};

export default CustomerPanelView;