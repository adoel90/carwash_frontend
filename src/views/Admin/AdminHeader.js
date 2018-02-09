import React, { Component } from 'react';
import { AdminHeaderView } from '../Admin';

class AdminHeader extends Component {            
    render() {
        return <AdminHeaderView {...this.state} {...this.props} />
    }
}

export default AdminHeader;