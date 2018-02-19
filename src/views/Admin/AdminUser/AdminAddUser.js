import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AdminAddUserView } from '../AdminUser';

function mapStateToProps(state) {
    return {

    };
}

class AdminAddUser extends Component {
    render() {
        return (
            <AdminAddUserView
                {...this.state}
                {...this.props}
            />
        )
    }
}

export default connect(
    mapStateToProps,
)(AdminAddUser);