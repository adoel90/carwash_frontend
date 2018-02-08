import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AdminLoginView from './AdminLoginView';

class AdminLogin extends Component {    
    render() {
        return (
            <AdminLoginView 
                {...this.props} 
                {...this.state}
            />
        )
    }
}

export default AdminLogin;