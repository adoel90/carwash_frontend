import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AdminPanelView } from '../Admin';

function mapStateToProps(state) {
    return {

    };
}

class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: [
                { id: 1, name: "Dashboard", path: `${props.match.url}/dashboard`, component: AdminDashboard },
                // { id: 2, name: "User Management", path: `${match.url}/user-management`, component: AdminUserManagement },
                // { id: 3, name: "Vendor Management", path: `${match.url}/vendor-management`, component: AdminVendorManagement },
                // { id: 4, name: "Access Management", path: `${match.url}/access-management`, component: AdminAccessManagement},
            ],
        }
    }
    
    render() {
        return <AdminPanelView {...this.state} {...this.props} />
    }
}

export default connect(
    mapStateToProps,
)(AdminPanel);