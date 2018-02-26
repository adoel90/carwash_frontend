import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AdminUserSettingsView } from '../AdminUser';

function mapStateToProps(state) {
    return {

    };
}

class AdminUserSettings extends Component {
    render() {
        return (
            <AdminUserSettingsView
                {...this.state}
                {...this.props}
            />
        );
    }
}

export default connect(
    mapStateToProps,
)(AdminUserSettings);