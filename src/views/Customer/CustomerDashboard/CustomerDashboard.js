import React, { Component } from 'react';
import { CustomerDashboardView } from '../CustomerDashboard';

class CustomerDashboard extends Component {

    render() {
        return <CustomerDashboardView {...this.state} {...this.props} />
    }
}

export default CustomerDashboard;