import React, { Component } from 'react';
import { VendorDashboardView } from '../VendorDashboard';

class VendorDashboard extends Component {

    render() {
        return <VendorDashboardView {...this.state} {...this.props} />
    }
}

export default VendorDashboard;