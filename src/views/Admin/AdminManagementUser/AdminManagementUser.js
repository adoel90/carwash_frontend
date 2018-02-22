import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AdminManagementUserView } from '../AdminManagementUser';

function mapStateToProps(state) {
    return {

    };
}

class AdminManagementUser extends Component {
    render() {
        return (
            <AdminManagementUserView
                {...this.state}
                {...this.props}
            />
        )
    }
}

export default connect(mapStateToProps,)(AdminManagementUser);