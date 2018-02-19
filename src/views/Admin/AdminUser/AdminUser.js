import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AdminUserView } from '../AdminUser';

function mapStateToProps(state) {
    return {

    };
}

class AdminUser extends Component {
    render() {
        return (
            <AdminUserView
                {...this.state}
                {...this.props}
            />
        )
    }
}

export default connect(
    mapStateToProps,
)(AdminUser);