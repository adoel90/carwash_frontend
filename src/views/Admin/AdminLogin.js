import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminLoginView from './AdminLoginView';

function mapStateToProps(state) {
    return {

    };
}

class AdminLogin extends Component {
    render() {
        return <AdminLoginView {...this.props} {...this.state} />
    }
}

export default connect(
    mapStateToProps,
)(AdminLogin);