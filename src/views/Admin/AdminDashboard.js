import React, { Component } from 'react';
import AdminDashboardView from './AdminDashboardView';

class AdminDashboard extends Component {
    render() {
        return <AdminDashboardView {...this.state} {...this.props} />
    }
}

export default AdminDashboard;