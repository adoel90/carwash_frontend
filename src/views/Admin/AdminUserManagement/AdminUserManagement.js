import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AdminUserManagementView } from '../AdminUserManagement';

function mapStateToProps(state) {
    return {

    };
}

class AdminUserManagement extends Component {
    render() {
        return (
            <AdminUserManagementView
                {...this.state}
                {...this.props}
            />
        )
    }
}

export default connect(mapStateToProps,)(AdminUserManagement);