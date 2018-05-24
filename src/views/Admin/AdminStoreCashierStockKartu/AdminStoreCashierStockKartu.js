import React, { Component } from 'react';
import { AdminStoreCashierStockKartuView } from '../AdminStoreCashierStockKartu';

class AdminStoreCashierStockKartu extends Component {
    render() {
        return <AdminStoreCashierStockKartuView {...this.state} {...this.props} />
    }
}

export default AdminStoreCashierStockKartu;