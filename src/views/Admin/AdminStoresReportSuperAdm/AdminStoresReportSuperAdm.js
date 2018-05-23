import React, { Component } from 'react';
import { AdminStoresReportSuperAdmView } from '../AdminStoresReportSuperAdm';

class AdminStoresReportSuperAdm extends Component {
    render() {
        return <AdminStoresReportSuperAdmView {...this.state} {...this.props} />
    }
}

export default AdminStoresReportSuperAdm;