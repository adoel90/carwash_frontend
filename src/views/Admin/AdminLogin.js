import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminLoginView from './AdminLoginView';

function mapStateToProps(state) {
    return {
        
    };
}

class AdminLogin extends Component {
    handleAuthentication = () => {

    }
    
    render() {
        return (
            <AdminLoginView 
                {...this.props} 
                {...this.state} 
                handleAuthentication={() => this.handleAuthentication}
            />
        )
    }
}

export default connect(
    mapStateToProps,
)(AdminLogin);