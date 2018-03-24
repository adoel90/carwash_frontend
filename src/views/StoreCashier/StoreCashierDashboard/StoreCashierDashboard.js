import React, { Component } from 'react';
import { StoreCashierDashboardView } from '../StoreCashierDashboard';

class StoreCashierDashboard extends Component {

    render() {
        
        return <StoreCashierDashboardView {...this.state} {...this.props} />
    }
}

export default StoreCashierDashboard;