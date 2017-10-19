import React from 'react';
import SettingCustomer from '../components/SettingCustomer';

class SettingCustomerContainer extends React.Component {
    constructor() {
        super();
    }
    
    render() {
        return <SettingCustomer {...this.props} {...this.state} />;
    }
}

export default SettingCustomerContainer;
