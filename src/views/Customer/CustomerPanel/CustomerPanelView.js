//VendorPanelView.js
import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { PropsRoute } from '../../../utilities/Route';
import { CustomerSidebar, CustomerPage } from '../CustomerLayout';
import { LayoutCustomer, HeaderCustomer } from '../../../layouts/LayoutCustomer';



const CustomerPanelView = props => {
 
    return (
        <div>
           <br/>
           <br/>
            <LayoutCustomer>
                <HeaderCustomer {...props} />
                <CustomerSidebar {...props} />
                <CustomerPage {...props} />
            </LayoutCustomer>   
        </div>     
    )
};

export default CustomerPanelView;