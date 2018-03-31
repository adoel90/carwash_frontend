import React, { Component } from 'react';
import { AdminStoresDashboardView } from '../AdminStoresDashboard';

class AdminStoresDashboard extends Component {

    render() {
        return <AdminStoresDashboardView {...this.state} {...this.props} />
    }
}

export default AdminStoresDashboard;