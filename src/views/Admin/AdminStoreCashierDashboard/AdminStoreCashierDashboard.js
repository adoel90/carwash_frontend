import React, { Component } from 'react';
import { AdminStoreCashierDashboardView } from '../AdminStoreCashierDashboard';

class AdminStoreCashierDashboard extends Component {

    render() {
        
        return <AdminStoreCashierDashboardView {...this.state} {...this.props} />
    }
}

export default AdminStoreCashierDashboard;